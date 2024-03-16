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
    // <div className="home">
    //   <div className="top-main-container">
    //     <div className="top-main-left">
    //       <div className="main-text">
    //         <h1>Where heartfelt gifting meets perfect harmony.</h1>
    //         <p>
    //           An app designed to keep you on top of your loved ones upcoming
    //           birthdays, where you can effortlessly select the perfect gift.
    //         </p>
    //         <Link to={`/signup`}>
    //           <button>Sign Me Up</button>
    //         </Link>
    //       </div>
    //     </div>
    //     <div className="top-main-right">
    //       <div className="main-image-container">
    //         <img className="main-image" src={giftPhone} alt="gift pic" />
    //       </div>
    //     </div>
    //   </div>
    //   <div className="content-container">
    //     <div className="content">
    //       <p className="text-content">
    //         Never miss your loved one's special day. Easily keep track of
    //         upcoming birthdays and pick out the perfect gift hassle-free.
    //       </p>
    //       <div className="image-container">
    //         <img className="image" src={calender} alt="gift pic" />
    //       </div>
    //       <div className="image-container">
    //         <img className="image" src={couch} alt="gift pic" />
    //       </div>
    //       <p className="text-content">
    //         No more unwanted gifts that keep piling up. Giftune relieves the
    //         tension within families and relationships.
    //       </p>
    //     </div>
    //   </div>
    // </div>
    <div className="home">
      <Main/>
      <Features/>
    </div>
  );
}

export default Home;
