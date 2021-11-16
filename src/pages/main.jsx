import React, { useState, useEffect } from 'react';
import Map from '../components/UI/Map';
import Marker from '../components/UI/Marker';
import Geocoder from '../components/UI/Geocoder';
import Header from '../components/UI/Header';
import ModalModify from '../components/UI/ModalModify';
import ModalRecord from '../components/UI/ModalRecord';

import { getRecordList, addNewRecord } from '../dataProvider';
import { placeTag2Num, cityTag2Num, placeTag2ImgSrc } from '../converter/tag';

// TODO: template도입 고려
function Main() {
  const [map, setMap] = useState(undefined);
  const [user, setUser] = useState(undefined);
  const [recordToEdit, setRecordToEdit] = useState(undefined);
  const [selectedRecord, setSelectedRecord] = useState(undefined);
  const [recordList, setRecordList] = useState([]);

  useEffect(() => {
    getRecordListFromFirebase();
  }, []);

  const getRecordListFromFirebase = async () => {
    const list = await getRecordList();
    setRecordList(list);
  };

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

  const closeModalRecord = () => {
    setSelectedRecord(undefined);
  };

  const clickMarker = (marker) => {
    setSelectedRecord(marker);
  };

  const submitRecord = async (info) => {
    // FIXME: info의 id값 유무로 생성/수정 판단해야함
    const newRecordId = await addNewRecord({
      place: info.place,
      address: info.address,
      images: info.images,
      location: [info.lng, info.lat],
      date: info.date,
      numOfVisit: info.numOfVisit,
      cityTag: cityTag2Num(info.cityTag),
      placeTag: placeTag2Num(info.placeTag),
      imageSrc: placeTag2ImgSrc(info.placeTag),
    });
    setRecordList([...recordList, { ...info, id: newRecordId, imageSrc: placeTag2ImgSrc(info.placeTag) }]);
    setRecordToEdit(undefined);
  };

  return (
    <>
      {selectedRecord && <ModalRecord record={selectedRecord} closeModal={closeModalRecord} />}
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
