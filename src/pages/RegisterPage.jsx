import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const isFormValid = username.trim() !== '' && password.trim() !== '' && confirmPassword.trim() !== '';

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setIsLoading(true);

    try {
      await axios.post('/api/user/register', { 
        username: username, 
        password: password 
      });
      

      navigate('/'); 
    } catch (err) {
      const errorMessage = err.response?.data || "Registration failed. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container auth-page">
      <h1>Register</h1>
      
      {/* 错误信息提示 */}
      {error && <div style={{ color: '#c62828', marginBottom: '1rem', fontWeight: 'bold' }}>{error}</div>}
      
      <form onSubmit={handleRegister} className="auth-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input 
            id="username"
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="Choose a username"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input 
            id="password"
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Create a password"
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Verify Password:</label>
          <input 
            id="confirmPassword"
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            placeholder="Re-enter password"
          />
        </div>

        <button 
          type="submit" 
          className="button-primary"
          disabled={!isFormValid || isLoading} 
          style={{ opacity: (!isFormValid || isLoading) ? 0.6 : 1 }}
        >
          {isLoading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>

      <p style={{ marginTop: '1.5rem', textAlign: 'center' }}>
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </div>
  );
}

export default RegisterPage;