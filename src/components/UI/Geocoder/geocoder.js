import Geocode from 'react-geocode';
import Marker from '../Map/Marker';

Geocode.setApiKey(process.env.GOOGLE_MAP_KEY);
Geocode.setLanguage('en');
Geocode.setRegion('us');

export default async (address, map, flyTo) => {
  const response = await Geocode.fromAddress(address);
  const { lat, lng } = response.results[0].geometry.location;

  const marker = new Marker({ lng, lat, map, address });
  marker.setDraggable(true);
  marker.on('dragend', async () => {
    const { lat: newLat, lng: newLng } = marker.getLngLat();
    const newAddress = await Geocode.fromLatLng(newLat, newLng);
    marker.address = newAddress.results[0].formatted_address;
  });

  if (flyTo) map.flyTo({ center: [lng, lat] });

  return marker;
};
