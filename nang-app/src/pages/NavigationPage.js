import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Polyline, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import RouteSummary from '../components/RouteSummary';
import DangerMarker from '../components/DangerMarker';
import { useNavigation } from '../context/NavigationContext';
import { mockRoute, mockDangerMarkers, mockAlerts } from '../data/mockData';
import './NavigationPage.css';

const modeIcon = {
  'Light Rail': '🚊',
  Walking: '🚶',
  Biking: '🚲',
  Driving: '🚗',
};

export default function NavigationPage() {
  const navigate = useNavigate();
  const { selectedMode, startAddress, destinationAddress } = useNavigation();
  const [showReroute, setShowReroute] = useState(false);
  const [panelOpen, setPanelOpen] = useState(true);

  useEffect(() => {
    if (!selectedMode || !startAddress) navigate('/');
  }, [selectedMode, startAddress, navigate]);

  if (!selectedMode || !startAddress) return null;

  const travelTime = mockRoute.travelTimes[selectedMode] || '—';
  const center = [
    (mockRoute.start[0] + mockRoute.end[0]) / 2,
    (mockRoute.start[1] + mockRoute.end[1]) / 2,
  ];

  const handleReroute = () => {
    setShowReroute(true);
    setTimeout(() => setShowReroute(false), 3000);
  };

  return (
    <div className="nav-page">
      {/* Map fills the screen */}
      <div className="map-container">
        <MapContainer
          center={center}
          zoom={14}
          style={{ width: '100%', height: '100%' }}
          zoomControl={false}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
          />

          {/* Route polyline */}
          <Polyline
            positions={mockRoute.polyline}
            pathOptions={{ color: '#0085ca', weight: 5, opacity: 0.9, dashArray: null }}
          />

          {/* Start marker */}
          <CircleMarker
            center={mockRoute.start}
            radius={10}
            pathOptions={{ fillColor: '#24824a', fillOpacity: 1, color: '#fff', weight: 2 }}
          >
            <Popup>
              <span style={{ fontWeight: 700, color: '#24824a' }}>📍 Start</span>
              <br />
              <span style={{ fontSize: '12px' }}>{startAddress}</span>
            </Popup>
          </CircleMarker>

          {/* End marker */}
          <CircleMarker
            center={mockRoute.end}
            radius={10}
            pathOptions={{ fillColor: '#ef4444', fillOpacity: 1, color: '#fff', weight: 2 }}
          >
            <Popup>
              <span style={{ fontWeight: 700, color: '#ef4444' }}>🏁 Destination</span>
              <br />
              <span style={{ fontSize: '12px' }}>{destinationAddress}</span>
            </Popup>
          </CircleMarker>

          {/* Danger markers */}
          {mockDangerMarkers.map((m) => (
            <DangerMarker
              key={m.id}
              position={m.position}
              label={m.label}
              severity={m.severity}
              description={m.description}
            />
          ))}
        </MapContainer>

        {/* Map overlay: top bar */}
        <div className="map-topbar">
          <button className="back-btn" onClick={() => navigate('/address')}>
            ← Back
          </button>
          <div className="mode-pill">
            <span>{modeIcon[selectedMode]}</span>
            <span>{selectedMode}</span>
          </div>
          <button
            className="panel-toggle"
            onClick={() => setPanelOpen((p) => !p)}
            aria-label="Toggle route panel"
          >
            {panelOpen ? '×' : '☰'}
          </button>
        </div>

        {/* Reroute toast */}
        {showReroute && (
          <div className="reroute-toast">
            ✅ Safer route calculated — 2 hazards avoided!
          </div>
        )}

        {/* Legend */}
        <div className="map-legend">
          <div className="legend-item">
            <span className="legend-dot blue" />
            <span>Route</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot red" />
            <span>High risk</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot yellow" />
            <span>Medium risk</span>
          </div>
        </div>
      </div>

      {/* Side panel */}
      <div className={`side-panel ${panelOpen ? 'open' : 'closed'}`}>
        <RouteSummary
          mode={selectedMode}
          start={startAddress}
          destination={destinationAddress}
          travelTime={travelTime}
          safetyScore={mockRoute.safetyScore}
          alerts={mockAlerts}
          onReroute={handleReroute}
        />
      </div>
    </div>
  );
}
