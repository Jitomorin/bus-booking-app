import { createContext, useContext, useEffect, useState } from "react";
import { auth, firestore } from "../firebase/firebase";

export const authContext = createContext(null);
export function useAuth() {
  return useContext(authContext);
}
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isUserLoading, setIsUserLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      auth.onAuthStateChanged(async (user) => {
        setIsUserLoading(true)
        console.log('Authetication state s changing...')
        await firestore
          .collection("users")
          .doc(user?.uid)
          .get().then((doc) => { 
            const data = doc.data();
        console.log("User context: " + data);
        setCurrentUser(data || undefined);
        //add check if data is undefined
        setIsUserLoading(false)
          })
        
      });
    };
    getUser();
  }, []);
  const value = {
    currentUser,
   isUserLoading
  };
 

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};
export function useAuthContext() {
   
    return useContext(authContext);
  }
