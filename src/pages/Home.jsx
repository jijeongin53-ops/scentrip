import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDistricts } from '../services/googleSheets';
import { useLanguage, translations } from '../LanguageContext';
import mainImage from '../assets/main_image.png';

const Home = () => {
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    const fetchDistricts = async () => {
      const data = await getDistricts();
      setDistricts(data);
      setLoading(false);
    };
    fetchDistricts();
  }, []);

  return (
    <div className="home-container animate-fade-in">
      <div className="hero-section" style={{ position: 'relative', width: '100%', height: '50vh', borderRadius: '24px', overflow: 'hidden', marginBottom: '3rem', boxShadow: 'var(--glass-shadow)' }}>
        <img src={mainImage} alt="ScenTrip Main" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.9), transparent)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '3rem' }}>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '3.5rem', marginBottom: '1rem', color: '#fff', textShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>{t.discover}</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px' }}>{t.discoverSub}</p>
        </div>
      </div>

      <div className="districts-section">
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>{t.chooseDistrict}</h2>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>{t.loading}</div>
        ) : (
          <div className="districts-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {districts.map((district, idx) => (
              <div 
                key={district.id} 
                className="district-card glass-panel" 
                onClick={() => navigate(`/district/${district.id}`)}
                style={{
                  cursor: 'pointer',
                  overflow: 'hidden',
                  transition: 'all 0.4s ease',
                  animationDelay: `${idx * 0.1}s`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(56, 189, 248, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--glass-shadow)';
                }}
              >
                <div style={{ height: '200px', width: '100%', overflow: 'hidden' }}>
                  <img src={district.image} alt={district.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} className="card-img" />
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{district.name}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{district.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
