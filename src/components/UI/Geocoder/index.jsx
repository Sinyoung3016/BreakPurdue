import React, { useState } from 'react';
import useGoogleAutocomplete from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
import Overlay from '../../Layout/Overlay';
import SearchIcon from '../Icon/Search';
import addressToMarker from './geocoder';
import * as Style from './styled';

function Geocoder({ map }) {
  const [value, setValue] = useState('');
  const [searchedMarkers, setSearchedMarkers] = useState([]);
  const { placePredictions, getPlacePredictions, isPlacePredictionsLoading } = useGoogleAutocomplete({
    apiKey: process.env.GOOGLE_MAP_KEY,
    language: 'en',
    options: {
      types: ['geocode', 'establishment'],
      componentRestrictions: { country: 'us' },
    },
  });

  const resetSearchedMarkers = (markers) => {
    markers.forEach((marker) => {
      marker.remove();
    });
    setSearchedMarkers([]);
  };

  const drawMarkerToMap = (markers) => {
    resetSearchedMarkers(searchedMarkers);
    markers.forEach((marker) => {
      marker.addTo(map);
      marker.getElement().addEventListener('click', () => {
        resetSearchedMarkers(markers);
      });
    });
    setSearchedMarkers(markers);
  };

  const clickPlacePrediction = async (place) => {
    setValue(place.description);
    const marker = await addressToMarker(place.description, map, true);
    getPlacePredictions({ input: '' });
    drawMarkerToMap([marker]);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    const markers = await Promise.all(
      placePredictions.map((place) => {
        const marker = addressToMarker(place.description, map, false);
        return marker;
      }),
    );
    drawMarkerToMap(markers);
    getPlacePredictions({ input: '' });
  };

  const clickOverlay = () => {
    getPlacePredictions({ input: '' });
  };

  return (
    <Overlay clickOverlay={clickOverlay} active={placePredictions.length}>
      <Style.Container onSubmit={handleSearch}>
        <Style.Input
          style={{ color: 'black' }}
          value={value}
          placeholder="검색 후 핀을 누르세요"
          onChange={(evt) => {
            getPlacePredictions({ input: evt.target.value });
            setValue(evt.target.value);
          }}
        />
        <Style.IconWrapper onClick={handleSearch}>
          <SearchIcon />
        </Style.IconWrapper>
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
