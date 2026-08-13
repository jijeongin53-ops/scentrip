import React from 'react';
import { FiZap, FiAward, FiLogOut } from 'react-icons/fi';
import { LuUser2 } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';

const Profile = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) onLogout();
    navigate('/');
  };

  return (
    <div className="page-container">
      {/* Profile Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem', marginTop: '1rem' }}>
        <div style={{ 
          width: '80px', height: '80px', borderRadius: '50%', 
          border: '3px solid var(--accent-color)', 
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '2.5rem', color: 'var(--text-secondary)',
          position: 'relative'
        }}>
          <LuUser2 />
          <div style={{
            position: 'absolute', bottom: '-5px', right: '-5px',
            background: 'var(--accent-color)', color: 'white',
            width: '28px', height: '28px', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1rem', border: '2px solid var(--bg-color)'
          }}>
            <FiAward />
          </div>
        </div>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '4px', color: 'var(--text-primary)' }}>
            {user?.name || 'Soul Traveler'}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.9rem', letterSpacing: '1px' }}>
            ELITE MATE LEVEL
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stat-grid">
        <div className="stat-card blue">
          <FiZap className="stat-icon" />
          <div className="stat-value">42</div>
          <div className="stat-label">Total Scans</div>
        </div>
        <div className="stat-card yellow">
          <FiAward className="stat-icon" />
          <div className="stat-value">12</div>
          <div className="stat-label">Rewards Earned</div>
        </div>
      </div>

      {/* Green Footprint Card */}
      <div className="dark-card">
        <h2 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '4px' }}>Your Green Footprint</h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Since joining in Busan</p>
        
        <div style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1.5rem', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
          2.4 <span style={{ fontSize: '1.2rem', color: 'var(--accent-color)', fontWeight: '600' }}>kg CO2 Saved</span>
        </div>

        {/* Progress Bar */}
        <div style={{ background: 'rgba(255,255,255,0.1)', height: '10px', borderRadius: '5px', overflow: 'hidden', marginBottom: '0.8rem' }}>
          <div style={{ background: 'var(--accent-color)', width: '65%', height: '100%', borderRadius: '5px' }}></div>
        </div>
        <div style={{ textAlign: 'center', fontSize: '0.75rem', fontWeight: '600', letterSpacing: '1px', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>
          65% TO NEXT VOLUNTEER REWARD
        </div>
      </div>

      {/* Logout Button */}
      <button 
        onClick={handleLogout}
        style={{ 
          width: '100%', padding: '1rem', background: 'transparent', 
          border: '1px solid #e2e8f0', borderRadius: '12px',
          color: 'var(--text-secondary)', fontWeight: '600', fontSize: '1rem',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
          marginTop: '2rem', cursor: 'pointer'
        }}
      >
        <FiLogOut /> Logout
      </button>
    </div>
  );
};

export default Profile;
