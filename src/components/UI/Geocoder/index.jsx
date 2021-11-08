import React, { useState } from 'react';
import useGoogleAutocomplete from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
import Overlay from '../../Layout/Overlay';
import addressToMarker from './geocoder';
import * as Style from './styled';

function Geocoder({ map }) {
  const [value, setValue] = useState('');
  const [searchedMarker, setSearchedMarker] = useState(undefined);
  const { placePredictions, getPlacePredictions, isPlacePredictionsLoading } = useGoogleAutocomplete({
    apiKey: process.env.GOOGLE_MAP_KEY,
    language: 'en',
    options: {
      types: ['geocode', 'establishment'],
      componentRestrictions: { country: 'us' },
    },
  });

  const clickPlacePrediction = async (place) => {
    setValue(place.description);
    getPlacePredictions({ input: '' });
    const marker = await addressToMarker(place.description, map);
    if (searchedMarker) searchedMarker.remove();
    setSearchedMarker(marker);
  };

  const clickOverlay = () => {
    getPlacePredictions({ input: '' });
  };

  return (
    <Overlay clickOverlay={clickOverlay} active={placePredictions.length}>
      <Style.Container>
        <Style.Input
          style={{ color: 'black' }}
          value={value}
          placeholder="검색 후 핀을 누르세요"
          onChange={(evt) => {
            getPlacePredictions({ input: evt.target.value });
            setValue(evt.target.value);
          }}
        />
        {!isPlacePredictionsLoading && !!placePredictions.length && (
          <Style.List>
            {placePredictions.map((place) => (
              <Style.Item
                key={place.description}
                onClick={() => {
                  clickPlacePrediction(place);
                }}
              >
                <h4>{place.description}</h4>
              </Style.Item>
            ))}
          </Style.List>
        )}
      </Style.Container>
    </Overlay>
  );
}

export default Geocoder;
