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

export const addNewRecord = async (address, cityTag, date, location, numOfVisit, place, placeTag, images) => {
  try {
    const urls = await Promise.all(
      images.map(async (i) => {
        const filename = place.concat('/', String(Date.now()));
        const newImg = ref(storage, filename);
        await uploadBytes(newImg, i);
        const url = await getDownloadURL(newImg);
        return url;
      }),
    );

    const newRecord = await addDoc(collection(firestore, RECORDS), {
      address,
      cityTag,
      date,
      location,
      numOfVisit,
      place,
      placeTag,
      urls,
    });

    console.log(place);
    return newRecord.id;
  } catch (e) {
    console.log(e);
  }
};

export const updateRecord = async ({
  recordID,
  address,
  cityTag,
  date,
  location,
  numOfVisit,
  place,
  placeTag,
  images,
}) => {
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

    await Promise.all(
      images.map(async (i) => {
        const imgId = String(Date.now());
        const newImg = ref(storage, `${recordID}/${imgId}`);
        await uploadBytes(newImg, i);
      }),
    );
  } catch (e) {
    //
  }
};

export const deleteRecord = async (recordID) => {
  try {
    const commentsSnapshot = await getDocs(collection(firestore, RECORDS, recordID, COMMENT));
    commentsSnapshot.docs.map((d) => deleteComment(recordID, String(d.id)));
    await deleteDoc(doc(firestore, RECORDS, recordID));
  } catch (e) {
    //
  }
};

// ********************************************************************************************** Image

export const getImagesAPI = async (recordID) => {
  try {
    const li = (await listAll(ref(storage, recordID))).items;
    const urls = await Promise.all(
      li.map(async (i) => {
        const url = await getDownloadURL(ref(storage, i.fullPath));
        return url;
      }),
    );
    return urls;
  } catch (error) {
    return [];
  }
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
