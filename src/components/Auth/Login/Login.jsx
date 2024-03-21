import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import { getUserData } from "../../API/API";
import { jwtDecode } from "jwt-decode";

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

  function handleCallBackResponse(response){
    console.log("Encoded JWT ID token: " + response.credential)
    const useObject = jwtDecode(response.credential)
    console.log(useObject)
    setUser(useObject)
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "374494526117-4rp04t8dhkvsh4802t7cspdh7n64fkoh.apps.googleusercontent.com",
      callback: handleCallBackResponse
    })

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {theme: "outline", 
      size: "large",
      width: 300,}
    )

  }, [])
  

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let user = await getUserData(email);
      if (!user.data.id) {
        throw Error;
      } else {
        setUser(user.data);
        window.localStorage.setItem("user", JSON.stringify(user.data));
        setPassword("");
        // toast.success("Login Successful", toast.POSITION.TOP_CENTER);
        navigate(`/dashboard/${user.data.id}`); // This is to go to the dashboard page.
      }
      setEmail({
        email: "",
      });
    } catch (error) {
      // toast.error("User not found", toast.POSITION.TOP_CENTER);
      // console.log(error);
    }
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
      <div id="signInDiv"></div>
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
