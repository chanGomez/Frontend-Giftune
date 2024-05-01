import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
// import { doSignInWithEmailAndPassword, doSignInWithGoogle} from "../../../firebase/auth";
// import { useAuth } from "../../../contexts/authContext";
import { Button } from "@mui/material";

const Login = ({ setUser }) => {
  const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      await doSignInWithEmailAndPassword(email, password);
      // doSendEmailVerification()
    }
  };

  const onGoogleSignIn = (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      setUser(user.data);
      doSignInWithGoogle().catch((err) => {
        setIsSigningIn(false);
      });
    }
  };

  return (
    <>
      {userLoggedIn && <Navigate to={"/dashboard"} replace={true} />}
      <div
        className="modal-container"
        onClick={(e) => {
          if (e.target.className === "modal-container")
            closeModal("Modal was closed");
        }}
      >
        <div className="modal">
          <div
            className="modal-header"
            onClick={() => closeModal("Modal was closed")}
          >
            <p className="close">&times;</p>
          </div>
          <div className="modal-content">{children}</div>
          <div className="modal-footer">
            <button
              type="submit"
              className="btn btn-submit"
              onClick={() => onSubmit("Submit button was clicked")}
            >
              Submit
            </button>
            <button
              type="submit"
              className="btn btn-cancel"
              onClick={() => onCancel("Cancel button was clicked")}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
