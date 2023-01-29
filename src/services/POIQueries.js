import {
  addDoc,
  collection,
  getDocs,
  doc,
  serverTimestamp,
  getDoc,
} from '@firebase/firestore';
import {
  ref,
  getDownloadURL,
  uploadBytes,
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

export async function getImageByPOI(id) {
  let URI = '';
  const referenceToImage = ref(storage, `POI/${id}`);
  // Get the download URL
  URI = await getDownloadURL(referenceToImage).catch((error) => {
    switch (error.code) {
      case 'storage/object-not-found':
        break;
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;
      case 'storage/unknown':
        // Unknown error occurred, inspect the server response
        break;
      default:
        break;
    }
  });
  return URI;
}

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
