import { collection, doc, getDocs, addDoc, deleteDoc } from 'firebase/firestore';
import { cityNum2Tag, placeNum2Tag, placeNum2ImgSrc } from '../converter/tag';
import { firestore } from '../firebaseInit';

const RECORDS = 'records';
const COMMENT = 'comment';

/**
 * Record 구조
 * number cityTag
 * string date
 * string address
 * geopoint location : [ 위도 , 경도 ]
 * number numOfVisit
 * string place : 제목
 * number placeTag
 * ???? images
 * */

export const getRecordList = async () => {
  try {
    const recordsSnapshot = await getDocs(collection(firestore, RECORDS));
    const recordList = recordsSnapshot.docs
      .filter((d) => typeof d.data().location === 'object')
      .map((d) => ({
        ...d.data(),
        id: d.id,
        lng: d.data().location[0],
        lat: d.data().location[1],
        cityTag: cityNum2Tag(d.data().cityTag),
        placeTag: placeNum2Tag(d.data().placeTag),
        imageSrc: placeNum2ImgSrc(d.data().placeTag),
        images: [],
      }));
    return recordList;
  } catch (e) {
    return [];
  }
};

export const addNewRecord = async ({ address, cityTag, date, location, numOfVisit, place, placeTag, imgs }) => {
  try {
    const newRecord = await addDoc(collection(firestore, RECORDS), {
      address,
      cityTag,
      date,
      location,
      numOfVisit,
      place,
      placeTag,
    });
    imgs.map((i) => {
      const imgId = String(Date.now());
      const newImg = ref(storage, `${newRecord.id}/${imgId}`);
      uploadBytes(newImg, i).then(function () {
        console.log('Uploaded a Img!');
      });
    });
    return newRecord.id;
  } catch (e) {
    console.log('addNewRecord :', e);
  }
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
