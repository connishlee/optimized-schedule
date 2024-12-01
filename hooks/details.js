import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export const useDetails = () => {
  const clerkUser = useUser();

  const [details, setDetails] = useState([]);
  const [error, setError] = useState(null);

  const db = firebase.firestore();

  useEffect(() => {
    const retrieveDetails = async function () {
      try {
        const firebaseToken = await clerkUser.getToken("firebase");
        await firebase.auth().signInWithCustomToken(firebaseToken);

        const tempDetails = [];
        const example = await db.collection().get();
        example.forEach((detail) => {
          tempDetails.push(detail.data());
        });

        setDetails(tempDetails);
      } catch (err) {
        setError(err);
      }
    };
    retrieveDetails();
  }, []);

  return { details, error };
};
