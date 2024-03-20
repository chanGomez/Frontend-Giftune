import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import { getUserData } from "../../API/API";
import { auth } from "../FirebaseAuth/firebaseAuth"
import { signInWithEmailAndPassword } from "firebase/auth";

import "./Login.css";

function Login({ setUser }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // try {
    //   let user = await getUserData(email);
    //   if (!user.data.id) {
    //     throw Error;
    //   } else {
    //     setUser(user.data);
    //     window.localStorage.setItem("user", JSON.stringify(user.data));
    //     setPassword("");
    //     // toast.success("Login Successful", toast.POSITION.TOP_CENTER);
    //     navigate(`/dashboard/${user.data.id}`); // This is to go to the dashboard page.
    //   }
    //   setEmail({
    //     email: "",
    //   });
    // } catch (error) {
    //   // toast.error("User not found", toast.POSITION.TOP_CENTER);
    //   // console.log(error);
    // }
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(userCredential)
    }).catch((e)=>{
      console.log(e)
    })
  }

  return (
    <>
      <div className="formBox">
        <form onSubmit={handleSubmit} className="Container">
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
          <div className="Section">
            <p className="Text">
              Don't have an account?{" "}
              <Link to={"/signup"} className="Link">
                Sign up here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
