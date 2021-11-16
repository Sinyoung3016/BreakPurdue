import React, { useState, useEffect } from 'react';
import Map from '../components/UI/Map';
import Marker from '../components/UI/Marker';
import Geocoder from '../components/UI/Geocoder';
import Header from '../components/UI/Header';
import ModalModify from '../components/UI/ModalModify';

import { getRecordList, addNewRecord } from '../dataProvider';

// TODO: template도입 고려
function Main() {
  const [map, setMap] = useState(undefined);
  const [user, setUser] = useState(undefined);
  const [recordToEdit, setRecordToEdit] = useState(undefined);
  const [selectedRecord, setSelectedRecord] = useState(undefined);
  const [recordList, setRecordList] = useState([{ lng: -86.89871737888747, lat: 40.41866254968954 }]);

  useEffect(() => {
    getRecordList();
  }, []);

  const login = (enteredId) => {
    const idList = process.env.ID_LIST.split(' ');
    const nicknameList = process.env.NICKNAME_LIST.split(' ');

    const idIndex = idList.findIndex((id) => id === enteredId);
    if (idIndex < 0) return false;
    setUser(nicknameList[idIndex]);

    return true;
  };

  const clickPlaceMarker = ({ address, lng, lat }) => {
    setRecordToEdit({ address, lng, lat });
  };

  const closeModalModify = () => {
    setRecordToEdit(undefined);
  };

  const clickMarker = (marker) => {
    setSelectedRecord(marker);
  };

  const submitRecord = (info) => {
    const newRecordId = addNewRecord({
      place: info.place,
      address: info.address,
      location: [info.lng, info.lat],
      date: info.date,
      numOfVisit: info.numOfVisit,
      cityTag: 1, // info.cityTag,
      placeTag: 1, // info.placeTag,
    });
    // TODO: add to list
    setRecordToEdit(undefined);
  };

  return (
    <>
      {recordToEdit && <ModalModify record={recordToEdit} closeModal={closeModalModify} submitRecord={submitRecord} />}
      <Header user={user} login={login} />
      <Map getMap={setMap}>
        <Geocoder map={map} clickPlaceMarker={clickPlaceMarker} />
        <Marker map={map} markers={recordList} clickMarker={clickMarker} />
      </Map>
    </>
  );
}

export default Main;
