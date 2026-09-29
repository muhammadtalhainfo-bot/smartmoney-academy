import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

function toLocalDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export async function POST() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
          } catch {}
        },
      },
    }
  );

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('streak, longest_streak, last_active')
    .eq('id', user.id)
    .single();

  if (profileError || !profile) {
    return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
  }

  const now = new Date();
  const today = toLocalDate(now);
  if (profile.last_active === today) {
    return NextResponse.json({
      streak: profile.streak || 0,
      longest_streak: profile.longest_streak || 0,
      last_active: profile.last_active,
    });
  }

  const yesterdayDate = new Date(now);
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterday = toLocalDate(yesterdayDate);
  const newStreak = profile.last_active === yesterday ? (profile.streak || 0) + 1 : 1;
  const longestStreak = Math.max(newStreak, profile.longest_streak || 0);

  let update = supabase
    .from('profiles')
    .update({
      streak: newStreak,
      longest_streak: longestStreak,
      last_active: today,
    })
    .eq('id', user.id);

  update = profile.last_active === null
    ? update.is('last_active', null)
    : update.eq('last_active', profile.last_active);

  const { error: updateError } = await update;

  if (updateError) {
    return NextResponse.json({ error: 'Unable to update streak' }, { status: 409 });
  }

  return NextResponse.json({
    streak: newStreak,
    longest_streak: longestStreak,
    last_active: today,
  });
}
