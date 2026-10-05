import { createClient } from '@supabase/supabase-js';
import { createHash } from 'node:crypto';
import { LESSON_QUIZ_ANSWERS } from '@/lib/lesson-quiz-answers';

export const runtime = 'nodejs';

const PASS_PERCENT = 70;

function requestError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

const RATE_WINDOW_SECONDS = 10 * 60;
const RATE_LIMIT = 30;

function json(body, init = {}) {
  return Response.json(body, {
    ...init,
    headers: { ...(init.headers || {}), 'Cache-Control': 'private, no-store' },
  });
}

function hashUserKey(userId) {
  const pepper = process.env.RATE_LIMIT_SECRET || process.env.SUPABASE_SERVICE_KEY || 'ictflow-rate-limit';
  return createHash('sha256').update(pepper + ':lesson-completion:' + userId).digest('hex');
}

function adminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) throw new Error('Supabase server configuration is missing.');
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

async function readJson(req) {
  const contentLength = Number(req.headers.get('content-length') || 0);
  if (contentLength > 20_000) throw requestError(413, 'Request too large.');

  const rawBody = await req.text();
  if (rawBody.length > 20_000) throw requestError(413, 'Request too large.');

  try {
    return rawBody ? JSON.parse(rawBody) : {};
  } catch {
    throw requestError(400, 'Invalid request.');
  }
}

export async function POST(req) {
  try {
    const authHeader = req.headers.get('authorization') || '';
    const accessToken = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : '';
    if (!accessToken) return json({ error: 'Unauthorized' }, { status: 401 });

    const supabase = adminClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (authError || !user) return json({ error: 'Unauthorized' }, { status: 401 });

    const { data: allowed, error: rateError } = await supabase.rpc('consume_api_rate_limit', {
      p_scope: 'lesson-completion',
      p_key_hash: hashUserKey(user.id),
      p_window_seconds: RATE_WINDOW_SECONDS,
      p_max_requests: RATE_LIMIT,
    });
    if (rateError) {
      console.error('Lesson completion rate-limit error:', rateError);
      return json({ error: 'Service temporarily unavailable.' }, { status: 503 });
    }
    if (allowed !== true) return json({ error: 'Too many completion attempts. Try again later.' }, { status: 429 });

    const body = await readJson(req);
    const lessonIdText = typeof body?.lessonId === 'string' || typeof body?.lessonId === 'number'
      ? String(body.lessonId).trim()
      : '';
    const lessonId = Number(lessonIdText);
    const answers = body?.answers;

    if (
      !/^\d+$/.test(lessonIdText) ||
      !Number.isSafeInteger(lessonId) ||
      lessonId <= 0 ||
      String(lessonId) !== lessonIdText ||
      !Array.isArray(answers)
    ) {
      return json({ error: 'Invalid completion payload.' }, { status: 400 });
    }

    const answerKey = LESSON_QUIZ_ANSWERS[lessonId];
    if (!answerKey || answers.length !== answerKey.length || answers.some((answer) => !Number.isInteger(answer))) {
      return json({ error: 'Invalid quiz answers.' }, { status: 400 });
    }

    const score = answers.reduce((total, answer, index) => total + (answer === answerKey[index] ? 1 : 0), 0);
    const scorePercent = Math.round((score / answerKey.length) * 100);
    if (scorePercent < PASS_PERCENT) {
      return json({ ok: false, passed: false, score, scorePercent, requiredPercent: PASS_PERCENT, xpEarned: 0 }, { status: 422, headers: { 'Cache-Control': 'private, no-store' } });
    }
    const xpEarned = score === answerKey.length ? 70 : 20;

    const { data: completionResult, error: completionError } = await supabase.rpc(
      'complete_lesson_and_award_xp',
      {
        p_user_id: user.id,
        p_lesson_id: lessonId,
        p_quiz_score: scorePercent,
        p_xp_earned: xpEarned,
      }
    );

    if (completionError) throw completionError;

    const result = Array.isArray(completionResult) ? completionResult[0] : completionResult;
    if (!result) throw new Error('Completion transaction returned no result.');

    return json({
      ok: true,
      passed: true,
      alreadyCompleted: result.inserted !== true,
      score,
      scorePercent,
      xpEarned: result.inserted === true ? xpEarned : 0,
      xp: Number(result.xp || 0),
    }, { headers: { 'Cache-Control': 'private, no-store' } });
  } catch (error) {
    if (error?.status === 400 || error?.status === 413) {
      return json({ error: error.message }, { status: error.status });
    }
    console.error('Lesson completion error:', error);
    return json({ error: 'Unable to record lesson completion.' }, { status: 500 });
  }
}
