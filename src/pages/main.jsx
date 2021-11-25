import React, { useState, useEffect } from 'react';
import Map from '../components/UI/Map';
import Marker from '../components/UI/Marker';
import Geocoder from '../components/UI/Geocoder';
import Header from '../components/UI/Header';
import ModalModify from '../components/UI/ModalModify';
import ModalRecord from '../components/UI/ModalRecord';

import { getRecordList, addNewRecord, deleteRecord, addComment, getComment, deleteComment } from '../dataProvider';
import { placeTag2Num, cityTag2Num, placeTag2TagSrc } from '../converter/tag';

// TODO: template도입 고려
function Main() {
  const [map, setMap] = useState(undefined);
  const [user, setUser] = useState(undefined);
  const [recordToEdit, setRecordToEdit] = useState(undefined);
  const [selectedRecord, setSelectedRecord] = useState(undefined);
  const [recordList, setRecordList] = useState([]);
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    getRecordListFromFirebase();
  }, []);

  useEffect(() => {
    if (selectedRecord) {
      getComments();
    }
  }, [selectedRecord]);

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

  const isExistMarker = ({ lng, lat }) => {
    const marker = recordList.find((record) => record.lng === lng && record.lat === lat);
    return marker;
  };

  const clickPlaceMarker = ({ address, lng, lat }) => {
    if (isExistMarker({ lng, lat })) return;
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

  const clickModifyButton = (record) => {
    setSelectedRecord(undefined);
    setRecordToEdit(record);
  };

  const createNewRecord = async (info) => {
    const newRecordId = await addNewRecord({
      place: info.place,
      address: info.address,
      images: info.images,
      location: [info.lng, info.lat],
      date: info.date,
      numOfVisit: info.numOfVisit,
      cityTag: cityTag2Num(info.cityTag),
      placeTag: placeTag2Num(info.placeTag),
    });
    setRecordList([...recordList, { ...info, id: newRecordId, tagSrc: placeTag2TagSrc(info.placeTag) }]);
    setRecordToEdit(undefined);
  };

  const submitRecord = async (info) => {
    // FIXME: info의 id값 유무로 생성/수정 판단해야함
    if (!info.id) {
      createNewRecord(info);
    }
  };

  const deleteMarker = async (id) => {
    await deleteRecord(id);
    const filteredRecords = recordList.filter((record) => record.id !== id);
    setRecordList(filteredRecords);
    setRecordToEdit(undefined);
  };

  // comment
  const createComment = async (desc) => {
    const commentId = await addComment({ desc, recordID: selectedRecord.id, auther: user });
    setCommentList([...commentList, { desc, auther: user, id: commentId }]);
  };

  const getComments = async () => {
    const comments = await getComment(selectedRecord.id);
    setCommentList(comments);
  };

  const deleteCommentFromList = async (commentId) => {
    const filteredComment = commentList.filter((comment) => comment.id !== commentId);
    await deleteComment(selectedRecord.id, commentId);
    setCommentList(filteredComment);
  };

  return (
    <>
      {selectedRecord && (
        <ModalRecord
          user={user}
          record={selectedRecord}
          comments={commentList}
          closeModal={closeModalRecord}
          clickModifyButton={clickModifyButton}
          createComment={createComment}
          deleteComment={deleteCommentFromList}
        />
      )}
      {recordToEdit && (
        <ModalModify
          record={recordToEdit}
          closeModal={closeModalModify}
          submitRecord={submitRecord}
          deleteMarker={deleteMarker}
        />
      )}
      <Header user={user} login={login} />
      <Map getMap={setMap}>
        <Geocoder map={map} clickPlaceMarker={clickPlaceMarker} />
        <Marker map={map} markers={recordList} clickMarker={clickMarker} />
      </Map>
    </>
  );
}

export default Main;
