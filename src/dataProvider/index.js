import { collection, doc, getDocs, addDoc, deleteDoc } from 'firebase/firestore';
import { firestore } from '../firebaseInit';

const RECORDS = 'records';
const COMMENT = 'comment';

/**
 * Record 구조
 * number cityTag
 * string date
 * geopoint location : [ 위도 , 경도 ]
 * number numOfVisit
 * string place : 제목
 * number placeTag
 * */

export const getRecordList = async () => {
  const recordsSnapshot = await getDocs(collection(firestore, RECORDS));
  try {
    const recordList = recordsSnapshot.docs.map((d) => ({ ...d.data(), id: d.id }));
    return recordList;
  } catch (e) {
    return [];
  }
};

export const addNewRecord = async ({ cityTag, date, location, numOfVisit, place, placeTag }) => {
  const newRecord = await addDoc(collection(firestore, RECORDS), {
    cityTag,
    date,
    location,
    numOfVisit,
    place,
    placeTag,
  });
  return newRecord.id;
};

export const deleteRecord = async (recordID) => {
  await deleteDoc(doc(firestore, RECORDS, recordID));
};

export const getComment = async (recordID) => {
  try {
    const commentSnapshot = await getDocs(collection(firestore, RECORDS, recordID, COMMENT));
    const CommentList = commentSnapshot.docs.map((d) => d.data());
    return CommentList;
  } catch (e) {
    return [];
  }
};
