import React from 'react';
import { useNavigate } from 'react-router-dom';
import splashBg from '../assets/splash_bg.png';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="splash-container animate-fade-in" 
      style={{ 
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: `url(${splashBg}) center/cover no-repeat`,
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
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(4px)',
            border: '2px solid #fff',
            borderRadius: '30px',
            padding: '0.8rem 2.5rem',
            color: '#fff',
            fontSize: '1.2rem',
            fontWeight: '600',
            cursor: 'pointer',
            textShadow: '0 2px 8px rgba(0,0,0,0.5)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.2)';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.1)';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          Log in
        </button>

      </div>
    </div>
  );
};

export default Home;
