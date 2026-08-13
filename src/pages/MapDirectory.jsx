import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { getAlleyways, getDistricts } from '../services/googleSheets';
import { useLanguage, translations } from '../LanguageContext';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Cute character map marker pin
const cuteCharacterIcon = L.divIcon({
  className: 'custom-cute-pin',
  html: `<div style="
    background: #10b981;
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(16,185,129,0.4);
    border: 3px solid white;
  ">
    <div style="transform: rotate(45deg); font-size: 20px; line-height: 1;">🐣</div>
  </div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40]
});

const MapDirectory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language] || translations.en;
  
  const [alleyways, setAlleyways] = useState([]);
  const [district, setDistrict] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const districts = await getDistricts();
      const currentDistrict = districts.find(d => d.id === id);
      setDistrict(currentDistrict);

      const data = await getAlleyways(id);
      setAlleyways(data);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>{t.loading || 'Loading...'}</div>;
  }

  // Calculate center of map based on first alleyway, or default to Busan center
  const mapCenter = alleyways.length > 0 
    ? [alleyways[0].lat, alleyways[0].lng] 
    : [35.1796, 129.0756];

  return (
    <div className="map-directory-container animate-fade-in" style={{ display: 'flex', gap: '1.5rem', height: 'calc(100vh - 150px)', padding: '1rem' }}>
      {/* Left Sidebar: List of Alleyways */}
      <div className="sidebar" style={{ flex: '1', overflowY: 'auto', paddingRight: '0.5rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.3rem', color: 'var(--header-bg)' }}>
          {district?.name || 'Explore'}
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
          Select an alleyway to uncover its story.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {alleyways.map(alley => (
            <div 
              key={alley.id} 
              className="glass-panel" 
              style={{ padding: '1.2rem', cursor: 'pointer', transition: 'all 0.3s ease', background: 'white' }}
              onClick={() => navigate(`/story/${alley.id}`)}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-color)';
                e.currentTarget.style.transform = 'translateX(6px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.transform = 'translateX(0)';
              }}
            >
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.4rem', color: 'var(--text-primary)', fontWeight: '700' }}>{alley.name}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.4' }}>{alley.intro}</p>
              <div style={{ marginTop: '0.8rem', color: 'var(--accent-color)', fontSize: '0.85rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                READ STORY &rarr;
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side: Map */}
      <div className="map-view glass-panel" style={{ flex: '1.5', position: 'relative', overflow: 'hidden', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
        <MapContainer center={mapCenter} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {alleyways.map(alley => (
            alley.lat && alley.lng && (
              <Marker key={alley.id} position={[alley.lat, alley.lng]} icon={cuteCharacterIcon}>
                <Popup>
                  <strong style={{ fontSize: '1.1rem', color: '#0f172a' }}>{alley.name}</strong><br/>
                  <span style={{ color: '#64748b', fontSize: '0.85rem' }}>{alley.intro}</span><br/>
                  <button 
                    onClick={() => navigate(`/story/${alley.id}`)}
                    style={{ marginTop: '8px', padding: '6px 12px', background: 'var(--accent-color)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
                  >
                    Read Story
                  </button>
                </Popup>
              </Marker>
            )
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapDirectory;
