import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD4kmF7DoaTt2gUkZYkYS4DvQiIfSsNEU8",

  authDomain: "canzonr-81dff.firebaseapp.com",

  projectId: "canzonr-81dff",

  storageBucket: "canzonr-81dff.appspot.com",

  messagingSenderId: "1064174375812",

  appId: "1:1064174375812:web:011173abef822b02eb43d1",

  measurementId: "G-JDF754J59T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a Firestore instance
const db = getFirestore(app);

export const handleLastLoginDataUpload = async (
  email,
  artists,
  tracks,
  genres
) => {
  try {
    const artistsData = Object.fromEntries(artists);
    const tracksData = Object.fromEntries(tracks);
    const genresData = Object.fromEntries(genres);

    const q = query(collection(db, "Users"), where("email", "==", email));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (docSnapshot) => {
      // Get the reference to the document
      const userDocRef = doc(db, "Users", docSnapshot.id);

      // Update the specific field (topArtists in this case) with a new value
      await updateDoc(userDocRef, {
        topArtists: {
          allTime: artistsData.allTime,
          lastSixMonths: artistsData.lastSixMonths,
          lastFourWeeks: artistsData.lastFourWeeks,
        },
        topTracks: {
          allTime: tracksData.allTime,
          lastSixMonths: tracksData.lastSixMonths,
          lastFourWeeks: tracksData.lastFourWeeks,
        },
        topGenres: {
          allTime: genresData.allTime,
          lastSixMonths: genresData.lastSixMonths,
          lastFourWeeks: genresData.lastFourWeeks,
        },
      });

      console.log("Document updated successfully");
    });
    
  } catch (error) {
    console.error("Error overwriting data:", error);
  }
};
