import { createClient } from '@supabase/supabase-js';
import { LESSON_QUIZ_ANSWERS } from '@/lib/lesson-quiz-answers';

export const runtime = 'nodejs';

function adminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) throw new Error('Supabase server configuration is missing.');
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

async function readJson(req) {
  const contentLength = Number(req.headers.get('content-length') || 0);
  if (contentLength > 20_000) throw new Error('Request too large.');
  return req.json();
}

async function addXpSafely(supabase, userId, amount) {
  for (let attempt = 0; attempt < 4; attempt += 1) {
    const { data: profile, error: readError } = await supabase
      .from('profiles')
      .select('xp')
      .eq('id', userId)
      .single();

    if (readError) throw readError;

    const currentXP = Number.isFinite(Number(profile?.xp)) ? Number(profile.xp) : 0;
    const nextXP = currentXP + amount;

    const { data: updated, error: updateError } = await supabase
      .from('profiles')
      .update({ xp: nextXP })
      .eq('id', userId)
      .eq('xp', currentXP)
      .select('xp')
      .maybeSingle();

    if (updateError) throw updateError;
    if (updated) return nextXP;
  }

  throw new Error('XP update conflicted repeatedly; no XP was awarded.');
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

    const answerKey = LESSON_QUIZ_ANSWERS[lessonId];
    if (!answerKey || answers.length !== answerKey.length || answers.some((answer) => !Number.isInteger(answer))) {
      return Response.json({ error: 'Invalid quiz answers.' }, { status: 400 });
    }

    const score = answers.reduce((total, answer, index) => total + (answer === answerKey[index] ? 1 : 0), 0);
    const xpEarned = score === answerKey.length ? 70 : 20;

    const { data: existing, error: existingError } = await supabase
      .from('lesson_completions')
      .select('lesson_id')
      .eq('user_id', user.id)
      .eq('lesson_id', lessonId)
      .limit(1)
      .maybeSingle();

    if (existingError) throw existingError;
    if (existing) return Response.json({ ok: true, alreadyCompleted: true, score, xpEarned: 0 }, { headers: { 'Cache-Control': 'private, no-store' } });

    const { error: completionError } = await supabase
      .from('lesson_completions')
      .insert({ user_id: user.id, lesson_id: lessonId, quiz_score: Math.round((score / answerKey.length) * 100) });

    if (completionError) throw completionError;

    const xp = await addXpSafely(supabase, user.id, xpEarned);
    return Response.json({ ok: true, alreadyCompleted: false, score, xpEarned, xp }, { headers: { 'Cache-Control': 'private, no-store' } });
  } catch (error) {
    console.error('Lesson completion error:', error);
    return Response.json({ error: 'Unable to record lesson completion.' }, { status: 500 });
  }
}
