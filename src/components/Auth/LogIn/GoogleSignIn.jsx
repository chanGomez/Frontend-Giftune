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

function GoogleSignIn({
  user,
  setUser,
  setSuccessfullLogin,
  setIsLoading,
  handleClose,
  setOpen
}) {
  const navigate = useNavigate();

  console.log(setUser);

  const onGoogleSignIn = (e) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setIsLoading(true);
        setOpen(false);
        const userData = result.user;
        navigateUser({
          user_picture: userData.photoURL,
          display_name: userData.displayName,
          email: userData.email,
        });
        

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
      setIsLoading(false);
      setSuccessfullLogin(true);
      {
        userGotByEmail.data.id &&
          navigate(`/dashboard/${userGotByEmail.data.id}`);
      }

      localStorage.setItem("user", JSON.stringify(userGotByEmail.data));

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      className="google-modal-conatiner"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography
        id="modal-modal-title"
        variant="h5"
        component="h2"
        sx={{
          fontWeight: 600,
          padding: 1,
          textDecoration: "underLine",
          textUnderlineOffset: 3,
        }}
      >
        Sign In
      </Typography>
      <Typography
        id="modal-modal-title"
        sx={{ color: "#757575", padding: 2, fontWeight: 400, width: " 80%" }}
      >
        No password setup required. Sign in to start your wishlist.
      </Typography>
      <button
        onClick={onGoogleSignIn}
        type="button"
        class="login-with-google-btn"
        style={{ display: "flex", margin: 10 }}
      >
        <img
          id="google_icon"
          src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
        />
        <Typography sx={{ fontSize: 20, padding: 2 }}>
          Sign in with Google
        </Typography>
      </button>
    </div>
  );
}

export default GoogleSignIn;
