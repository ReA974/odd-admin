import {
  deleteDoc, doc,
} from '@firebase/firestore';
import { db } from './firestore.service';

const deleteGroup = async (id) => {
  try {
    await deleteDoc(doc(db, 'GROUP', id));
  } catch (error) {
    console.log(`Error while deleting group: ${error}`);
    return false;
  }
  return true;
};

export default deleteGroup;
