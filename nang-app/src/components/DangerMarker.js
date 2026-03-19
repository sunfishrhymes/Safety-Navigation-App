import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const severityConfig = {
  high:   { bg: '#ef4444', border: '#dc2626', glow: 'rgba(239,68,68,0.5)' },
  medium: { bg: '#f59e0b', border: '#d97706', glow: 'rgba(245,158,11,0.5)' },
  low:    { bg: '#0085ca', border: '#0073af', glow: 'rgba(0,133,202,0.5)' },
};

function createDangerIcon(severity) {
  const { bg, border, glow } = severityConfig[severity] || severityConfig.medium;
  const html = `
    <div style="
      position: relative;
      width: 32px;
      height: 32px;
    ">
      <div style="
        position: absolute;
        top: 50%; left: 50%;
        transform: translate(-50%, -50%);
        width: 32px; height: 32px;
        border-radius: 50%;
        background: ${glow};
        animation: pulse 1.8s ease-in-out infinite;
      "></div>
      <div style="
        position: absolute;
        top: 50%; left: 50%;
        transform: translate(-50%, -50%);
        width: 24px; height: 24px;
        border-radius: 50%;
        background: ${bg};
        border: 2px solid ${border};
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        font-weight: 800;
        color: #fff;
        box-shadow: 0 2px 8px rgba(0,0,0,0.4);
      ">!</div>
    </div>
  `;

  return L.divIcon({
    className: 'danger-marker-icon',
    html,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -18],
  });
}

export default function DangerMarker({ position, label, severity, description }) {
  const icon = createDangerIcon(severity);

  return (
    <Marker position={position} icon={icon}>
      <Popup className="danger-popup">
        <div style={{
          background: '#1f2823',
          borderRadius: '10px',
          padding: '12px 14px',
          minWidth: '180px',
          color: '#f7faf8',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '6px',
          }}>
            <span style={{
              width: '8px', height: '8px',
              borderRadius: '50%',
              background: severityConfig[severity]?.bg || '#f59e0b',
              flexShrink: 0,
            }} />
            <strong style={{ fontSize: '13px', fontWeight: 700 }}>{label}</strong>
          </div>
          {description && (
            <p style={{
              fontSize: '12px',
              color: '#9eb2a6',
              margin: 0,
              lineHeight: 1.4,
            }}>
              {description}
            </p>
          )}
        </div>
      </Popup>
    </Marker>
  );
}
