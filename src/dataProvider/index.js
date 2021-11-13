import { collection, doc, getDocs, addDoc, deleteDoc } from 'firebase/firestore';
import { firestore } from '../firebaseInit';

const RECORDS = 'records';
const COMMENT = 'comment';

/**
 * Record 구조
 * number cityTag
 * string date
 * geopoint location
 * number numOfVisit
 * string place : 제목
 * number placeTag
 **/

export const getRecordList = async () => {
  const recordsSnapshot = await getDocs(collection(firestore, RECORDS));
  try {
    const recordList = recordsSnapshot.docs.map((d) => d.data());
    console.log('recordList', recordList[0]);
    return recordList;
  } catch (e) {
    console.log('Error from getRecordList', e);
  }
};
};
