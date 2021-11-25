import { collection, doc, getDocs, addDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { uploadBytes, ref, getDownloadURL, listAll } from 'firebase/storage';
import { cityNum2Tag, placeNum2Tag, placeNum2TagSrc } from '../converter/tag';
import { firestore, storage } from '../firebaseInit';

const RECORDS = 'records';
const COMMENT = 'comment';

// ********************************************************************************************** Record
/**
 * >> Record 구조<<
 *
 * string address
 * number cityTag
 * string date
 * geopoint location : [ 위도 , 경도 ]
 * number numOfVisit
 * string place : 제목
 * number placeTag
 * list images
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
        tagSrc: placeNum2TagSrc(d.data().placeTag),
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

    await Promise.all(
      imgs.map(async (i) => {
        const imgId = String(Date.now());
        const newImg = ref(storage, `${newRecord.id}/${imgId}`);
        await uploadBytes(newImg, i).then(function () {
          console.log('Uploaded a Img!');
        });
      }),
    );

    return newRecord.id;
  } catch (e) {
    console.log('addNewRecord :', e);
    return '';
  }
};

export const updateRecord = async ({ recordID, address, cityTag, date, location, numOfVisit, place, placeTag }) => {
  try {
    await updateDoc(doc(firestore, RECORDS, recordID), {
      address,
      cityTag,
      date,
      location,
      numOfVisit,
      place,
      placeTag,
    });
    return recordID;
  } catch (e) {
    console.log('updateRecord :', e);
    return '';
  }
};

export const deleteRecord = async (recordID) => {
  try {
    const commentsSnapshot = await getDocs(collection(firestore, RECORDS, recordID, COMMENT));
    commentsSnapshot.docs.map((d) => deleteComment(recordID, String(d.id)));
    await deleteDoc(doc(firestore, RECORDS, recordID));
  } catch (e) {
    console.log('deleteRecord : ', e);
  }
};

// ********************************************************************************************** Image

export const getAllImage = async (recordID) => {
  const li = (await listAll(ref(storage, recordID))).items;
  const urls = await Promise.all(
    li.map(async (i) => {
      const url = await getDownloadURL(ref(storage, i.fullPath));
      return url;
    }),
  );
  return urls;
};

// ********************************************************************************************** Comment

export const addComment = async ({ recordID, auther, desc }) => {
  try {
    const newComment = await addDoc(collection(firestore, RECORDS, recordID, COMMENT), {
      auther,
      desc,
    });
    return newComment.id;
  } catch (e) {
    return '';
  }
};

// return  list ({string auther, string desc, string id})
export const getComment = async (recordID) => {
  try {
    const commentSnapshot = await getDocs(collection(firestore, RECORDS, recordID, COMMENT));
    const commentList = commentSnapshot.docs.map((d) => ({ ...d.data(), id: d.id }));
    return commentList;
  } catch (e) {
    return [];
  }
};

export const deleteComment = async (recordID, commentID) => {
  try {
    await deleteDoc(doc(firestore, RECORDS, recordID, COMMENT, commentID));
  } catch (e) {
    //
  }
};
