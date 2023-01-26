import {
  collection,
  getDocs,
} from '@firebase/firestore';
import { db } from './firestore.service';

const getAllOdd = async () => {
  const dataDic = {};
  const queryData = await getDocs(collection(db, '/ODD'));
  queryData.forEach((doc) => { dataDic[doc.id] = doc.data(); });
  return dataDic;
};

export default getAllOdd;
