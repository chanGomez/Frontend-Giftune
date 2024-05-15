import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createUser, getUserData } from "../../API/API";
import Button from "@mui/material/Button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../Firebase/Firebase";
import { pullUserFromLocal } from "../../common/FunctionsLibrary";

function GoogleSignIn({ user, setUser, setSuccessfullLogin }) {
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
        setSuccessfullLogin(true)
        // localStorage.setItem("user", JSON.stringify(userData));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  async function navigateUser(user) {
    try {

      let userGotByEmail = await getUserData(user.email);
      // console.log("userGotByemail:", userGotByEmail);

      console.log("use google sign", userGotByEmail.data);
      //If user is not found in database then create user
      if (!userGotByEmail.data) {
        //create a user
        let newUser = await createUser(user);
        // console.log("user ID", userFromDatabase.data.id);
        userGotByEmail = newUser;
      }
      console.log("this is where naviagte happens");
      setUser(userGotByEmail.data);

      navigate(`/dashboard/${userGotByEmail.data.id}`); // This is to go to the dashboard page.
      localStorage.setItem("user", JSON.stringify(userGotByEmail.data));
    } catch (error) {
      // toast.error("User not found", toast.POSITION.TOP_CENTER);
      console.log(error);
    }
  }

  return (
    <>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Sign In with google
      </Typography>
      <Button onClick={onGoogleSignIn}>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          GOOGLE
        </Typography>
      </Button>
    </>
  );
}

export default GoogleSignIn;
