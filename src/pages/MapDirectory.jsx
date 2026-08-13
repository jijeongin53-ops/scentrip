import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { getAlleyways, getDistricts } from '../services/googleSheets';
import { useLanguage, translations } from '../LanguageContext';
import { FiNavigation, FiMapPin } from 'react-icons/fi';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Cute character map marker pin for spots
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

// User location marker pin (pulsating blue marker)
const userLocationIcon = L.divIcon({
  className: 'user-location-pin',
  html: `<div style="
    background: #3b82f6;
    color: white;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 0 8px rgba(59, 130, 246, 0.25);
    border: 3px solid white;
    animation: pulse 2s infinite;
  ">
    <div style="font-size: 20px; line-height: 1;">📍</div>
  </div>`,
  iconSize: [42, 42],
  iconAnchor: [21, 21],
  popupAnchor: [0, -21]
});

// Component to dynamically re-center map
function ChangeView({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, 14);
    }
  }, [center, map]);
  return null;
}

// Haversine formula to calculate distance in km
function calculateDistance(lat1, lon1, lat2, lon2) {
  if (!lat1 || !lon1 || !lat2 || !lon2) return null;
  const R = 6371; // km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c).toFixed(1);
}

const MapDirectory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language] || translations.en;
  
  const [alleyways, setAlleyways] = useState([]);
  const [district, setDistrict] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userPos, setUserPos] = useState(null);
  const [locating, setLocating] = useState(false);

  // Request Geolocation
  const handleLocateMe = () => {
    setLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserPos([latitude, longitude]);
          setLocating(false);
        },
        (error) => {
          console.warn('Geolocation error:', error);
          // Fallback to Haeundae/Busan center if location denied
          setUserPos([35.1631, 129.1636]);
          setLocating(false);
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      setUserPos([35.1631, 129.1636]);
      setLocating(false);
    }
  };

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
    // Auto locate on mount
    handleLocateMe();
  }, [id]);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>{t.loading || 'Loading...'}</div>;
  }

  // Map center logic: User position first, or fallback to first spot/Busan center
  const mapCenter = userPos || (alleyways.length > 0 ? [alleyways[0].lat, alleyways[0].lng] : [35.1796, 129.0756]);

  // Sort alleyways by distance to user if user position is available
  const sortedAlleyways = [...alleyways].map(alley => {
    const dist = userPos ? calculateDistance(userPos[0], userPos[1], alley.lat, alley.lng) : null;
    return { ...alley, dist };
  }).sort((a, b) => (a.dist && b.dist) ? parseFloat(a.dist) - parseFloat(b.dist) : 0);

  return (
    <div className="map-directory-container animate-fade-in" style={{ display: 'flex', gap: '1.5rem', height: 'calc(100vh - 150px)', padding: '1rem' }}>
      {/* Left Sidebar: Nearby Alleyways & Spots */}
      <div className="sidebar" style={{ flex: '1', overflowY: 'auto', paddingRight: '0.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--header-bg)' }}>
            {district?.name || 'Nearby Spots'}
          </h1>
          <button 
            onClick={handleLocateMe}
            style={{ 
              background: '#f0fdf4', 
              color: 'var(--accent-color)', 
              border: '1px solid #bbf7d0', 
              borderRadius: '20px', 
              padding: '6px 12px', 
              fontSize: '0.8rem', 
              fontWeight: '700', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <FiNavigation /> {locating ? 'Locating...' : 'My Location'}
          </button>
        </div>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
          {userPos ? 'Showing eco-friendly spots near your current location.' : 'Select a spot to uncover its story.'}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {sortedAlleyways.map(alley => (
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', fontWeight: '700' }}>{alley.name}</h3>
                {alley.dist && (
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent-color)', fontWeight: '700', background: '#f0fdf4', padding: '2px 8px', borderRadius: '10px' }}>
                    <FiMapPin style={{ display: 'inline', marginRight: '2px' }} />{alley.dist} km
                  </span>
                )}
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.4' }}>{alley.intro}</p>
              <div style={{ marginTop: '0.8rem', color: 'var(--accent-color)', fontSize: '0.85rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                READ STORY &rarr;
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side: Interactive Map */}
      <div className="map-view glass-panel" style={{ flex: '1.5', position: 'relative', overflow: 'hidden', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
        <MapContainer center={mapCenter} zoom={13} style={{ height: '100%', width: '100%' }}>
          <ChangeView center={userPos} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* User Location Marker */}
          {userPos && (
            <Marker position={userPos} icon={userLocationIcon}>
              <Popup>
                <div style={{ textAlign: 'center', fontWeight: '700', color: '#1e40af' }}>
                  📍 My Current Location
                </div>
              </Popup>
            </Marker>
          )}

          {/* Spots Markers */}
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
