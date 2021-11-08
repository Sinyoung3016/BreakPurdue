import mapboxgl from 'mapbox-gl';
import Geocode from 'react-geocode';

Geocode.setApiKey(process.env.GOOGLE_MAP_KEY);
Geocode.setLanguage('en');
Geocode.setRegion('us');

export default async (address, map) => {
  const response = await Geocode.fromAddress(address);
  const { lat, lng } = response.results[0].geometry.location;
  const marker = new mapboxgl.Marker().setLngLat({ lng, lat }).addTo(map);

  map.flyTo({ center: [lng, lat] });
  marker.getElement().addEventListener('click', () => {
    marker.remove();
  });

  return marker;
};
