import {
  browserLocalPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../utils/firebase";
export const handleLogin = async (formData) => {
  try {
    await setPersistence(auth, browserLocalPersistence);
    const userCredential = await signInWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );
    const user = userCredential.user;
    const society = await getSociety(user.uid);
    return { ...user, society: society };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getSociety = async (userId) => {
  const userDocRef = doc(db, "users", userId);
  const userDocSnapshot = await getDoc(userDocRef);
  const userData = userDocSnapshot.data();
  const userSociety = userData.society;
  return userSociety;
};

export const createEvent = async (formData, Poster) => {
  const timestamp = Date.now();
  const fileName = `events/${timestamp}.${Poster.name.split(".")[1]}`;
  const fileRef = ref(storage, fileName);
  try {
    await uploadBytes(fileRef, Poster);
    const fileLink = await getDownloadURL(fileRef);
    const updatedFormData = { ...formData, mediaPath: fileLink };
    await addDoc(collection(db, "events"), updatedFormData);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const fetchEventsBySociety = (society, handleEventsUpdate) => {
  const EventsRef = collection(db, "events");
  const q = query(EventsRef, where("society", "==", society));

  return onSnapshot(q, (querySnapshot) => {
    const events = [];

    querySnapshot.forEach((eventDoc) => {
      const eventData = eventDoc.data();
      const eventId = eventDoc.id;
      events.push({ id: eventId, ...eventData });
    });

    handleEventsUpdate(events);
  });
};
