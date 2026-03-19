import React, { useState } from 'react';
import './AddressForm.css';

export default function AddressForm({ mode, onSubmit }) {
  const [start, setStart] = useState('');
  const [destination, setDestination] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!start.trim()) e.start = 'Starting address is required';
    if (!destination.trim()) e.destination = 'Destination address is required';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    onSubmit(start.trim(), destination.trim());
  };

  return (
    <form className="address-form" onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label className="form-label" htmlFor="start">
          <span className="label-dot start-dot" />
          Starting Address
        </label>
        <input
          id="start"
          type="text"
          className={`form-input ${errors.start ? 'error' : ''}`}
          placeholder="e.g. 100 Main St, San Francisco"
          value={start}
          onChange={(e) => { setStart(e.target.value); setErrors(prev => ({ ...prev, start: '' })); }}
        />
        {errors.start && <p className="error-msg">{errors.start}</p>}
      </div>

      <div className="form-route-line">
        <span className="route-dots">
          <span />
          <span />
          <span />
        </span>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="destination">
          <span className="label-dot end-dot" />
          Destination Address
        </label>
        <input
          id="destination"
          type="text"
          className={`form-input ${errors.destination ? 'error' : ''}`}
          placeholder="e.g. 500 Market St, San Francisco"
          value={destination}
          onChange={(e) => { setDestination(e.target.value); setErrors(prev => ({ ...prev, destination: '' })); }}
        />
        {errors.destination && <p className="error-msg">{errors.destination}</p>}
      </div>

      <button type="submit" className="btn-find-route">
        <span>🔍</span>
        Find Safe Route
      </button>
    </form>
  );
}
