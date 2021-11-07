import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import * as Style from './styled';

mapboxgl.accessToken = process.env.MAPBOX_KEY;
const LNG = -86.89871737888747;
const LAT = 40.41866254968954;
const ZOOM = 12;

function Map({ children, getMap, clickSearchedMarker }) {
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
      marker: false,
      mapboxgl,
    });

    geocoder.on('result', (event) => {
      new mapboxgl.Marker()
        .setLngLat(event.result.center)
        .addTo(map)
        .getElement()
        .addEventListener('click', () => {});
    });

    map.on('load', () => {
      document.getElementById('search-bar').appendChild(geocoder.onAdd(map));
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
