import {
  deleteDoc, doc, setDoc, serverTimestamp,
} from '@firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import { db, storage } from './firestore.service';

export const deleteGroup = async (id) => {
  try {
    await deleteDoc(doc(db, 'GROUP', id));
  } catch (error) {
    console.log(`Error while deleting group: ${error}`);
    return false;
  }
  return true;
};

export const addGroup = async (name, phone) => {
  try {
    await setDoc(doc(db, 'GROUP', phone), {
      name,
      phone,
      created: serverTimestamp(),
    });
  } catch (error) {
    console.log(`Error while adding group: ${error}`);
    return false;
  }
  return true;
};

export const getImage = async (url) => {
  try {
    const image = await getDownloadURL(ref(storage, url));
    return image;
  } catch (error) {
    console.log(`Error while getting image: ${error}`);
  }
  return undefined;
};
