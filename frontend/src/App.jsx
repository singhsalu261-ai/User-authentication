import React, { useState, useEffect } from 'react';
import Login from './components/login';
import Register from './components/Register';
import Welcome from './components/welcome';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData, token) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    
    localStorage.removeItem('token');
  };

  return (
    <div>
      {user ? (
        <Welcome user={user} onLogout={handleLogout} />
      ) : isRegistering ? (
        <Register onSwitch={() => setIsRegistering(false)} />
      ) : (
        <Login onLogin={handleLogin} onSwitch={() => setIsRegistering(true)} />
      )}
    </div>
  );
}

export default App;