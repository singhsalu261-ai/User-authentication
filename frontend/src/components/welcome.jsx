import React from 'react';

function Welcome({ user, onLogout }) {
  return (
    <div style={{
      backgroundColor: '#ffffff',
      padding: '40px',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      width: '400px',
      textAlign: 'center',
      margin: 'auto'
    }}>
      <h2 style={{ fontSize: '26px', marginBottom: '10px', color: '#1a1a1a' }}>
        Welcome, {user?.name}!
      </h2>
      <p style={{ margin: '20px 0', color: '#4a5568' }}>
        successfully login.
      </p>
      <button 
        onClick={onLogout} 
        style={{ 
          backgroundColor: '#e53e3e', 
          color: 'white',
          border: 'none',
          padding: '12px 20px',
          borderRadius: '6px',
          cursor: 'pointer',
          width: '100%',
          fontSize: '16px',
          fontWeight: 'bold'
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Welcome;





















// function Welcome({ user, onLogout }) {
//   return (
//     <div className="auth-container" style={{ textAlign: 'center' }}>
//       <h2>Welcome, {user.name}!</h2>
//       <p style={{ margin: '20px 0', color: '#4a5568' }}>successfully login.</p>
//       <button onClick={onLogout} style={{ backgroundColor: '#e53e3e' }}>
//         Logout
//       </button>
//     </div>
//   );
// }