import React from 'react';
import './RouteSummary.css';

export default function RouteSummary({ mode, start, destination, travelTime, safetyScore, alerts, onReroute }) {
  const scoreColor =
    safetyScore >= 8 ? '#24824a' :
    safetyScore >= 6 ? '#f59e0b' : '#ef4444';

  const alertIcon = { danger: '🔴', warning: '🟡', info: '🔵' };

  return (
    <div className="route-summary">
      <div className="summary-header">
        <h2 className="summary-title">Route Summary</h2>
        <div className="safety-score" style={{ '--score-color': scoreColor }}>
          <span className="score-value">{safetyScore}</span>
          <span className="score-denom">/10</span>
          <span className="score-label">Safety</span>
        </div>
      </div>

      <div className="summary-addresses">
        <div className="addr-row">
          <span className="addr-dot green" />
          <div>
            <p className="addr-type">From</p>
            <p className="addr-text">{start}</p>
          </div>
        </div>
        <div className="addr-line" />
        <div className="addr-row">
          <span className="addr-dot red" />
          <div>
            <p className="addr-type">To</p>
            <p className="addr-text">{destination}</p>
          </div>
        </div>
      </div>

      <div className="summary-stats">
        <div className="stat">
          <span className="stat-icon">⏱️</span>
          <span className="stat-value">{travelTime}</span>
          <span className="stat-label">Est. Time</span>
        </div>
        <div className="stat-divider" />
        <div className="stat">
          <span className="stat-icon">🚦</span>
          <span className="stat-value">{mode}</span>
          <span className="stat-label">Mode</span>
        </div>
        <div className="stat-divider" />
        <div className="stat">
          <span className="stat-icon">⚠️</span>
          <span className="stat-value">{alerts.length}</span>
          <span className="stat-label">Alerts</span>
        </div>
      </div>

      {alerts.length > 0 && (
        <div className="alerts-section">
          <h3 className="alerts-title">Safety Alerts</h3>
          <ul className="alerts-list">
            {alerts.map((alert) => (
              <li key={alert.id} className={`alert-item ${alert.type}`}>
                <span className="alert-icon">{alertIcon[alert.type]}</span>
                <span className="alert-msg">{alert.message}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button className="btn-reroute" onClick={onReroute}>
        <span>🔄</span>
        Reroute Safely
      </button>
    </div>
  );
}
