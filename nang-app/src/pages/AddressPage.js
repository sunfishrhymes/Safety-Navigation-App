import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddressForm from '../components/AddressForm';
import { useNavigation } from '../context/NavigationContext';
import './AddressPage.css';

const modeIcon = {
  'Light Rail': '🚊',
  Walking: '🚶',
  Biking: '🚲',
  Driving: '🚗',
};

const modeColor = {
  'Light Rail': '#0085ca',
  Walking: '#24824a',
  Biking: '#00788c',
  Driving: '#aa0000',
};

export default function AddressPage() {
  const navigate = useNavigate();
  const { selectedMode, setStartAddress, setDestinationAddress } = useNavigation();

  useEffect(() => {
    if (!selectedMode) navigate('/');
  }, [selectedMode, navigate]);

  if (!selectedMode) return null;

  const handleSubmit = (start, destination) => {
    setStartAddress(start);
    setDestinationAddress(destination);
    navigate('/navigation');
  };

  return (
    <div className="address-page">
      <div className="address-container">
        <div className="mode-banner" style={{ '--mode-color': modeColor[selectedMode] }}>
          <span className="mode-banner-icon">{modeIcon[selectedMode]}</span>
          <div>
            <p className="mode-banner-label">Selected Mode</p>
            <p className="mode-banner-name">{selectedMode}</p>
          </div>
          <button
            className="mode-change-btn"
            onClick={() => navigate('/')}
            aria-label="Change travel mode"
          >
            Change
          </button>
        </div>

        <div className="address-card">
          <div className="address-card-header">
            <h2 className="address-card-title">Where are you going?</h2>
            <p className="address-card-subtitle">
              Enter your start and destination to find the safest route.
            </p>
          </div>

          <AddressForm mode={selectedMode} onSubmit={handleSubmit} />
        </div>

        <div className="safety-note">
          <span className="safety-note-icon">🛡️</span>
          <p>NANG analyzes real-time safety data and historical incident reports to suggest the safest path.</p>
        </div>
      </div>
    </div>
  );
}
