import React, { useState } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/authContext";
import { doCreateUserWithEmailAndPassword } from "../../../firebase/auth";

const Register = () => {
  const navigate = useNavigate();

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setconfirmPassword] = useState("");
  // const [isRegistering, setIsRegistering] = useState(false);
  // const [errorMessage, setErrorMessage] = useState("");

  // const { userLoggedIn } = useAuth();

  // const onSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!isRegistering) {
  //     setIsRegistering(true);
  //     await doCreateUserWithEmailAndPassword(email, password);
  //   }
  // };

    const { userLoggedIn } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


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
      <div className="formBox">
        <form onSubmit={onSubmit} className="Container">
          <span className="Title">Login</span>
          <span className="Subtitle">Login with your credentials here!</span>
          <div className="InputGroup">
            <input
              type="text"
              className="Input"
              required
              onChange={handleEmailChange}
              value={email}
              placeholder="E-mail"
              id="email"
            />
            <input
              type="password"
              className="Input"
              required
              onChange={handlePasswordChange}
              value={password}
              placeholder="Password"
              id="password"
            />
          </div>
          <button type="submit" className="submitBtn">
            Login
          </button>
          <div id="signInDiv"></div>
          <div className="Section">
            <p className="Text">
              Don't have an account?{" "}
              <Link to={"/sign-up"} className="Link">
                Sign up here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
