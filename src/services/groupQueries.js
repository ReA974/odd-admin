import {
  getDocs, collection, deleteDoc, doc,
} from '@firebase/firestore';
import { db } from './firestore.service';

const getGroups = async () => {
  const groups = [];

  try {
    const query = collection(db, 'GROUP');
    const querySnapshot = await getDocs(query);
    querySnapshot.forEach((document) => {
      console.log(document.id, ' => ', document.data());
      groups.push({ id: document.id, ...document.data() });
    });
    // order groups by date of creation
    groups.sort((x, y) => x.created - y.created);
  } catch (error) {
    console.log(`Error while getting groups: ${error}`);
    return [false, error];
  }

  return [true, groups];
};

export const deleteGroup = async (id) => {
  try {
    await deleteDoc(doc(db, 'GROUP', id));
  } catch (error) {
    console.log(`Error while deleting group: ${error}`);
    return false;
  }
  return true;
};

export default getGroups;
