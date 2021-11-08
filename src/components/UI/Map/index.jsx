import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import * as Style from './styled';

mapboxgl.accessToken = process.env.MAPBOX_KEY;
const LNG = -86.89871737888747;
const LAT = 40.41866254968954;
const ZOOM = 12;

function Map({ children, getMap }) {
  const mapRef = useRef();

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [LNG, LAT],
      zoom: ZOOM,
    });

    map.on('load', () => {
      getMap(map);
    });
  }, []);

  return (
    <Style.Container>
      <Style.MapContainer ref={mapRef}>
        <Style.SearchBox id="search-bar" />
        {children}
      </Style.MapContainer>
    </Style.Container>
  );
}

export default Map;
