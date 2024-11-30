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
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../utils/firebase";
import { AboutSectionData } from "@/app/societies/[slug]/data";
import { uploadToImgBB } from './imgbbUpload';

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
  try {
    const imageUrl = await uploadToImgBB(Poster);
    const updatedFormData = { ...formData, mediaPath: imageUrl };
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
  try {
    const imageUrl = await uploadToImgBB(Picture);
    const updatedFormData = { ...formData, mediaPath: imageUrl };
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
      Chairperson: 2,
      "Vice Chairperson": 3,
      Secretary: 4,
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
export const fetchSocietyData = async (societyKey) => {
  try {
    // Create a query against the `users` collection where `society` matches `societyKey`
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("society", "==", societyKey));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Assuming there's only one document with the matching `society` field
      const docSnap = querySnapshot.docs[0];
      const userData = docSnap.data();
      return {
        aboutText: userData.aboutText || AboutSectionData.textContent,
        backgroundImage: userData.BgImagePath || AboutSectionData.bgSrc,
        heroImage: userData.HeroImagePath || AboutSectionData.heroSrc,
        society: userData.society || "",
        email: userData.email
      };
    } else {
      console.log("No matching documents found!");
      return {
        aboutText: "",
        backgroundImage: "",
        heroImage: "",
        society: "",
        email: ""
      };
    }
  } catch (error) {
    console.error("Error fetching society data:", error);
    throw error;
  }
};
export const updateSocietyData = async (society, newData) => {
  try {
    const userRef = doc(db, "users", society);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      throw new Error("Society document does not exist!");
    }

    const updateObject = {
      aboutText: newData.aboutText,
    };

    if (newData.backgroundImage instanceof File) {
      updateObject.BgImagePath = await uploadToImgBB(newData.backgroundImage);
    } else if (typeof newData.backgroundImage === "string") {
      updateObject.BgImagePath = newData.backgroundImage;
    }

    if (newData.heroImage instanceof File) {
      updateObject.HeroImagePath = await uploadToImgBB(newData.heroImage);
    } else if (typeof newData.heroImage === "string") {
      updateObject.HeroImagePath = newData.heroImage;
    }

    await updateDoc(userRef, updateObject);
    return updateObject;
  } catch (error) {
    console.error("Error updating society data:", error);
    throw error;
  }
};

export const fetchAllPeople = async () => {
  try {
    const peopleRef = collection(db, "members");
    const snapshot = await getDocs(peopleRef);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching all people:", error);
    throw error;
  }
};