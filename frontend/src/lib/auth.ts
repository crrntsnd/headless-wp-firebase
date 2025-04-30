import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

export async function signup({ email, password, username, phone }: {
  email: string;
  password: string;
  username: string;
  phone: string;
}) {
  const userCred = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCred.user;

  const usernameRef = doc(db, "usernames", username);
  const usernameSnap = await getDoc(usernameRef);

  if (usernameSnap.exists()) {
    await user.delete();
    throw new Error("Username already taken");
  }

  const phoneQuery = doc(db, "phones", phone);
  const phoneSnap = await getDoc(phoneQuery);
  if (phoneSnap.exists()) {
    await user.delete();
    throw new Error("Phone number already used");
  }

  await setDoc(doc(db, "users", user.uid), {
    email,
    username,
    phone,
    uid: user.uid,
    createdAt: Date.now()
  });

  await setDoc(usernameRef, { uid: user.uid });
  await setDoc(phoneQuery, { uid: user.uid });

  return user;
}

export async function signin(email: string, password: string) {
  const userCred = await signInWithEmailAndPassword(auth, email, password);
  return userCred.user;
}

export async function logout() {
  await signOut(auth);
}
