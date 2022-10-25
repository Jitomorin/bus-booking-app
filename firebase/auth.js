import { auth, firestore } from "./firebase";
import { createContext, useState, useEffect } from "react";

const authContext = createContext({});
//sign up
const doCreateUserWithEmailAndPassword = async (email, password) => {
  await auth.createUserWithEmailAndPassword(email, password);
};

//sign out
const doSignOut = () => auth.signOut();
//sign in
const doSignInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

//## below are two more functions, for resetting or changing passwords ##

//password reset
const doPasswordReset = (email) => auth.sendPasswordResetEmail(email);

//password change
const doPasswordChange = (password) =>
  auth.currentUser.updatePassword(password);

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const user=auth.onAuthStateChanged()
  useEffect(() => {
    const getUser = async () => {
 
        if (user) {
          const userDetails = await firestore
            .collection("users")
            .doc(user?.uid)
            .get();
          setCurrentUser(...userDetails);
          console.log("user: " + user+'\nuserDetails: '+userDetails);
        } else if (!user) {
          console.log("user: null");
          setCurrentUser({});
        }
    
    };
    return getUser();
  }, [user]);

  return (
    <authContext.Provider value={{ currentUser }}>
      {children}
    </authContext.Provider>
  );
};

export {
  authContext,
  AuthProvider,
  doCreateUserWithEmailAndPassword,
  doSignOut,
  doSignInWithEmailAndPassword,
  doPasswordReset,
  doPasswordChange,
};
