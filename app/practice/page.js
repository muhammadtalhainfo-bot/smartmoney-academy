'use client';
import { QUESTIONS } from './questions';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

// Get today's 5 questions based on day of year
function getTodaysQuestions() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  const setIndex = dayOfYear % Math.floor(QUESTIONS.length / 5);
  return QUESTIONS.slice(setIndex * 5, setIndex * 5 + 5);
}

const DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export default function PracticePage() {
  const [questions] = useState(getTodaysQuestions);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [done, setDone] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const today = new Date();
  const dateStr = `${DAYS[today.getDay()]}, ${MONTHS[today.getMonth()]} ${today.getDate()}`;

  const q = questions[current];
  const progress = ((current) / questions.length) * 100;

  function handleSelect(i) {
    if (revealed) return;
    setSelected(i);
  }

  function handleReveal() {
    if (selected === null) return;
    setRevealed(true);
    const correct = selected === q.answer;
    if (correct) setScore(s => s + 1);
    setAnswers(prev => [...prev, { correct, selected, answer: q.answer }]);
  }

  function handleNext() {
    if (current + 1 >= questions.length) {
      const finalCorrect = answers.filter(a => a.correct).length + (selected === q.answer ? 1 : 0);
      const xp = finalCorrect * 20 + (finalCorrect === questions.length ? 50 : 0);
      setXpEarned(xp);
      setDone(true);
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setRevealed(false);
    }
  }

  const finalScore = answers.filter(a => a.correct).length + (revealed && selected === q?.answer ? 1 : 0);

  return (
    <div className="min-h-screen bg-[#080808] text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <h1 className="font-display text-4xl md:text-6xl text-white mb-8 text-center">Practice</h1>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Bebas+Neue&family=DM+Mono:wght@400;500&display=swap');
        .font-display { font-family: 'Bebas Neue', sans-serif; }
        .font-mono-custom { font-family: 'DM Mono', monospace; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px);} to { opacity:1; transform:translateY(0);} }
        .fade-up { animation: fadeUp 0.35s ease forwards; }
        @keyframes pop { 0%{transform:scale(0.95)} 50%{transform:scale(1.03)} 100%{transform:scale(1)} }
        .pop { animation: pop 0.25s ease; }
      `}</style>

      {/* ── Nav ── */}
      <Navbar active="/practice" />

      <div className="max-w-2xl mx-auto px-4 py-8">

        {!done ? (
          <>
            {/* ── Header ── */}
            <div className="mb-8 fade-up">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="font-mono-custom text-xs text-[#E8C547] tracking-widest uppercase mb-1">// Daily Challenge</div>
                  <div className="font-mono-custom text-xs text-gray-200">{dateStr}</div>
                </div>
                <div className="text-right">
                  <div className="font-display text-3xl" style={{ background: 'linear-gradient(135deg, #E8C547, #F0C96A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {current + 1}/{questions.length}
                  </div>
                  <div className="font-mono-custom text-xs text-gray-200">questions</div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-1.5 bg-[#1A1A1A] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #E8C547, #F0C96A)' }}
                />
              </div>
            </div>

            {/* ── Question Card ── */}
            <div key={current} className="fade-up">
              {/* Topic tag */}
              <div className="flex items-center gap-2 mb-4">
                <span className="font-mono-custom text-xs px-3 py-1 rounded-lg border border-[#E8C547] text-[#E8C547] bg-[rgba(212,168,67,0.05)]">
                  {q.topic}
                </span>
                <span className={`font-mono-custom text-xs px-3 py-1 rounded-lg border ${
                  q.difficulty === 'Beginner' ? 'border-emerald-500/20 text-emerald-400 bg-emerald-500/5' :
                  q.difficulty === 'Intermediate' ? 'border-amber-500/20 text-amber-400 bg-amber-500/5' :
                  'border-red-500/20 text-red-400 bg-red-500/5'
                }`}>{q.difficulty}</span>
              </div>

              {/* Question */}
              <div className="p-6 rounded-2xl border border-[rgba(232,197,71,0.95)] bg-[#0F0F0F] mb-5">
                <p className="text-white text-lg font-medium leading-relaxed">{q.q}</p>
              </div>

              {/* Options */}
              <div className="space-y-3 mb-6">
                {q.options.map((opt, i) => {
                  let borderColor = 'rgba(232,197,71,0.95)';
                  let bg = '#0F0F0F';
                  let textColor = 'text-gray-200';
                  let icon = null;

                  if (!revealed) {
                    if (selected === i) {
                      borderColor = '#E8C547';
                      bg = 'rgba(212,168,67,0.22)';
                      textColor = 'text-[#E8C547]';
                    }
                  } else {
                    if (i === q.answer) {
                      borderColor = 'rgba(52,211,153,0.4)';
                      bg = 'rgba(52,211,153,0.08)';
                      textColor = 'text-emerald-300';
                      icon = '✓';
                    } else if (selected === i && i !== q.answer) {
                      borderColor = 'rgba(239,68,68,0.4)';
                      bg = 'rgba(239,68,68,0.08)';
                      textColor = 'text-red-300';
                      icon = '✗';
                    } else {
                      textColor = 'text-gray-200';
                    }
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => handleSelect(i)}
                      disabled={revealed}
                      className={`w-full text-left px-5 py-4 rounded-xl border transition-all flex items-center justify-between gap-3 ${revealed ? '' : 'hover:border-[#E8C547] cursor-pointer'} ${textColor}`}
                      style={{ borderColor, background: bg }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono-custom text-xs opacity-50 shrink-0">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span className="text-sm leading-relaxed">{opt}</span>
                      </div>
                      {icon && <span className="text-base shrink-0 font-bold">{icon}</span>}
                    </button>
                  );
                })}
              </div>

              {/* Explanation (revealed) */}
              {revealed && (
                <div className="fade-up p-5 rounded-xl border border-[#E8C547] bg-[rgba(212,168,67,0.04)] mb-5">
                  <div className="font-mono-custom text-xs text-[#E8C547] mb-2">// Explanation</div>
                  <p className="text-gray-200 text-sm leading-relaxed">{q.explanation}</p>
                  <Link href={`/lesson/${q.lesson}`} className="inline-flex items-center gap-1 mt-3 font-mono-custom text-xs text-[#E8C547] hover:text-[#F0C96A] transition-colors">
                    📖 Review Lesson {q.lesson} →
                  </Link>
                </div>
              )}

              {/* Action button */}
              {!revealed ? (
                <button
                  onClick={handleReveal}
                  disabled={selected === null}
                  className="w-full py-4 rounded-xl font-mono-custom text-sm tracking-wider uppercase font-bold transition-all"
                  style={{
                    background: selected !== null ? 'linear-gradient(135deg, #E8C547, #F0C96A)' : 'rgba(232,197,71,0.95)',
                    color: selected !== null ? '#080808' : '#8A6B28',
                  }}
                >
                  {selected === null ? 'Select an answer' : 'Check Answer'}
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="w-full py-4 rounded-xl font-mono-custom text-sm tracking-wider uppercase font-bold transition-all pop"
                  style={{ background: 'linear-gradient(135deg, #E8C547, #F0C96A)', color: '#080808' }}
                >
                  {current + 1 >= questions.length ? 'See Results →' : 'Next Question →'}
                </button>
              )}
            </div>

            {/* Score tracker */}
            <div className="mt-6 flex justify-center gap-2">
              {questions.map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full transition-all ${
                  i < answers.length
                    ? answers[i].correct ? 'bg-emerald-400' : 'bg-red-400'
                    : i === current ? 'bg-[#E8C547]' : 'bg-[#2A2A2A]'
                }`} />
              ))}
            </div>
          </>
        ) : (
          /* ── Results Screen ── */
          <div className="fade-up text-center">
            <div className="font-mono-custom text-xs text-[#E8C547] tracking-widest uppercase mb-6">// Challenge Complete</div>

            {/* Score circle */}
            <div className="w-40 h-40 rounded-full mx-auto mb-6 flex flex-col items-center justify-center border-2"
              style={{
                borderColor: finalScore >= 4 ? '#34D399' : finalScore >= 3 ? '#E8C547' : '#EF4444',
                background: finalScore >= 4 ? 'rgba(52,211,153,0.08)' : finalScore >= 3 ? 'rgba(212,168,67,0.22)' : 'rgba(239,68,68,0.08)',
              }}>
              <div className="font-display text-6xl" style={{
                background: finalScore >= 4 ? 'linear-gradient(135deg,#34D399,#6EE7B7)' : finalScore >= 3 ? 'linear-gradient(135deg,#E8C547,#F0C96A)' : 'linear-gradient(135deg,#EF4444,#FCA5A5)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
              }}>
                {finalScore}/{questions.length}
              </div>
              <div className="font-mono-custom text-xs text-gray-200 mt-1">correct</div>
            </div>

            {/* XP earned */}
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#E8C547] bg-[rgba(212,168,67,0.05)] mb-6">
              <span className="text-xl">⚡</span>
              <span className="font-display text-2xl" style={{ color: '#E8C547' }}>+{xpEarned} Practice XP</span>
              <span className="font-mono-custom text-xs text-gray-200">earned</span>
            </div>

            {/* Performance message */}
            <div className="p-5 rounded-xl border border-[rgba(232,197,71,0.95)] bg-[#0F0F0F] mb-6 text-left">
              <p className="text-white font-semibold mb-1">
                {finalScore === 5 ? '🎯 Perfect Score! Elite level.' :
                 finalScore === 4 ? '💪 Strong performance. One missed — review it.' :
                 finalScore === 3 ? '📈 Solid. Two gaps to close — check the lessons.' :
                 finalScore <= 2 ? '📖 Go back to the lessons. Fundamentals first.' : ''}
              </p>
              <p className="text-gray-200 text-sm">Come back tomorrow for a new challenge. Consistency builds the edge.</p>
            </div>

            {/* Question review */}
            <div className="text-left mb-8">
              <div className="font-mono-custom text-xs text-[#E8C547] tracking-widest uppercase mb-3">// Review</div>
              {questions.map((question, i) => {
                const ans = answers[i];
                if (!ans) return null;
                return (
                  <div key={i} className={`flex items-start gap-3 p-4 rounded-xl border mb-2 ${ans.correct ? 'border-emerald-500/20 bg-emerald-500/5' : 'border-red-500/20 bg-red-500/5'}`}>
                    <span className={`text-base shrink-0 mt-0.5 ${ans.correct ? 'text-emerald-400' : 'text-red-400'}`}>{ans.correct ? '✓' : '✗'}</span>
                    <div>
                      <p className={`text-sm font-medium ${ans.correct ? 'text-emerald-300' : 'text-red-300'}`}>{question.topic}</p>
                      <p className="text-gray-200 text-xs mt-0.5 leading-relaxed">{question.question.substring(0, 80)}...</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Link href="/courses">
                <div className="py-4 rounded-xl border border-[#E8C547] bg-[#0F0F0F] hover:border-[rgba(232,197,71,0.95)] transition-all text-center">
                  <div className="font-mono-custom text-xs text-[#E8C547] tracking-wider uppercase">Study</div>
                  <div className="text-xs text-gray-200 mt-1">Review lessons</div>
                </div>
              </Link>
              <Link href="/dashboard">
                <div className="py-4 rounded-xl text-center transition-all" style={{ background: 'linear-gradient(135deg, #E8C547, #F0C96A)' }}>
                  <div className="font-mono-custom text-xs text-black font-bold tracking-wider uppercase">Dashboard</div>
                  <div className="text-xs text-black/60 mt-1">See your progress</div>
                </div>
              </Link>
            </div>

            <p className="font-mono-custom text-xs text-gray-200 mt-6">New challenge unlocks tomorrow at midnight</p>
          </div>
        )}
      </div>
    <Footer />
    </div>
  );
}
