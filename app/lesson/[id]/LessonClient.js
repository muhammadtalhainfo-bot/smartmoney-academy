'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';
import { trackLessonStart, trackLessonComplete, trackShare } from '@/lib/analytics';
import { MODULES } from '@/lib/curriculum';
import Link from 'next/link';
import Image from 'next/image';
import AdSlot from '@/app/components/AdSlot';


// ─── Level badge styles ──────────────────────────────────────────
const LEVEL_STYLE = {
  Beginner: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  Intermediate: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  Advanced: 'text-red-400 bg-red-400/10 border-red-400/20',
};

// ─── Section component ───────────────────────────────────────────
function Section({ section, index, diagramSrc, diagramAlt }) {
  const [open, setOpen] = useState(index === 0);


  return (
    <div className="border border-[rgba(212,168,67,0.1)] rounded-xl overflow-hidden mb-4">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-[rgba(212,168,67,0.03)] transition-colors"
      >
        <div className="flex items-center gap-3">
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', color: 'rgba(212,168,67,0.5)' }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="font-semibold text-white">{section.title}</span>
        </div>
        <span className="text-[#D4A843] text-lg">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className="px-5 pb-6 border-t border-[rgba(212,168,67,0.1)]">
          <div className="pt-5 text-gray-300 leading-relaxed text-sm whitespace-pre-line mb-4" style={{ fontWeight: 300 }}>
            {section.content}
          </div>

          {section.highlight && (
            <div className="flex gap-3 p-4 rounded-xl border border-[rgba(212,168,67,0.2)] bg-[rgba(212,168,67,0.05)]">
              <div className="text-sm text-[#D4A843] leading-relaxed">{section.highlight}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Quiz component ──────────────────────────────────────────────
function Quiz({ questions, lessonId }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [completionState, setCompletionState] = useState('idle');
  const [completionMessage, setCompletionMessage] = useState('');
  const score = submitted ? questions.filter((q, i) => answers[i] === q.answer).length : 0;

  const saveCompletion = async () => {
    setCompletionState('saving');
    setCompletionMessage('');

    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();

      if (!session?.user || !session.access_token) {
        setCompletionState('auth_required');
        setCompletionMessage('Sign in to save your completion and earn XP.');
        return;
      }

      const normalizedLessonId = Number.parseInt(String(lessonId), 10);
      if (Number.isNaN(normalizedLessonId)) {
        setCompletionState('error');
        setCompletionMessage('This lesson could not be saved. Please refresh and try again.');
        return;
      }

      const response = await fetch('/api/lesson-completion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          lessonId: normalizedLessonId,
          answers: questions.map((_, index) => answers[index]),
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.status === 401) {
        setCompletionState('auth_required');
        setCompletionMessage('Your session has expired. Sign in again, then use Retry Save.');
        return;
      }

      if (response.status === 422 || data?.passed === false) {
        setCompletionState('quiz_failed');
        setCompletionMessage(`You scored ${data?.scorePercent ?? Math.round((score / questions.length) * 100)}%. A score of 70% is required to record this lesson.`);
        return;
      }

      if (!response.ok) {
        setCompletionState('error');
        setCompletionMessage(data?.error || 'We could not save your completion. Try again.');
        return;
      }

      if (data?.alreadyCompleted) {
        setCompletionState('already_completed');
        setCompletionMessage('This lesson was already recorded. No additional XP was awarded.');
      } else {
        setCompletionState('saved');
        setCompletionMessage(`Completion saved. +${data?.xpEarned || 0} XP earned.`);
      }
    } catch (error) {
      console.error('Lesson completion save error:', error);
      setCompletionState('error');
      setCompletionMessage('We could not reach the server. Check your connection and use Retry Save.');
    }
  };

  const submitQuiz = async () => {
    const sc = questions.filter((q, i) => answers[i] === q.answer).length;
    setSubmitted(true);
    trackLessonComplete(lessonId, document.title, sc);

    if ((sc / questions.length) * 100 < 70) {
      setCompletionState('quiz_failed');
      setCompletionMessage(`You scored ${Math.round((sc / questions.length) * 100)}%. A score of 70% is required to record this lesson.`);
      return;
    }

    await saveCompletion();
  };

  const retryQuiz = () => {
    setAnswers({});
    setSubmitted(false);
    setCompletionState('idle');
    setCompletionMessage('');
  };

  return (
    <div className="rounded-2xl border border-[rgba(212,168,67,0.2)] bg-[rgba(212,168,67,0.03)] p-6">
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', color: '#D4A843', letterSpacing: '0.15em' }} className="mb-4">
        // KNOWLEDGE CHECK
      </div>
      {questions.map((q, qi) => (
        <div key={qi} className="mb-6">
          <p className="text-white text-sm font-medium mb-3">{qi + 1}. {q.q}</p>
          <div className="space-y-2">
            {q.options.map((opt, oi) => {
              let style = 'border-[rgba(212,168,67,0.1)] bg-[#0F0F0F] text-gray-400 hover:border-[rgba(212,168,67,0.3)]';
              if (submitted) {
                if (oi === q.answer) style = 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300';
                else if (answers[qi] === oi) style = 'border-red-500/40 bg-red-500/10 text-red-300';
                else style = 'border-[rgba(212,168,67,0.1)] bg-[#0F0F0F] text-gray-600';
              } else if (answers[qi] === oi) {
                style = 'border-[rgba(212,168,67,0.5)] bg-[rgba(212,168,67,0.08)] text-[#D4A843]';
              }
              return (
                <button
                  key={oi}
                  disabled={submitted}
                  onClick={() => setAnswers({ ...answers, [qi]: oi })}
                  className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${style}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      ))}
      {!submitted ? (
        <button
          type="button"
          onClick={submitQuiz}
          disabled={Object.keys(answers).length < questions.length}
          className="w-full py-3 rounded-xl font-mono text-sm tracking-wider uppercase transition-all"
          style={{
            background: Object.keys(answers).length === questions.length
              ? 'linear-gradient(135deg, #D4A843, #F0C96A)'
              : 'rgba(212,168,67,0.1)',
            color: Object.keys(answers).length === questions.length ? '#080808' : '#E8C547',
            fontWeight: 700,
          }}
        >
          Submit Answers
        </button>
      ) : (
        <div className="text-center p-4 rounded-xl border border-[rgba(212,168,67,0.2)] bg-[rgba(212,168,67,0.05)]">
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '36px', background: 'linear-gradient(135deg, #D4A843, #F0C96A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {score}/{questions.length}
          </div>
          <p className="text-gray-400 text-sm mt-1">
            {score === questions.length ? '🎯 Perfect! You nailed it.' : score >= questions.length / 2 ? '💪 Good job. Review the ones you missed.' : '📖 Re-read the lesson and try again.'}
          </p>

          {completionState === 'saving' && (
            <p role="status" className="text-[#D4A843] text-sm mt-3">Saving your completion…</p>
          )}
          {completionMessage && completionState !== 'saving' && (
            <p
              role={completionState === 'error' || completionState === 'auth_required' ? 'alert' : 'status'}
              className={`text-sm mt-3 ${
                completionState === 'saved' || completionState === 'already_completed'
                  ? 'text-emerald-300'
                  : completionState === 'quiz_failed'
                    ? 'text-amber-300'
                    : 'text-red-300'
              }`}
            >
              {completionMessage}
            </p>
          )}

          {(completionState === 'error' || completionState === 'auth_required' || completionState === 'already_completed') && (
            <div className="flex flex-col sm:flex-row gap-2 justify-center mt-4">
              {completionState === 'auth_required' ? (
                <Link
                  href={`/auth?next=/lesson/${lessonId}`}
                  className="px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-wider"
                  style={{ background: 'linear-gradient(135deg,#D4A843,#F0C96A)', color: '#080808', fontWeight: 700, textDecoration: 'none' }}
                >
                  Sign In to Save
                </Link>
              ) : completionState !== 'already_completed' ? (
                <button
                  type="button"
                  onClick={saveCompletion}
                  className="px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-wider"
                  style={{ background: 'linear-gradient(135deg,#D4A843,#F0C96A)', color: '#080808', fontWeight: 700 }}
                >
                  Retry Save
                </button>
              ) : null}
            </div>
          )}

          {completionState === 'quiz_failed' && (
            <button
              type="button"
              onClick={retryQuiz}
              className="mt-4 px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-wider"
              style={{ border: '1px solid rgba(212,168,67,0.35)', background: 'transparent', color: '#E8C547', fontWeight: 700 }}
            >
              Retry Quiz
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Main page ───────────────────────────────────────────────────
export default function LessonClient({ lesson, lessonId, moduleDiagramSrc }) {
  const [shareMessage, setShareMessage] = useState('');

  // Lessons are fully public — no auth required for reading
  useEffect(() => {
    trackLessonStart(lessonId, lesson.title);
  }, [lessonId, lesson.title]);

  const handleShare = async (platform) => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    trackShare(platform, 'lesson', lessonId);
    const text = `Studying ICT on ICT Flow — ${lesson.title}. Structured lessons, quizzes and practice tools.`;
    if (!url) return;
    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank', 'noopener,noreferrer');
      return;
    }
    if (platform === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`, '_blank', 'noopener,noreferrer');
      return;
    }
    if (platform === 'copy') {
      try {
        if (navigator?.clipboard?.writeText) {
          await navigator.clipboard.writeText(url);
          setShareMessage('Link copied.');
        } else {
          setShareMessage('Copy is not supported in this browser.');
        }
      } catch {
        setShareMessage('Unable to copy the link.');
      }
    }
  };

  const page = (
    <div className="min-h-screen bg-[#080808] text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`

        :root { --gold: #D4A843; --gold-light: #F0C96A; --gold-dim: #8A6B28; --bg2: #0F0F0F; --bg3: #141414; --border: rgba(212,168,67,0.15); }
        .font-display { font-family: 'Bebas Neue', sans-serif; }
        .font-mono-custom { font-family: 'DM Mono', monospace; }
      `}</style>

      {/* ── Nav ── */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b border-[var(--border)]" style={{ background: 'rgba(8,8,8,0.97)', backdropFilter: 'blur(20px)' }}>
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center font-display text-black text-sm" style={{ background: 'linear-gradient(135deg, #D4A843, #8A6B28)' }}>S</div>
          <span className="font-display text-base tracking-widest text-white group-hover:text-[var(--gold)] transition-colors">ICT FLOW</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          {[['/', 'Home'], ['/foundations', 'Foundations'], ['/courses', 'Courses'], ['/mentorship', 'Mentorship']].map(([href, label]) => (
            <Link key={href} href={href} className="font-mono-custom text-xs text-gray-400 hover:text-[var(--gold)] transition-colors tracking-wider uppercase">{label}</Link>
          ))}
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* ── Breadcrumb ── */}
        <div className="flex items-center gap-2 font-mono-custom text-xs text-gray-500 mb-8">
          <Link href="/courses" className="hover:text-[var(--gold)] transition-colors">Courses</Link>
          <span className="text-gray-700">›</span>
          <span className="text-[var(--gold)]">{lesson.title}</span>
        </div>

        {/* ── Header ── */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className={`px-3 py-1 rounded-lg text-xs font-mono-custom border ${LEVEL_STYLE[lesson.level]}`}>{lesson.level}</span>
            <span className="font-mono-custom text-xs text-gray-500">📖 {lesson.duration}</span>
            <span className="font-mono-custom text-xs text-gray-500">🏷 {lesson.category}</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl text-white mb-4 leading-none">{lesson.title.toUpperCase()}</h1>
          {/* Share Bar */}
          <div style={{ display:'flex', alignItems:'center', gap:'10px', marginTop:'16px', marginBottom:'8px', flexWrap:'wrap' }}>
            <span style={{ fontFamily:'DM Mono,monospace', fontSize:'10px', color:'#B9C1CC', letterSpacing:'0.12em' }}>SHARE FREE:</span>
            <button type="button" onClick={() => handleShare('twitter')} style={{ padding:'6px 14px', borderRadius:'8px', border:'1px solid rgba(29,161,242,0.3)', background:'rgba(29,161,242,0.08)', color:'#1DA1F2', fontFamily:'DM Mono,monospace', fontSize:'10px', cursor:'pointer', letterSpacing:'0.08em' }}>
              𝕏 Twitter
            </button>
            <button type="button" onClick={() => handleShare('whatsapp')} style={{ padding:'6px 14px', borderRadius:'8px', border:'1px solid rgba(37,211,102,0.3)', background:'rgba(37,211,102,0.08)', color:'#25D366', fontFamily:'DM Mono,monospace', fontSize:'10px', cursor:'pointer', letterSpacing:'0.08em' }}>
              WhatsApp
            </button>
            <button type="button" onClick={() => handleShare('copy')} style={{ padding:'6px 14px', borderRadius:'8px', border:'1px solid rgba(232,197,71,0.3)', background:'rgba(232,197,71,0.06)', color:'#E8C547', fontFamily:'DM Mono,monospace', fontSize:'10px', cursor:'pointer', letterSpacing:'0.08em' }}>
              Copy Link
            </button>
            {shareMessage && <span role="status" aria-live="polite" style={{ fontFamily:'DM Mono,monospace', fontSize:'10px', color:'#34D399' }}>{shareMessage}</span>}
          </div>
          <p className="text-gray-400 text-lg" style={{ fontWeight: 300 }}>{lesson.subtitle}</p>
        </div>

        {/* ── Intro ── */}
        <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg2)] mb-8">
          <p className="text-gray-300 leading-relaxed" style={{ fontWeight: 300 }}>{lesson.intro}</p>
        </div>



        <AdSlot />

        {/* ── Module Banner Image ── */}
        <div className="mb-8 rounded-2xl overflow-hidden border border-[var(--border)]" style={{ background: '#0F0F0F' }}>
          <Image
            src={moduleDiagramSrc}
            alt={lesson.title + '  --  ICT concept diagram'}
            width={1200}
            height={380}
            sizes="(max-width: 768px) 100vw, 896px"
            style={{ width: '100%', height: '380px', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
            onError={(e) => { e.currentTarget.parentElement.style.display = 'none'; }}
          />
          <div className="px-4 py-3 border-t border-[var(--border)]">
            <p className="font-mono-custom text-xs text-gray-500">{lesson.imageCaption}</p>
          </div>
        </div>

        {/* ── Content sections ── */}
        <div className="mb-10">
          <div className="font-mono-custom text-xs text-[var(--gold)] tracking-widest uppercase mb-5">// Lesson Content</div>
          {lesson.sections.map((section, i) => (
            <Section
              key={i}
              section={section}
              index={i}
              diagramSrc={i === 0 ? moduleDiagramSrc : null}
              diagramAlt={`${lesson.title} ICT concept diagram`}
            />
          ))}
        </div>

        {/* ── Quiz ── */}
        <div className="mb-10">
          <div className="font-mono-custom text-xs text-[var(--gold)] tracking-widest uppercase mb-5">// Test Your Understanding</div>
          <Quiz questions={lesson.quiz} lessonId={lessonId} />
        </div>

        {/* ── Navigation ── */}
        <div className="grid grid-cols-2 gap-4">
          {lesson.prevLesson ? (
            <Link href={`/lesson/${lesson.prevLesson.id}`}>
              <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--bg2)] hover:border-[rgba(212,168,67,0.35)] transition-all group">
                <div className="font-mono-custom text-xs text-gray-500 mb-1">← Previous</div>
                <div className="font-semibold text-white group-hover:text-[var(--gold)] transition-colors">{lesson.prevLesson.title}</div>
              </div>
            </Link>
          ) : <div />}
          {lesson.nextLesson && (
            <Link href={`/lesson/${lesson.nextLesson.id}`}>
              <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--bg2)] hover:border-[rgba(212,168,67,0.35)] transition-all group text-right">
                <div className="font-mono-custom text-xs text-gray-500 mb-1">Next →</div>
                <div className="font-semibold text-white group-hover:text-[var(--gold)] transition-colors">{lesson.nextLesson.title}</div>
              </div>
            </Link>
          )}
        </div>

      </div>

      {/* ── Next Step CTA ── */}
      <div className="border-t border-[var(--border)] px-6 py-8 mt-8">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="font-mono-custom text-xs text-[var(--gold)] tracking-widest uppercase mb-1">// What to study next</div>
            <div className="text-white font-semibold">Continue your ICT journey</div>
          </div>
          <div className="flex gap-3">
            {lesson.nextLesson && (
              <Link href={`/lesson/${lesson.nextLesson.id}`} className="btn-gold px-6 py-3 rounded-xl font-mono-custom text-xs tracking-widest uppercase" style={{ background: 'linear-gradient(135deg,#D4A843,#F0C96A)', color: '#080808', textDecoration: 'none', fontWeight: 700 }}>
                Next: {lesson.nextLesson.title} →
              </Link>
            )}
            <Link href="/courses" style={{ padding: '12px 20px', borderRadius: '12px', border: '1px solid rgba(212,168,67,0.2)', color: '#C5CCD6', fontFamily: 'DM Mono,monospace', fontSize: '12px', textDecoration: 'none', letterSpacing: '0.08em' }}>
              All Modules
            </Link>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="border-t border-[var(--border)] px-8 py-6 mt-16">
        <div className="max-w-4xl mx-auto text-center font-mono-custom text-xs text-gray-600">
          ICT Flow  --  Educational content only. Not financial advice.
        </div>
      </footer>
    </div>
  );
  return page;
}
