import {
  collection, getDocs, doc, getDoc,
} from '@firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
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
