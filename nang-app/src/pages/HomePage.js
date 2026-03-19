import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModeCard from '../components/ModeCard';
import { useNavigation } from '../context/NavigationContext';
import './HomePage.css';

const MODES = ['Light Rail', 'Walking', 'Biking', 'Driving'];

export default function HomePage() {
  const navigate = useNavigate();
  const { selectedMode, setSelectedMode } = useNavigation();
  const [localMode, setLocalMode] = useState(selectedMode);

  const handleSelect = (mode) => {
    setLocalMode(mode);
  };

  const handleContinue = () => {
    if (!localMode) return;
    setSelectedMode(localMode);
    navigate('/address');
  };

  return (
    <div className="home-page">
      <div className="home-hero">
        <div className="hero-badge">🛡️ Safety-First Navigation</div>
        <h1 className="hero-title">Choose Your<br /><span>Travel Mode</span></h1>
        <p className="hero-subtitle">
          NANG analyzes road safety data to guide you on the safest route possible.
        </p>
      </div>

      <div className="modes-grid">
        {MODES.map((mode) => (
          <ModeCard
            key={mode}
            mode={mode}
            selected={localMode === mode}
            onSelect={handleSelect}
          />
        ))}
      </div>

      <div className="home-footer">
        <button
          className={`btn-continue ${localMode ? 'ready' : ''}`}
          onClick={handleContinue}
          disabled={!localMode}
        >
          {localMode ? `Continue with ${localMode} →` : 'Select a travel mode'}
        </button>
      </div>
    </div>
  );
}
