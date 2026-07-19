import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { getAlleyways, getDistricts } from '../services/googleSheets';
import { useLanguage, translations } from '../LanguageContext';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
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
    return <div style={{ textAlign: 'center', padding: '3rem' }}>{t.loading || 'Loading...'}</div>;
  }

  // Calculate center of map based on first alleyway, or default to Busan center
  const mapCenter = alleyways.length > 0 
    ? [alleyways[0].lat, alleyways[0].lng] 
    : [35.1796, 129.0756];

  return (
    <div className="map-directory-container animate-fade-in" style={{ display: 'flex', gap: '2rem', height: 'calc(100vh - 120px)' }}>
      {/* Left Sidebar: List of Alleyways */}
      <div className="sidebar" style={{ flex: '1', overflowY: 'auto', paddingRight: '1rem' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '0.5rem' }}>
          {district?.name || 'Explore'}
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Select an alleyway to uncover its story.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {alleyways.map(alley => (
            <div 
              key={alley.id} 
              className="glass-panel" 
              style={{ padding: '1.5rem', cursor: 'pointer', transition: 'all 0.3s ease' }}
              onClick={() => navigate(`/story/${alley.id}`)}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-color)';
                e.currentTarget.style.transform = 'translateX(10px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--glass-border)';
                e.currentTarget.style.transform = 'translateX(0)';
              }}
            >
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: '#fff' }}>{alley.name}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{alley.intro}</p>
              <div style={{ marginTop: '1rem', color: 'var(--accent-color)', fontSize: '0.85rem', fontWeight: '600' }}>
                READ STORY &rarr;
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side: Map */}
      <div className="map-view glass-panel" style={{ flex: '2', position: 'relative', overflow: 'hidden', borderRadius: '24px' }}>
        <MapContainer center={mapCenter} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {alleyways.map(alley => (
            alley.lat && alley.lng && (
              <Marker key={alley.id} position={[alley.lat, alley.lng]}>
                <Popup>
                  <strong style={{ fontSize: '1.1rem' }}>{alley.name}</strong><br/>
                  <span style={{ color: '#666' }}>{alley.intro}</span><br/>
                  <button 
                    onClick={() => navigate(`/story/${alley.id}`)}
                    style={{ marginTop: '8px', padding: '4px 8px', background: '#38bdf8', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
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
