import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Districts from './pages/Districts';
import MapDirectory from './pages/MapDirectory';
import Story from './pages/Story';
import Review from './pages/Review';
import Guide from './pages/Guide';
import Profile from './pages/Profile';
import Auth from './pages/Auth';
import { useLanguage } from './LanguageContext';
import { FiHome, FiMap, FiMessageSquare, FiUser, FiMenu, FiCompass } from 'react-icons/fi';
import './index.css';

function BottomNav() {
  const location = useLocation();
  const path = location.pathname;

  // Don't show bottom nav on Auth screen or Splash (if any)
  if (path === '/auth') return null;

  return (
    <nav className="bottom-nav">
      <Link to="/" className={`nav-item ${path === '/' ? 'active' : ''}`}>
        <FiHome className="nav-icon" />
        <span className="nav-label">Home</span>
      </Link>
      <Link to="/explore" className={`nav-item ${path.includes('/explore') ? 'active' : ''}`}>
        <FiMap className="nav-icon" />
        <span className="nav-label">Explore</span>
      </Link>
      <Link to="/guide" className={`nav-item ${path === '/guide' ? 'active' : ''}`}>
        <FiMessageSquare className="nav-icon" />
        <span className="nav-label">Guide</span>
      </Link>
      <Link to="/profile" className={`nav-item ${path === '/profile' ? 'active' : ''}`}>
        <FiUser className="nav-icon" />
        <span className="nav-label">Profile</span>
      </Link>
    </nav>
  );
}

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  
  if (location.pathname === '/auth') return null;

  return (
    <header className="app-header">
      <Link to="/" className="logo-container">
        <div className="logo-icon">
          <FiCompass />
        </div>
        <div className="logo-text">
          ScenTrip
          <span>BUSAN</span>
        </div>
      </Link>
      
      <div className="header-actions">
        <button className="icon-btn" onClick={() => navigate('/profile')}>
          <FiUser />
        </button>
        <button className="icon-btn">
          <FiMenu />
        </button>
      </div>
    </header>
  );
}

function AppContent({ user, handleLogin, handleLogout }) {
  return (
    <>
      <Header />
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home user={user} onLogin={handleLogin} />} />
          <Route path="/explore" element={<MapDirectory />} />
          <Route path="/story/:id" element={<Story />} />
          <Route path="/review/:id" element={<Review user={user} />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/profile" element={<Profile user={user} onLogout={handleLogout} />} />
          <Route path="/auth" element={<Auth onLogin={handleLogin} />} />
          {/* Fallback routes for older links */}
          <Route path="/districts" element={<Districts />} />
          <Route path="/district/:id" element={<MapDirectory />} />
        </Routes>
      </main>

      <BottomNav />
    </>
  );
}

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <BrowserRouter>
      <AppContent user={user} handleLogout={handleLogout} handleLogin={handleLogin} />
    </BrowserRouter>
  );
}

export default App;
