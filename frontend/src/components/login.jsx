import React, { useState } from 'react';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';

function Login({ onLogin, onSwitch }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:8000/api/login', formData);
      onLogin(res.data.user, res.data.token);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <div className="error-msg">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Email Address</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input 
            type={showPassword ? 'text' : 'password'} 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
          />
          <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        </div>

        <button type="submit">Login</button>
      </form>
      <div className="toggle-link">
        you do not have a account? <span onClick={onSwitch}>Register</span>
      </div>
    </div>
  );
}

export default Login;