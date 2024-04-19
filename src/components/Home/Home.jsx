import "./Home.css";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { spinUpServer } from "../API/API";
import Features from "./Features";
import Main from "./Main";


function Home() {
  useEffect(() => {
    spinUpServer();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="home">
      <Main/>
      <Features/>
    </div>
  );
}

export default Home;
