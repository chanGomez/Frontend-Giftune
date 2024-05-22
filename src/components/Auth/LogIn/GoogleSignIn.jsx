import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createUser, getUserData } from "../../API/API";
import Button from "@mui/material/Button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../Firebase/Firebase";
import { pullUserFromLocal } from "../../common/FunctionsLibrary";
import "./GoogleSignIn.css";

function GoogleSignIn({ user, setUser, setSuccessfullLogin, setIsLoading }) {
  const navigate = useNavigate();

  console.log(setUser);

  const onGoogleSignIn = (e) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const userData = result.user;
        
        navigateUser({
          user_picture: userData.photoURL,
          display_name: userData.displayName,
          email: userData.email,
        });
        setIsLoading(true)
        setSuccessfullLogin(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  async function navigateUser(user) {
    try {
      let userGotByEmail = await getUserData(user.email);
      console.log("userFetchedFromBackend", userGotByEmail.data);
      
      if (!userGotByEmail.data) {
        let newUser = await createUser(user);
        userGotByEmail = newUser;
        console.log("userFetchedFromBackendCreated", userGotByEmail.data);
      }
      setUser(userGotByEmail.data);

      {userGotByEmail.data.id && navigate(`/dashboard/${userGotByEmail.data.id}`)};

      setIsLoading(false)
      localStorage.setItem("user", JSON.stringify(userGotByEmail.data));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ }}>
        Sign in with google.
      </Typography>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        No password setup required.
      </Typography>
      <button
        onClick={onGoogleSignIn}
        type="button"
        class="login-with-google-btn"
      >
        <Typography>Sign In with google</Typography>
      </button>
    </>
  );
}

export default GoogleSignIn;
