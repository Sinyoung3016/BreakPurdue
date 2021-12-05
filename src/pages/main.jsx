import React, { useState, useEffect } from 'react';
import Map from '../components/UI/Map';
import Marker from '../components/UI/Map/Marker';
import Geocoder from '../components/UI/Geocoder';
import Header from '../components/UI/Header';
import ModalModify from '../components/UI/ModalModify';
import ModalRecord from '../components/UI/ModalRecord';

import {
  getRecordList,
  addNewRecord,
  updateRecord,
  deleteRecord,
  addComment,
  getComment,
  deleteComment,
  getImagesAPI,
} from '../dataProvider';
import { placeTag2Num, cityTag2Num, placeTag2TagSrc } from '../converter/tag';

function Main() {
  const [map, setMap] = useState(undefined);
  const [user, setUser] = useState(undefined);
  const [markerToEdit, setMarkerToEdit] = useState(undefined);
  const [selectedMarker, setSelectedMarker] = useState(undefined);
  const [markerList, setMarkerList] = useState([]);
  const [commentList, setCommentList] = useState([]);
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    if (map) {
      getRecordListFromFirebase();
    }
  }, [map]);

  useEffect(() => {
    if (selectedMarker) {
      getImages();
      getComments();
    }
  }, [selectedMarker]);

  const clickMarker = (marker) => {
    setSelectedMarker(marker);
  };

  const getRecordListFromFirebase = async () => {
    const list = await getRecordList();
    const markers = list.map((item) => {
      return new Marker({ ...item, map, clickMarker });
    });
    setMarkerList(markers);
  };

  const login = (enteredId) => {
    const idList = process.env.ID_LIST.split(' ');
    const nicknameList = process.env.NICKNAME_LIST.split(' ');

    const idIndex = idList.findIndex((id) => id === enteredId);
    if (idIndex < 0) return false;
    setUser(nicknameList[idIndex]);

    return true;
  };

  const isExistMarker = ({ lng, lat }) => {
    const isMarker = markerList
      .map((marker) => marker.getLngLat())
      .find((marker) => marker.lng === lng && marker.lat === lat);
    return isMarker;
  };

  const clickPlaceMarker = ({ address, lng, lat }) => {
    if (isExistMarker({ lng, lat })) return;
    setMarkerToEdit({ address, lng, lat });
  };

  const closeModalModify = () => {
    setMarkerToEdit(undefined);
  };

  const closeModalRecord = () => {
    setSelectedMarker(undefined);
  };

  const clickModifyButton = (marker) => {
    setSelectedMarker(undefined);
    setMarkerToEdit(marker);
  };

  const createNewRecord = async (info) => {
    const images = info.newImages.map((image) => image.file);
    const newMarkerId = await addNewRecord({
      images,
      place: info.place,
      address: info.address,
      location: [info.lng, info.lat],
      date: info.date,
      numOfVisit: info.numOfVisit,
      cityTag: cityTag2Num(info.cityTag),
      placeTag: placeTag2Num(info.placeTag),
    });

    const newMarker = new Marker({
      ...info,
      id: newMarkerId,
      tagSrc: placeTag2TagSrc(info.placeTag),
      clickMarker,
      map,
    });
    setMarkerList([...markerList, newMarker]);
    setMarkerToEdit(undefined);
  };

  const modifyRecord = async (info) => {
    const images = info.newImages.map((image) => image.file);
    await updateRecord({
      images,
      recordID: info.id,
      place: info.place,
      address: info.address,
      location: [info.lng, info.lat],
      numOfVisit: info.numOfVisit,
      date: info.date,
      cityTag: cityTag2Num(info.cityTag),
      placeTag: placeTag2Num(info.placeTag),
    });
    const updatedMarkerList = markerList.map((marker) => {
      if (marker.id === info.id) marker.updateMarker({ ...info, tagSrc: placeTag2TagSrc(info.placeTag) });
      return marker;
    });
    setMarkerList([...updatedMarkerList]);
    setMarkerToEdit(undefined);
  };

  const submitRecord = async (info) => {
    if (!info.id) createNewRecord(info);
    else modifyRecord(info);
  };

  const deleteMarker = async (id) => {
    await deleteRecord(id);
    const filteredRecords = markerList.filter((marker) => {
      if (marker.id === id) marker.removeMarker();
      return marker.id !== id;
    });
    setMarkerList(filteredRecords);
    setMarkerToEdit(undefined);
  };

  // comment
  const createComment = async (desc) => {
    const commentId = await addComment({ desc, recordID: selectedMarker.id, auther: user });
    setCommentList([...commentList, { desc, auther: user, id: commentId }]);
  };

  const getComments = async () => {
    const comments = await getComment(selectedMarker.id);
    setCommentList(comments);
  };

  const deleteCommentFromList = async (commentId) => {
    const filteredComment = commentList.filter((comment) => comment.id !== commentId);
    await deleteComment(selectedMarker.id, commentId);
    setCommentList(filteredComment);
  };

  // image
  const getImages = async () => {
    const imagesUrls = await getImagesAPI(selectedMarker.id);
    setImageList(imagesUrls);
  };

  return (
    <>
      {selectedMarker && (
        <ModalRecord
          user={user}
          record={selectedMarker}
          comments={commentList}
          images={imageList}
          closeModal={closeModalRecord}
          clickModifyButton={clickModifyButton}
          createComment={createComment}
          deleteComment={deleteCommentFromList}
        />
      )}
      {markerToEdit && (
        <ModalModify
          record={markerToEdit}
          images={imageList}
          closeModal={closeModalModify}
          submitRecord={submitRecord}
          deleteMarker={deleteMarker}
        />
      )}
      <Header user={user} login={login} />
      <Map getMap={setMap}>
        {user && !markerToEdit && !selectedMarker && <Geocoder map={map} clickPlaceMarker={clickPlaceMarker} />}
      </Map>
    </>
  );
}

export default Main;
