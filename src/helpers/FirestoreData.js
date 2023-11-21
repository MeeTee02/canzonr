import { getFirestore } from "firebase/firestore";

export const handleLastLoginDataUpload = async (email, artists, tracks, genres) => {
    try {
      // Check if the user with the specified email exists
      const db = getFirestore();
      console.log(db);
      const userRef = db.collection('Users').where('email', '==', email);
      const userSnapshot = await userRef.get();

      if (!userSnapshot.empty) {
        // Update the 'allTime' array with the new array
        const userId = userSnapshot.docs[0].id;
        const userDocRef = db.collection('Users').doc(userId);

        // Update the document with the new 'allTime' array
        await userDocRef.update({
          'topArtists.allTime': artists.get('allTime'),
          'topArtists.lastSixMonths': artists.get('lastSixMonths'),
          'topArtists.lastFourWeeks': artists.get('lastFourWeeks'),
          'topTracks.allTime': tracks.get('allTime'),
          'topTracks.lastSixMonths': tracks.get('lastSixMonths'),
          'topTracks.lastFourWeeks': tracks.get('lastFourWeeks'),
          'topGenres.allTime': genres.get('allTime'),
          'topGenres.lastSixMonths': genres.get('lastSixMonths'),
          'topGenres.lastFourWeeks': genres.get('lastFourWeeks'),
        });

        console.log('Array uploaded successfully');
      } else {
        console.log('User not found with the specified email');
      }
    } catch (error) {
      console.error('Error uploading array:', error);
    }
  };

