import { createClient } from '@supabase/supabase-js';
import { LESSON_QUIZ_ANSWERS } from '@/lib/lesson-quiz-answers';
import { MODULES } from '@/lib/curriculum';

export const runtime = 'nodejs';

const PASS_PERCENT = 70;

function adminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) throw new Error('Supabase server configuration is missing.');
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

async function readJson(req) {
  const contentLength = Number(req.headers.get('content-length') || 0);
  if (contentLength > 20_000) throw new Error('Request too large.');

  const rawBody = await req.text();
  if (rawBody.length > 20_000) throw new Error('Request too large.');

  try {
    return rawBody ? JSON.parse(rawBody) : {};
  } catch {
    throw new Error('Invalid JSON payload.');
  }
}

export async function POST(req) {
  try {
    const authHeader = req.headers.get('authorization') || '';
    const accessToken = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : '';
    if (!accessToken) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const supabase = adminClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (authError || !user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await readJson(req);
    const lessonId = Number.parseInt(String(body?.lessonId), 10);
    const answers = body?.answers;

    if (!Number.isSafeInteger(lessonId) || !Array.isArray(answers)) {
      return Response.json({ error: 'Invalid completion payload.' }, { status: 400 });
    }

    const isCurriculumModule = MODULES.some((module) => module.id === lessonId);
    const answerKey = LESSON_QUIZ_ANSWERS[lessonId];
    if (!isCurriculumModule || !answerKey || answers.length !== answerKey.length || answers.some((answer) => !Number.isInteger(answer))) {
      return Response.json({ error: 'Invalid quiz answers.' }, { status: 400 });
    }

    const score = answers.reduce((total, answer, index) => total + (answer === answerKey[index] ? 1 : 0), 0);
    const scorePercent = Math.round((score / answerKey.length) * 100);
    if (scorePercent < PASS_PERCENT) {
      return Response.json({ ok: false, passed: false, score, scorePercent, requiredPercent: PASS_PERCENT, xpEarned: 0 }, { status: 422, headers: { 'Cache-Control': 'private, no-store' } });
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

    return Response.json({
      ok: true,
      passed: true,
      alreadyCompleted: result.inserted !== true,
      score,
      scorePercent,
      xpEarned: result.inserted === true ? xpEarned : 0,
      xp: Number(result.xp || 0),
    }, { headers: { 'Cache-Control': 'private, no-store' } });
  } catch (error) {
    console.error('Lesson completion error:', error);
    return Response.json({ error: 'Unable to record lesson completion.' }, { status: 500 });
  }
}
