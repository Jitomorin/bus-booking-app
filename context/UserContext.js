import { createContext, useContext, useEffect, useState } from "react";
import { auth, firestore } from "../firebase/firebase";

export const authContext = createContext(null);
export function useAuth() {
  return useContext(authContext);
}
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const getUser = async () => {
      auth.onAuthStateChanged(async (user) => {
        const userDetails = await firestore
          .collection("users")
          .doc(user?.uid)
          .get();
        const data = userDetails.data();
        console.log("User context: " + data);
        setCurrentUser(data || undefined);
        //add check if data is undefined
      });
    };
    getUser();
  }, []);
  const value = {
    currentUser,
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};
