import { createContext, useEffect, useState } from "react";
import app from "../Firebase/firebase.config";
import PropTypes from "prop-types";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import axios from "axios";

export const AuthContext = createContext();
const auth = getAuth(app);
const authProviderGoogle = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState(0);
  const [duration, setDuration] = useState(0);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const userSignIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, authProviderGoogle);
  };

  const userLogout = () => {
    setLoading(true);
    return signOut(auth);
  };

  const userProfileUpdate = (userName, photoURL) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: userName,
      photoURL: photoURL,
    });
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      const userEmail = currentUser?.email || user?.email;
      const loggedUser = { email: userEmail };

      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        axios
          .post("https://assignmentb8-12-server.vercel.app/jwt", loggedUser, {
            withCredentials: true,
          })
          .then((res) => {
            console.log("token response", res.data);
          });
      } else {
        axios
          .post(
            "https://assignmentb8-12-server.vercel.app/logout",
            loggedUser,
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            console.log(res.data);
          });
      }
    });

    return () => {
      unSubscribe();
    };
  }, [user?.email]);

  const authInfo = {
    user,
    loading,
    setLoading,
    createUser,
    userSignIn,
    userLogout,
    userProfileUpdate,
    googleSignIn,
    price,
    setPrice,
    duration,
    setDuration,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
