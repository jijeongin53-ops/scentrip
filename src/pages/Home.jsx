import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LuBird, LuFootprints } from 'react-icons/lu';
import { FiMapPin } from 'react-icons/fi';

const Home = () => {
  const navigate = useNavigate();
  const [steps, setSteps] = useState(0);

  // Mock pedometer/walking feature logic
  useEffect(() => {
    const savedSteps = parseInt(localStorage.getItem('scentrip_steps') || '8432');
    setSteps(savedSteps);
    
    // Simulate taking steps
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
      <div style={{ marginTop: '2rem', marginBottom: '2rem', position: 'relative' }}>
        <div style={{
          width: '120px', height: '120px', borderRadius: '50%',
          background: '#f0fdf4', border: '4px solid #dcfce7',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '3.5rem', color: 'var(--accent-color)',
          boxShadow: '0 10px 25px rgba(16,185,129,0.2)'
        }}>
          <LuBird />
        </div>
        <div style={{
          position: 'absolute', top: '-10px', right: '-20px',
          background: 'var(--accent-color)', color: 'white',
          padding: '6px 12px', borderRadius: '16px',
          fontSize: '0.75rem', fontWeight: '800', letterSpacing: '1px',
          boxShadow: '0 4px 10px rgba(16,185,129,0.3)',
          transform: 'rotate(5deg)'
        }}>
          HI, I'M GULLY!
        </div>
      </div>

      {/* Welcome Text */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: '800', color: 'var(--header-bg)', marginBottom: '1rem', lineHeight: '1.2' }}>
          Welcome to<br/>ScenTrip
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.5', padding: '0 1rem' }}>
          I'm Gully, your eco-friendly guide!<br/>Let's explore the hidden gems of Busan together.
        </p>
      </div>

      {/* Walking Tracker Feature */}
      <div style={{ width: '100%', background: 'white', borderRadius: '20px', padding: '1.5rem', boxShadow: 'var(--shadow-md)', marginBottom: '2rem', border: '1px solid #f1f5f9' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <LuFootprints style={{ color: 'var(--accent-color)' }} /> Walking Tracker
          </h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--accent-color)', fontWeight: '600', background: '#f0fdf4', padding: '4px 8px', borderRadius: '12px' }}>
            Active
          </span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '2.8rem', fontWeight: '800', color: 'var(--header-bg)', letterSpacing: '-1px' }}>
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
        style={{ width: '100%', padding: '1.2rem', fontSize: '1.2rem', borderRadius: '16px' }}
      >
        Start Exploring
      </button>

    </div>
  );
};

export default Home;
