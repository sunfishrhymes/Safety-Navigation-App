import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigation } from '../context/NavigationContext';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();
  const { selectedMode } = useNavigation();

  const modeIcon = {
    'Light Rail': '🚊',
    Walking: '🚶',
    Biking: '🚲',
    Driving: '🚗',
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <span className="navbar-logo">🛡️</span>
        <span className="navbar-title">NANG</span>
        <span className="navbar-subtitle">Safe Navigation</span>
      </Link>

      {selectedMode && location.pathname !== '/' && (
        <div className="navbar-mode">
          <span className="mode-icon">{modeIcon[selectedMode]}</span>
          <span className="mode-label">{selectedMode}</span>
        </div>
      )}

      <div className="navbar-steps">
        <span className={`step ${location.pathname === '/' ? 'active' : location.pathname !== '/' ? 'done' : ''}`}>1</span>
        <span className="step-line" />
        <span className={`step ${location.pathname === '/address' ? 'active' : location.pathname === '/navigation' ? 'done' : ''}`}>2</span>
        <span className="step-line" />
        <span className={`step ${location.pathname === '/navigation' ? 'active' : ''}`}>3</span>
      </div>
    </nav>
  );
}
