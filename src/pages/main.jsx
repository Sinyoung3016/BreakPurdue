import React, { useState } from 'react';
import Map from '../components/UI/Map';
import Marker from '../components/UI/Marker';
import Header from '../components/UI/Header';

// TODO: remove
const dummy = [{ lng: -86.89871737888747, lat: 40.41866254968954 }];

function Main() {
  const [map, setMap] = useState();

  return (
    <>
      <Header />
      <Map getMap={setMap}>
        <Marker map={map} markers={dummy} />
      </Map>
    </>
  );
}

export default Main;
