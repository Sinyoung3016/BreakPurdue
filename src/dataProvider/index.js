import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebaseInit';

const RECORDS = 'records';

export const getRecords = async () => {
  const recordsSnapshot = await getDocs(collection(firestore, RECORDS));
  const recordList = recordsSnapshot.docs.map((doc) => doc.data());
  console.log('recordList', recordList);
  return recordList;
};
