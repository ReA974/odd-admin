import {
  addDoc,
  updateDoc,
  collection,
  getDocs,
  doc,
  serverTimestamp,
  getDoc,
  deleteDoc,
} from '@firebase/firestore';
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from 'firebase/storage';
import { db, storage } from './firestore.service';

export const getAllPOI = async () => {
  const dataDic = {};
  const queryData = await getDocs(collection(db, '/POI'));
  queryData.forEach((document) => {
    dataDic[document.id] = document.data();
  });
  return dataDic;
};

export const getPOI = async (id) => {
  const docRef = doc(db, '/POI', id);
  let queryData;
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      queryData = docSnap.data();
    } else {
      console.log('Document does not exist');
      queryData = null;
    }
  } catch (error) {
    console.log(error);
  }
  return queryData;
};

export const addPoi = async (name, description, linkedODD, coordinates, question, challenge) => {
  try {
    const poi = await addDoc(collection(db, '/POI'), {
      name,
      description,
      linkedODD,
      coordinates,
      question,
      challenge,
      created: serverTimestamp(),
    });
    return { id: poi.id };
  } catch (error) {
    console.log(`Error while adding poi: ${error}`);
    return null;
  }
};

export const updatePoi = async (
  id,
  name,
  description,
  linkedODD,
  coordinates,
  question,
  challenge,
) => {
  const poi = doc(db, '/POI', id);
  try {
    await updateDoc(poi, {
      name,
      description,
      linkedODD,
      coordinates,
      question,
      challenge,
      updated: serverTimestamp(),
    });
    return { id };
  } catch (error) {
    console.log(`Error while updating poi: ${error}`);
    return null;
  }
};

export const setPoiPicture = async (poi, picture, url) => {
  let handleError = '';
  const imageRef = ref(storage, `/${url}/${poi}`);
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

export const deletePoi = async (id) => {
  try {
    await deleteDoc(doc(db, 'POI', id));
    deleteObject(ref(storage, `/POI/${id}`));
  } catch (error) {
    console.log(`Error while deleting group: ${error}`);
    return false;
  }
  return true;
};
