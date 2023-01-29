import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from '@firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from './firestore.service';

const getAllPOI = async () => {
  const dataDic = {};
  const queryData = await getDocs(collection(db, '/POI'));
  queryData.forEach((doc) => { dataDic[doc.id] = doc.data(); });
  return dataDic;
};

export default getAllPOI;

export const addPoi = async (name, description, linkedODD, coordinates, question) => {
  try {
    const poi = await addDoc(collection(db, '/POI'), {
      name,
      description,
      linkedODD,
      coordinates,
      question,
      created: serverTimestamp(),
    });
    return { id: poi.id };
  } catch (error) {
    console.log(`Error while adding group: ${error}`);
    return null;
  }
};

export const setPoiPicture = async (poi, picture) => {
  let handleError = '';
  const imageRef = ref(storage, `/POI/${poi}`);
  const response = await uploadBytes(imageRef, picture).catch((error) => {
    handleError = error;
    console.log(error);
  });
  if (handleError !== '') return [false, handleError];
  return [true, response];
};

export const getPoiPicture = async (id) => {
  try {
    const image = await getDownloadURL(ref(storage, `/POI/${id}`));
    return image;
  } catch (error) {
    console.log(`Error while getting poi image: ${error}`);
  }
  return undefined;
};
