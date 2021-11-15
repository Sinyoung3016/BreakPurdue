import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

function Marker({ map, markers, clickMarker }) {
  const [storedMarkers, setStoredMarkers] = useState([]);

  const addMarkers = () => {
    const newMarkers = markers
      .filter((marker) => {
        const exist = storedMarkers.find((storedMarker) => {
          const { lng, lat } = storedMarker.getLngLat();
          return lng === marker.lng && lat === marker.lat;
        });
        return !exist;
      })
      .map((marker) =>
        new mapboxgl.Marker()
          .setLngLat([marker.lng, marker.lat])
          .addTo(map)
          .getElement()
          .addEventListener('click', clickMarker),
      );
    setStoredMarkers([...storedMarkers, ...newMarkers]);
  };

  const removeMarker = () => {
    const removedMarker = storedMarkers.filter((storedMarker) => {
      const exist = markers.find((marker) => {
        const { lng, lat } = storedMarker.getLngLat();
        return lng === marker.lng && lat === marker.lat;
      });
      return !exist;
    })[0];
    removedMarker.remove();
  };

  useEffect(() => {
    if (!map) return;

    if (storedMarkers.length < markers.length) {
      addMarkers();
    } else {
      removeMarker();
    }
  }, [markers.length, map]);

  return <></>;
}

export default Marker;
