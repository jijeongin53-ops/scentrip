import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="splash-container animate-fade-in" 
      style={{ 
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: `url('https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=1920&q=80') center/cover no-repeat`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-sans)',
      }}
    >
      {/* Dark Overlay for better text readability */}
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.3)' }}></div>

      {/* Main Content Container */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '100%' }}>
        
        {/* Top Logo */}
        <h1 style={{ 
          fontSize: '4rem', 
          fontWeight: '700', 
          marginTop: '10vh',
          textShadow: '0 4px 10px rgba(0,0,0,0.5), 0 0 20px rgba(255,255,255,0.5)',
          letterSpacing: '2px',
          color: '#fff'
        }}>
          <span style={{ color: '#38bdf8' }}>S</span>cen<span style={{ color: '#38bdf8' }}>T</span>rip
        </h1>

        {/* Center Text */}
        <div style={{ 
          marginTop: 'auto',
          textAlign: 'center',
          fontSize: '1.8rem',
          fontWeight: '600',
          lineHeight: '1.5',
          textShadow: '0 2px 8px rgba(0,0,0,0.8)',
          color: '#fff'
        }}>
          <div>When traveling to Busan,</div>
          <div><span style={{ color: '#38bdf8' }}>s</span>cen<span style={{ color: '#38bdf8' }}>T</span>rip</div>
          <div style={{ marginTop: '1rem' }}>need the scent of Busan,</div>
          <div><span style={{ color: '#38bdf8' }}>s</span>cen<span style={{ color: '#38bdf8' }}>T</span>rip</div>
        </div>

        {/* Login Button */}
        <button 
          onClick={() => navigate('/auth')}
          style={{
            marginTop: '3rem',
            marginBottom: 'auto',
            background: 'transparent',
            border: 'none',
            color: '#fff',
            fontSize: '1.5rem',
            fontWeight: '700',
            cursor: 'pointer',
            textShadow: '0 2px 8px rgba(0,0,0,0.8)',
            textDecoration: 'none'
          }}
          onMouseEnter={(e) => e.target.style.color = '#38bdf8'}
          onMouseLeave={(e) => e.target.style.color = '#fff'}
        >
          Log in
        </button>

        {/* Bottom Left Logo Stamp */}
        <div style={{ 
          position: 'absolute', 
          bottom: '2rem', 
          left: '2rem',
          background: '#fef08a', /* Yellow-ish stamp */
          borderRadius: '50% 40% 60% 40%',
          padding: '1.5rem',
          transform: 'rotate(-5deg)',
          boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '120px',
          height: '80px'
        }}>
          <div style={{ color: '#000', fontWeight: '800', fontSize: '1.1rem', lineHeight: '1' }}>
            <span style={{ color: '#0284c7' }}>s</span>cen<span style={{ color: '#0284c7' }}>T</span>rip
          </div>
          <div style={{ color: '#000', fontSize: '0.6rem', fontWeight: '600', marginTop: '2px' }}>
            with Busan
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;
