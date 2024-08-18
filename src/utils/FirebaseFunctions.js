import {
  browserLocalPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
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

export const deleteEvent = async (eventId) => {
  try {
    await deleteDoc(doc(db, "events", eventId));
    return true;
  } catch (error) {
    return false;
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
    // Sort events by date, most recent first
    events.sort((a, b) => new Date(b.date) - new Date(a.date));
    handleEventsUpdate(events);
  });
};

export const fetchAllEvents = (handleEventsUpdate) => {
  const EventsRef = collection(db, "events");
  const q = query(EventsRef);

  return onSnapshot(q, (querySnapshot) => {
    const events = [];

    querySnapshot.forEach((eventDoc) => {
      const eventData = eventDoc.data();
      const eventId = eventDoc.id;
      events.push({ id: eventId, ...eventData });
    });

    events.sort((a, b) => new Date(b.date) - new Date(a.date));

    handleEventsUpdate(events);
  });
};

export const createPerson = async (formData, Picture) => {
  const timestamp = Date.now();
  const fileName = `members/${timestamp}.${Picture.name.split(".")[1]}`;
  const fileRef = ref(storage, fileName);
  try {
    await uploadBytes(fileRef, Picture);
    const fileLink = await getDownloadURL(fileRef);
    const updatedFormData = { ...formData, mediaPath: fileLink };
    await addDoc(collection(db, "members"), updatedFormData);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deletePerson = async (personId) => {
  try {
    await deleteDoc(doc(db, "members", personId));
    return true;
  } catch (error) {
    return false;
  }
};

export const fetchPeopleBySociety = (society, handlePeopleUpdate) => {
  const Membersref = collection(db, "members");
  const q = query(Membersref, where("society", "==", society));

  return onSnapshot(q, (querySnapshot) => {
    const people = [];

    querySnapshot.forEach((doc) => {
      const personData = doc.data();
      const personId = doc.id;
      people.push({ id: personId, ...personData });
    });

    // Custom sorting function
    const sortOrder = {
      "Branch Counsellor": 1,
      "Chairperson": 2,
      "Vice Chairperson": 3,
      "Secretary": 4,
    };

    people.sort((a, b) => {
      const orderA = sortOrder[a.role] || 100;
      const orderB = sortOrder[b.role] || 100;
      
      if (orderA !== orderB) {
        return orderA - orderB; // Sort by predefined order
      }
      return a.name.localeCompare(b.name);
    });

    handlePeopleUpdate(people);
  });
};
