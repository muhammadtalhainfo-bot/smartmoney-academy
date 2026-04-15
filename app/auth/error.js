'use client'

export default function Error({ error, reset }) {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#080808', 
      color: '#ededed',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      textAlign: 'center'
    }}>
      <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '48px', marginBottom: '16px' }}>
        Something went wrong
      </h2>
      <p style={{ fontFamily: 'DM Sans, sans-serif', color: 'rgba(255,255,255,0.65)', marginBottom: '24px' }}>
        {error.message || 'An unexpected error occurred'}
      </p>
      <button
        onClick={reset}
        style={{
          background: 'linear-gradient(135deg, #D4A843, #F0C96A)',
          color: '#080808',
          border: 'none',
          borderRadius: '8px',
          padding: '12px 24px',
          fontFamily: 'DM Mono, monospace',
          fontSize: '14px',
          fontWeight: 600,
          cursor: 'pointer'
        }}
      >
        Try again
      </button>
    </div>
  )
}