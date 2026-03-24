'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';

const ADMIN_PASSWORD = 'sma_admin_2026';

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);
  const [emails, setEmails] = useState([]);
  const [trades, setTrades] = useState(0);
  const [loading, setLoading] = useState(false);
  const [notifTitle, setNotifTitle] = useState('');
  const [notifMsg, setNotifMsg] = useState('');
  const [notifSent, setNotifSent] = useState(false);
  const supabase = createClient();

  const login = () => {
    if (pass === ADMIN_PASSWORD) {
      setAuthed(true);
      loadData();
    } else {
      setError('Wrong password');
    }
  };

  const loadData = async () => {
    setLoading(true);
    const { data: profiles } = await supabase
      .from('profiles')
      .select('*')
      .order('xp', { ascending: false });
    setUsers(profiles || []);

    const { data: emailData } = await supabase
      .from('email_signups')
      .select('*')
      .order('created_at', { ascending: false });
    setEmails(emailData || []);

    const { count } = await supabase
      .from('trades')
      .select('*', { count: 'exact', head: true });
    setTrades(count || 0);

    setLoading(false);
  };

  const sendNotification = async () => {
    if (!notifTitle || !notifMsg) return;
    try {
      await fetch('https://onesignal.com/api/v1/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic YOUR_ONESIGNAL_REST_API_KEY',
        },
        body: JSON.stringify({
          app_id: '7091f3f0-0cf1-4afa-9587-0c3040b520c7',
          included_segments: ['All'],
          headings: { en: notifTitle },
          contents: { en: notifMsg },
          url: 'https://smartmoney-academy.vercel.app',
        }),
      });
      setNotifSent(true);
      setNotifTitle('');
      setNotifMsg('');
      setTimeout(() => setNotifSent(false), 3000);
    } catch (e) {
      alert('Failed to send notification');
    }
  };

  const mono = { fontFamily: 'DM Mono, monospace' };
  const card = { background: '#0D0D0D', border: '1px solid rgba(212,168,67,0.1)', borderRadius: '16px', padding: '24px', marginBottom: '24px' };

  if (!authed) {
    return (
      <div style={{ minHeight: '100vh', background: '#080808', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <style>{'@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&display=swap");'}</style>
        <div style={{ ...card, width: '100%', maxWidth: '400px', textAlign: 'center' }}>
          <div style={{ fontFamily: 'Bebas Neue', fontSize: '32px', color: 'white', marginBottom: '8px' }}>ADMIN PANEL</div>
          <div style={{ ...mono, fontSize: '11px', color: 'rgba(212,168,67,0.5)', marginBottom: '24px' }}>SmartMoney Academy</div>
          <input
            type="password"
            placeholder="Enter admin password"
            value={pass}
            onChange={e => setPass(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && login()}
            style={{ width: '100%', background: '#141414', border: '1px solid rgba(212,168,67,0.2)', borderRadius: '8px', padding: '12px', color: 'white', ...mono, fontSize: '13px', outline: 'none', marginBottom: '12px', boxSizing: 'border-box' }}
          />
          {error && <div style={{ ...mono, fontSize: '11px', color: '#F87171', marginBottom: '12px' }}>{error}</div>}
          <button onClick={login} style={{ width: '100%', background: 'linear-gradient(135deg, #D4A843, #F0C96A)', color: '#080808', border: 'none', borderRadius: '8px', padding: '12px', ...mono, fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
            LOGIN
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#080808', color: 'white', padding: '32px 24px' }}>
      <style>{'@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500&family=DM+Mono:wght@400;500&display=swap");'}</style>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <div style={{ fontFamily: 'Bebas Neue', fontSize: '42px', color: 'white' }}>ADMIN PANEL</div>
            <div style={{ ...mono, fontSize: '11px', color: 'rgba(212,168,67,0.5)' }}>SmartMoney Academy — Internal Dashboard</div>
          </div>
          <button onClick={loadData} style={{ background: 'rgba(212,168,67,0.1)', border: '1px solid rgba(212,168,67,0.2)', borderRadius: '8px', padding: '8px 16px', color: '#D4A843', ...mono, fontSize: '11px', cursor: 'pointer' }}>
            ↻ Refresh
          </button>
        </div>

        {loading ? (
          <div style={{ ...mono, fontSize: '12px', color: 'rgba(212,168,67,0.5)', textAlign: 'center', padding: '60px' }}>LOADING DATA...</div>
        ) : (
          <>
            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
              {[
                { label: 'Total Users', value: users.length, icon: '👤' },
                { label: 'Email Signups', value: emails.length, icon: '📧' },
                { label: 'Total Trades', value: trades, icon: '📊' },
              ].map((s, i) => (
                <div key={i} style={card}>
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>{s.icon}</div>
                  <div style={{ fontFamily: 'Bebas Neue', fontSize: '36px', color: '#D4A843' }}>{s.value}</div>
                  <div style={{ ...mono, fontSize: '10px', color: '#808080', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Send Push Notification */}
            <div style={card}>
              <div style={{ ...mono, fontSize: '11px', color: 'rgba(212,168,67,0.6)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px' }}>Send Push Notification</div>
              <input
                placeholder="Title (e.g. New Module Available!)"
                value={notifTitle}
                onChange={e => setNotifTitle(e.target.value)}
                style={{ width: '100%', background: '#141414', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '10px 12px', color: 'white', ...mono, fontSize: '12px', outline: 'none', marginBottom: '10px', boxSizing: 'border-box' }}
              />
              <input
                placeholder="Message (e.g. Module 15 is now live — check it out!)"
                value={notifMsg}
                onChange={e => setNotifMsg(e.target.value)}
                style={{ width: '100%', background: '#141414', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '10px 12px', color: 'white', ...mono, fontSize: '12px', outline: 'none', marginBottom: '12px', boxSizing: 'border-box' }}
              />
              <button onClick={sendNotification} style={{ background: 'linear-gradient(135deg, #D4A843, #F0C96A)', color: '#080808', border: 'none', borderRadius: '8px', padding: '10px 24px', ...mono, fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>
                {notifSent ? '✓ Sent!' : 'Send to All Users'}
              </button>
            </div>

            {/* Users Table */}
            <div style={card}>
              <div style={{ ...mono, fontSize: '11px', color: 'rgba(212,168,67,0.6)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px' }}>
                Users — Top by XP ({users.length} total)
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      {['#', 'Username', 'XP', 'Streak', 'Pro', 'Joined'].map(h => (
                        <th key={h} style={{ ...mono, fontSize: '10px', color: '#808080', textAlign: 'left', padding: '8px 12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {users.slice(0, 50).map((u, i) => (
                      <tr key={u.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                        <td style={{ ...mono, fontSize: '11px', color: '#808080', padding: '10px 12px' }}>{i + 1}</td>
                        <td style={{ ...mono, fontSize: '12px', color: 'white', padding: '10px 12px' }}>{u.username || '—'}</td>
                        <td style={{ ...mono, fontSize: '12px', color: '#D4A843', padding: '10px 12px' }}>{u.xp || 0}</td>
                        <td style={{ ...mono, fontSize: '12px', color: '#34D399', padding: '10px 12px' }}>{u.streak || 0}</td>
                        <td style={{ ...mono, fontSize: '11px', padding: '10px 12px', color: u.is_pro ? '#34D399' : '#808080' }}>{u.is_pro ? '✓ Pro' : 'Free'}</td>
                        <td style={{ ...mono, fontSize: '10px', color: '#808080', padding: '10px 12px' }}>{u.created_at ? new Date(u.created_at).toLocaleDateString() : '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Email Signups */}
            <div style={card}>
              <div style={{ ...mono, fontSize: '11px', color: 'rgba(212,168,67,0.6)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px' }}>
                Email Signups ({emails.length} total)
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      {['#', 'Email', 'Signed Up'].map(h => (
                        <th key={h} style={{ ...mono, fontSize: '10px', color: '#808080', textAlign: 'left', padding: '8px 12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {emails.slice(0, 50).map((e, i) => (
                      <tr key={e.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                        <td style={{ ...mono, fontSize: '11px', color: '#808080', padding: '10px 12px' }}>{i + 1}</td>
                        <td style={{ ...mono, fontSize: '12px', color: 'white', padding: '10px 12px' }}>{e.email}</td>
                        <td style={{ ...mono, fontSize: '10px', color: '#808080', padding: '10px 12px' }}>{e.created_at ? new Date(e.created_at).toLocaleDateString() : '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
