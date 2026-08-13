import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMapPin, FiSmile, FiActivity, FiUserCheck, FiLogIn } from 'react-icons/fi';
import { loginUser } from '../services/googleSheets';

const Home = ({ user, onLogin }) => {
  const navigate = useNavigate();
  const [steps, setSteps] = useState(0);

  // Auth form state
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    if (!email || !name) return;
    setLoading(true);
    const userData = await loginUser({ email, name });
    setLoading(false);
    if (userData && onLogin) {
      onLogin(userData);
    }
  };

  // Mock pedometer/walking feature logic
  useEffect(() => {
    const savedSteps = parseInt(localStorage.getItem('scentrip_steps') || '8432');
    setSteps(savedSteps);
    
    const interval = setInterval(() => {
      setSteps(prev => {
        const newSteps = prev + Math.floor(Math.random() * 3);
        localStorage.setItem('scentrip_steps', newSteps.toString());
        return newSteps;
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* Avatar / Boogi equivalent */}
      <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem', position: 'relative' }}>
        <div style={{
          width: '100px', height: '100px', borderRadius: '50%',
          background: '#f0fdf4', border: '4px solid #dcfce7',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '3rem', color: 'var(--accent-color)',
          boxShadow: '0 10px 25px rgba(16,185,129,0.2)'
        }}>
          <FiSmile />
        </div>
        <div style={{
          position: 'absolute', top: '-8px', right: '-15px',
          background: 'var(--accent-color)', color: 'white',
          padding: '4px 10px', borderRadius: '16px',
          fontSize: '0.7rem', fontWeight: '800', letterSpacing: '1px',
          boxShadow: '0 4px 10px rgba(16,185,129,0.3)',
          transform: 'rotate(5deg)'
        }}>
          HI, I'M GULLY!
        </div>
      </div>

      {/* Welcome Text */}
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--header-bg)', marginBottom: '0.5rem', lineHeight: '1.2' }}>
          Welcome to ScenTrip
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5' }}>
          {user ? `Hello ${user.name}! Ready for Busan?` : "Join ScenTrip & explore Busan's eco-friendly gems!"}
        </p>
      </div>

      {/* Login / Sign Up Card (Shown when NOT logged in) */}
      {!user ? (
        <div style={{ 
          width: '100%', 
          background: 'white', 
          borderRadius: '20px', 
          padding: '1.5rem', 
          boxShadow: 'var(--shadow-md)', 
          marginBottom: '1.5rem', 
          border: '1px solid #f1f5f9' 
        }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--header-bg)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiLogIn style={{ color: 'var(--accent-color)' }} /> Sign Up / Login
          </h3>
          <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.3rem', fontWeight: '600' }}>Email Address</label>
              <input 
                type="email" 
                placeholder="example@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ marginBottom: 0 }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.3rem', fontWeight: '600' }}>Full Name</label>
              <input 
                type="text" 
                placeholder="John Doe"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ marginBottom: 0 }}
              />
            </div>
            <button 
              type="submit" 
              className="btn-primary"
              disabled={loading}
              style={{ padding: '0.9rem', fontSize: '1rem', marginTop: '0.4rem', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'Saving to Google Sheet...' : 'Quick Sign Up / Login'}
            </button>
          </form>
        </div>
      ) : (
        <div style={{ 
          width: '100%', 
          background: '#f0fdf4', 
          borderRadius: '16px', 
          padding: '1rem 1.2rem', 
          marginBottom: '1.5rem', 
          border: '1px solid #bbf7d0',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <FiUserCheck style={{ fontSize: '1.8rem', color: 'var(--accent-color)' }} />
          <div>
            <div style={{ fontWeight: '700', color: 'var(--header-bg)' }}>Welcome, {user.name}!</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{user.email} (Linked with Google Sheet)</div>
          </div>
        </div>
      )}

      {/* Walking Tracker Feature */}
      <div style={{ width: '100%', background: 'white', borderRadius: '20px', padding: '1.5rem', boxShadow: 'var(--shadow-md)', marginBottom: '1.5rem', border: '1px solid #f1f5f9' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiActivity style={{ color: 'var(--accent-color)' }} /> Walking Tracker
          </h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--accent-color)', fontWeight: '600', background: '#f0fdf4', padding: '4px 8px', borderRadius: '12px' }}>
            Active
          </span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--header-bg)', letterSpacing: '-1px' }}>
            {steps.toLocaleString()}
          </span>
          <span style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>steps today</span>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: '500' }}>
          <span><FiMapPin style={{ display: 'inline', marginRight: '4px' }}/> {(steps * 0.0007).toFixed(2)} km</span>
          <span>🔥 {(steps * 0.04).toFixed(0)} kcal</span>
        </div>
      </div>

      {/* Main Action Button */}
      <button 
        className="btn-primary"
        onClick={() => navigate('/explore')}
        style={{ width: '100%', padding: '1.1rem', fontSize: '1.1rem', borderRadius: '16px' }}
      >
        Start Exploring
      </button>

    </div>
  );
};

export default Home;
