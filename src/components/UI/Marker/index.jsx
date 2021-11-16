import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

function makeMarker(src, place) {
  const div = document.createElement('div');
  div.style.backgroundImage = src;
  div.style.width = '30px';
  div.style.height = '40px';
  div.style.backgroundSize = '100%';
  div.style.cursor = 'pointer';
  div.addEventListener('mouseover', () => {});

  return div;
}

/**
 * marker는 lng와 lat는 필수적으로 가지고 있어야한다.
 * marker는 imageSrc, place를 옵셔널로 가질 수 있다.
 */
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
      .map((marker) => {
        const newMarker = new mapboxgl.Marker(marker.imageSrc ? makeMarker(marker.imageSrc, marker.place) : undefined)
          .setLngLat([marker.lng, marker.lat])
          .addTo(map);
        newMarker.getElement().addEventListener('click', () => clickMarker(marker));
        return newMarker;
      });
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
    if (!map || !markers.length) return;

    if (storedMarkers.length < markers.length) {
      addMarkers();
    } else {
      removeMarker();
    }
  }, [markers.length, map]);

  return <></>;
}

export default Marker;
