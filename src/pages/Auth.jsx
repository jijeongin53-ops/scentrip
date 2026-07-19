import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginUser } from '../services/googleSheets';

const Auth = ({ onLogin }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Call the mock/real service
    const user = await loginUser({ email, name });
    setLoading(false);
    
    if (user) {
      onLogin(user);
      // Redirect back to where they came from or home
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    } else {
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="auth-container animate-fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
      <div className="glass-panel" style={{ padding: '3rem', maxWidth: '400px', width: '100%', margin: '0 1rem' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '0.5rem', textAlign: 'center' }}>Welcome to ScenTrip</h2>
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '2rem' }}>Please log in to continue</p>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Email</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Name (for new users)</label>
            <input 
              type="text" 
              required 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
            />
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            disabled={loading}
            style={{ marginTop: '1rem', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Logging in...' : 'Continue'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
