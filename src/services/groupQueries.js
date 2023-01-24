import {
  deleteDoc, doc, addDoc, serverTimestamp, collection,
} from '@firebase/firestore';
import { db } from './firestore.service';

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
    await addDoc(collection(db, 'GROUP'), {
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
