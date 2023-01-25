import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from '@firebase/firestore';
import { db } from './firestore.service';

const getAllPOI = async () => {
  const dataDic = {};
  const queryData = await getDocs(collection(db, '/POI'));
  queryData.forEach((doc) => { dataDic[doc.id] = doc.data(); });
  return dataDic;
};

export default getAllPOI;

export const addPoi = async (name, description, linkedODD, coordinates) => {
  try {
    await addDoc(collection(db, '/POI'), {
      name,
      description,
      linkedODD,
      coordinates,
      created: serverTimestamp(),
    });
  } catch (error) {
    console.log(`Error while adding group: ${error}`);
    return false;
  }
  return true;
};
