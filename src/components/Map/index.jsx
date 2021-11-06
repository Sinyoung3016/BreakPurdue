import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

mapboxgl.accessToken = process.env.MAPBOX_KEY;

const LNG = -86.89871737888747;
const LAT = 40.41866254968954;
const ZOOM = 12;

const MapContainer = styled.div`
  position: absolute;
  bottom: 0 !important;
  left: 0 !important;
  right: 0 !important;
  top: 0 !important;

  .mapboxgl-ctrl-logo,
  .mapboxgl-ctrl-attrib {
    display: none !important;
  }
`;

const SearchBox = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  border-radius: 20px;

  input[type='text'] {
    height: 40px;
    outline: none;
  }
  svg {
    top: 9px;
  }
`;

function Map({ children }) {
  const mapRef = useRef();

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [LNG, LAT],
      zoom: ZOOM,
    });

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      placeholder: '검색 후 핀을 누르세요',
      mapboxgl,
    });

    map.on('load', () => {
      document.getElementById('search-bar').appendChild(geocoder.onAdd(map));
    });
  }, []);

  return (
    <MapContainer ref={mapRef}>
      <SearchBox id="search-bar" />
      {children}
    </MapContainer>
  );
}

Map.prototype = {
  children: PropTypes.element,
};

export default Map;
