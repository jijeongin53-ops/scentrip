import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import MapDirectory from './pages/MapDirectory';
import Story from './pages/Story';
import Review from './pages/Review';
import Auth from './pages/Auth';
import { useLanguage } from './LanguageContext';
import './index.css';

function App() {
  const { language, setLanguage } = useLanguage();
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <BrowserRouter>
      <header className="app-header" style={{ justifyContent: 'space-between' }}>
        <Link to="/" className="logo">ScenTrip</Link>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          {['en', 'ko', 'ja', 'zh'].map(lang => (
            <button 
              key={lang} 
              onClick={() => setLanguage(lang)}
              style={{
                background: language === lang ? 'var(--accent-color)' : 'transparent',
                color: '#fff', border: '1px solid var(--accent-color)', borderRadius: '4px',
                padding: '0.2rem 0.5rem', cursor: 'pointer', fontFamily: 'var(--font-sans)',
                fontWeight: '600', transition: 'all 0.3s ease', textTransform: 'uppercase', fontSize: '0.8rem'
              }}
            >
              {lang}
            </button>
          ))}
          
          {user ? (
            <button onClick={handleLogout} className="btn-secondary" style={{ marginLeft: '1rem', padding: '0.3rem 0.8rem', background: 'transparent', color: '#fff', border: '1px solid #fff', borderRadius: '4px', cursor: 'pointer' }}>
              Logout
            </button>
          ) : (
            <Link to="/auth" className="btn-primary" style={{ marginLeft: '1rem', padding: '0.3rem 0.8rem' }}>
              Login
            </Link>
          )}
        </div>
      </header>
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/district/:id" element={<MapDirectory />} />
          <Route path="/story/:id" element={<Story />} />
          <Route path="/review/:id" element={<Review user={user} />} />
          <Route path="/auth" element={<Auth onLogin={handleLogin} />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
