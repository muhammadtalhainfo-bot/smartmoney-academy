export default function Loading() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#080808', 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        width: '48px',
        height: '48px',
        border: '3px solid rgba(212,168,67,0.2)',
        borderTop: '3px solid #E8C547',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }} />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}