import React from 'react';
import './ModeCard.css';

const modeConfig = {
  'Light Rail': { icon: '🚊', color: '#0085ca', desc: 'Safe and efficient city transit' },
  Walking:      { icon: '🚶', color: '#24824a', desc: 'Canopy-friendly, street-level travel' },
  Biking:       { icon: '🚲', color: '#00788c', desc: 'Fast, flexible, and low impact' },
  Driving:      { icon: '🚗', color: '#aa0000', desc: 'Direct routes with smart safety checks' },
};

export default function ModeCard({ mode, selected, onSelect }) {
  const { icon, color, desc } = modeConfig[mode];

  return (
    <button
      className={`mode-card ${selected ? 'selected' : ''}`}
      style={{ '--accent': color }}
      onClick={() => onSelect(mode)}
      aria-pressed={selected}
    >
      <div className="mode-card-icon">{icon}</div>
      <div className="mode-card-name">{mode}</div>
      <div className="mode-card-desc">{desc}</div>
      {selected && <div className="mode-card-check">✓</div>}
    </button>
  );
}
