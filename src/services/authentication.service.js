import {
  signInWithEmailAndPassword, sendPasswordResetEmail,
  setPersistence, browserSessionPersistence, browserLocalPersistence, signOut,
} from '@firebase/auth';
import { auth } from './firestore.service';

export const logInWithEmailAndPassword = async (email, password, remainMe) => {
  let handleError = '';

  // setting the persistence of the authentication
  if (remainMe) {
    await setPersistence(auth, browserLocalPersistence)
      .catch((error) => {
        handleError = error;
      });
  } else {
    await setPersistence(auth, browserSessionPersistence)
      .catch((error) => {
        handleError = error;
      });
  }

  if (handleError !== '') {
    return handleError;
  }
  await signInWithEmailAndPassword(auth, email, password)
    .catch((error) => {
      console.log('hehe', error);
      handleError = error;
    });
  return handleError;
};

export const logOut = async () => {
  await signOut(auth);
};

export const resetPassword = async (email) => {
  let handleError = '';
  await sendPasswordResetEmail(auth, email).catch((error) => {
    handleError = error;
  });
  return handleError;
};
