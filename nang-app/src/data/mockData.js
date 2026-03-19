// Mock route coordinates (San Francisco area)
export const mockRoute = {
  start: [37.7749, -122.4194],
  end: [37.7949, -122.3994],
  polyline: [
    [37.7749, -122.4194],
    [37.7779, -122.4164],
    [37.7809, -122.4134],
    [37.7839, -122.4104],
    [37.7869, -122.4074],
    [37.7899, -122.4044],
    [37.7929, -122.4014],
    [37.7949, -122.3994],
  ],
  travelTimes: {
    'Light Rail': '14 min',
    Walking: '38 min',
    Biking: '22 min',
    Driving: '9 min',
  },
  safetyScore: 7.8,
};

export const mockDangerMarkers = [
  {
    id: 1,
    position: [37.7789, -122.4134],
    label: 'High crash intersection',
    severity: 'high',
    description: 'This intersection has reported 12 incidents in the last year.',
  },
  {
    id: 2,
    position: [37.7829, -122.4094],
    label: 'Low lighting area',
    severity: 'medium',
    description: 'Streetlights outage reported. Reduced visibility at night.',
  },
  {
    id: 3,
    position: [37.7869, -122.4054],
    label: 'Late-night risk zone',
    severity: 'medium',
    description: 'Elevated incident reports between 10 PM and 2 AM.',
  },
  {
    id: 4,
    position: [37.7919, -122.4014],
    label: 'Pedestrian crash hotspot',
    severity: 'high',
    description: 'Multiple pedestrian injuries reported at this crossing.',
  },
];

export const mockAlerts = [
  {
    id: 1,
    type: 'danger',
    message: 'Caution: pedestrian crash hotspot ahead',
  },
  {
    id: 2,
    type: 'warning',
    message: 'Warning: poorly lit segment near destination',
  },
];
