import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { MODULES } from '@/lib/curriculum';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const metadata = {
  robots: { index: false, follow: false },
};

function adminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) throw new Error('Supabase server configuration is missing.');
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

function parseCredential(value) {
  const match = String(value || '').match(/^ICTF-([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})$/i);
  return match?.[1] || null;
}

async function verifyCredential(credential) {
  const userId = parseCredential(credential);
  if (!userId) return null;

  const supabase = adminClient();
  const [{ data: profile }, { data: completions }] = await Promise.all([
    supabase.from('profiles').select('name, username').eq('id', userId).maybeSingle(),
    supabase.from('lesson_completions').select('lesson_id, completed_at, quiz_score').eq('user_id', userId),
  ]);

  if (!profile || !completions) return null;

  const requiredIds = MODULES.map((module) => module.id);
  const completed = new Set(completions.filter((row) => Number(row.quiz_score) >= 70).map((row) => Number(row.lesson_id)));
  if (!requiredIds.every((id) => completed.has(id))) return null;

  const latestCompletion = completions
    .filter((row) => row.completed_at && completed.has(Number(row.lesson_id)))
    .map((row) => new Date(row.completed_at).getTime())
    .filter(Number.isFinite)
    .reduce((latest, value) => Math.max(latest, value), 0);

  return {
    name: profile.name || profile.username || 'ICT Flow Student',
    issuedAt: latestCompletion ? new Date(latestCompletion) : null,
  };
}

export default async function VerifyPage({ params }) {
  const { credential } = await params;
  const credentialId = decodeURIComponent(credential || '').toUpperCase();
  const result = await verifyCredential(credentialId);

  return (
    <main style={{ minHeight: '100vh', background: '#080808', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 20px', fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ width: '100%', maxWidth: '760px', background: '#101010', border: '1px solid rgba(232,197,71,0.35)', borderRadius: '24px', padding: '48px', boxShadow: '0 30px 80px rgba(0,0,0,0.45)', textAlign: 'center' }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', letterSpacing: '0.25em', color: '#E8C547', marginBottom: '18px' }}>ICT FLOW ACADEMY</div>
        {result ? (
          <>
            <div style={{ fontSize: '52px', marginBottom: '14px' }}>✓</div>
            <h1 style={{ margin: 0, fontSize: '42px', letterSpacing: '0.04em' }}>VERIFIED CERTIFICATE</h1>
            <p style={{ color: '#B8B8B8', lineHeight: 1.7, maxWidth: '560px', margin: '16px auto 32px' }}>
              This certificate is verified as issued by ICT Flow for successful completion of the ICT & Smart Money Concepts Curriculum.
            </p>
            <div style={{ background: '#080808', border: '1px solid rgba(232,197,71,0.2)', borderRadius: '16px', padding: '28px', textAlign: 'left' }}>
              {[
                ['Recipient', result.name],
                ['Course', 'ICT & Smart Money Concepts Curriculum'],
                ['Modules', String(MODULES.length)],
                ['Lessons', String(MODULES.reduce((sum, module) => sum + Number(module.lessons || 0), 0))],
                ['Issued', result.issuedAt ? result.issuedAt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Verified'],
                ['Credential', credentialId],
              ].map(([label, value]) => (
                <div key={label} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '16px', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ color: '#8A8A8A', fontFamily: "'DM Mono', monospace", fontSize: '10px', letterSpacing: '0.08em' }}>{label.toUpperCase()}</span>
                  <span style={{ color: '#F2F2F2', fontSize: '14px' }}>{value}</span>
                </div>
              ))}
            </div>
            <p style={{ color: '#B8C0CC', fontFamily: "'DM Mono', monospace", fontSize: '10px', marginTop: '22px' }}>
              Verification is based on the learner's recorded curriculum completion in ICT Flow.
            </p>
          </>
        ) : (
          <>
            <div style={{ fontSize: '52px', marginBottom: '14px' }}>×</div>
            <h1 style={{ margin: 0, fontSize: '42px', letterSpacing: '0.04em' }}>CERTIFICATE NOT VERIFIED</h1>
            <p style={{ color: '#B8B8B8', lineHeight: 1.7, maxWidth: '520px', margin: '16px auto 28px' }}>
              We could not verify this credential ID. Check the credential link and try again.
            </p>
          </>
        )}
        <Link href="/" style={{ display: 'inline-block', marginTop: '30px', color: '#E8C547', fontFamily: "'DM Mono', monospace", fontSize: '11px', letterSpacing: '0.12em', textDecoration: 'none' }}>
          ← ICTFLOW.COM
        </Link>
      </div>
    </main>
  );
}
