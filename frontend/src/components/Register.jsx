import React, { useState } from 'react';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';

function Register({ onSwitch }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('please fill all field.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Do not match password or confirm password.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:8000/api/register', formData);
      alert(res.data.message);
      onSwitch();
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      {error && <div className="error-msg">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Full Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>

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

        <div className="input-group">
          <label>Confirm Password</label>
          <input 
            type={showConfirmPassword ? 'text' : 'password'} 
            name="confirmPassword" 
            value={formData.confirmPassword} 
            onChange={handleChange} 
            required 
          />
          <span className="eye-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        </div>

        <div className="checkbox-group">
          <input 
            type="checkbox" 
            id="rememberMe" 
            name="rememberMe" 
            checked={formData.rememberMe} 
            onChange={handleChange} 
          />
          <label htmlFor="rememberMe">Remember Me</label>
        </div>

        <button type="submit">Register Account</button>
      </form>
      <div className="toggle-link">
        you have already account? <span onClick={onSwitch}>Login</span>
      </div>
    </div>
  );
}

export default Register;