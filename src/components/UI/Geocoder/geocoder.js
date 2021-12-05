import mapboxgl from 'mapbox-gl';
import Geocode from 'react-geocode';

Geocode.setApiKey(process.env.GOOGLE_MAP_KEY);
Geocode.setLanguage('en');
Geocode.setRegion('us');

export default async (address, map, flyTo) => {
  const response = await Geocode.fromAddress(address);
  const { lat, lng } = response.results[0].geometry.location;
  const marker = new mapboxgl.Marker({ color: 'red' }).setLngLat({ lng, lat });
  marker.setDraggable(true);
  if (flyTo) {
    map.flyTo({ center: [lng, lat] });
  }

  return marker;
};
