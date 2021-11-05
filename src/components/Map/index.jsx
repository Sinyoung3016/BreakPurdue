import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

mapboxgl.accessToken = process.env.MAPBOX_KEY;

const LNG = -86.89871737888747;
const LAT = 40.41866254968954;
const ZOOM = 12;
const LABELS = [
  'country-label',
  'settlement-label',
  'road-label',
  'state-label',
  'settlement-subdivision-label',
  'airport-label',
  'transit-label',
  'water-point-label',
  'water-line-label',
  'waterway-label',
  'natural-point-label',
  'natural-line-label',
];

const MapContainer = styled.div`
  position: absolute;
  bottom: 0 !important;
  left: 0 !important;
  right: 0 !important;
  top: 0 !important;
`;

function Map({ children }) {
  const mapRef = useRef();

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      locale: ['get', 'name_ko'],
      center: [LNG, LAT],
      zoom: ZOOM,
    });

    map.on('load', () => {
      LABELS.forEach((label) => {
        map.setLayoutProperty(label, 'text-field', ['get', 'name_ko']);
      });
    });
  });

  return <MapContainer ref={mapRef}>{children}</MapContainer>;
}

Map.prototype = {
  children: PropTypes.element,
};

export default Map;
