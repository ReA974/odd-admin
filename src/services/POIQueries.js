import { collection, getDocs } from '@firebase/firestore';
import { db } from './firestore.service';

const getAllPOI = async () => {
  const dataDic = {};
  const queryData = await getDocs(collection(db, '/POI'));
  queryData.forEach((doc) => { dataDic[doc.id] = doc.data(); });
  return dataDic;
};

export default getAllPOI;
