import {
  getDocs, collection,
} from '@firebase/firestore';
import { db } from './firestore.service';

const getGroups = async () => {
  // const user = auth.currentUser;
  // if (!user) {
  //   return [false, 'No user connected'];
  // }
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

export default getGroups;
