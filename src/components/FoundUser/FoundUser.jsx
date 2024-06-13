import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./FoundUser.css";
import {
  getSpecificUser,
  getSpecificUserWishlist,
  getAllFriendsFromUser,
} from "../API/API";
import { TbArrowLeft } from "react-icons/tb";

import SearchListBtn from "../SearchPage/SearchListBtn";

function FoundUser() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [toggleFullView, setToggleFullView] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [userwishlist, setUserwishlist] = useState([]);
  const [areFriends, setAreFriends] = useState(false);
  const [loggedInID, setLoggedInID] = useState(0);

  useEffect(() => {
    let userFromStorage = localStorage.getItem("user");
    let storedUser = JSON.parse(userFromStorage);
    if (storedUser) {
      setToggleFullView(true);
      checkIfFriends(storedUser.id);
      setLoggedInID(storedUser?.id);
    } else setToggleFullView(false);
    fetchData();
    // eslint-disable-next-line
  }, []);

  console.log(JSON.parse(localStorage.getItem("user")));

  async function fetchData() {
    try {
      let result = await getSpecificUser(id);
      console.log(result);
      let wishlistData = await getSpecificUserWishlist(id);
      setUserwishlist(wishlistData);
      setUserInfo(result);
    } catch (error) {
      console.log(error);
    }
  }
  console.log(userInfo, id, userwishlist);

  async function checkIfFriends(localId) {
    try {
      let { data } = await getAllFriendsFromUser(localId);
      let checkRequest = !!data.find(
        (element) => element.user_id === Number(id)
      );

      setAreFriends(checkRequest);
    } catch (error) {
      console.log(error);
    }
  }
  let dayNumOfUpcomingBirthDay = new Date(userInfo.dob).toLocaleDateString(
    "en-US",
    { day: "numeric" }
  );
  let fullMonthOfUpcomingBirthday = new Date(userInfo.dob).toLocaleDateString(
    "en-US",
    {
      month: "long",
    }
  );

  return (
    <div className="friend-profile-container">
      <div className="friend-profile-info-top">
        <div className="friend-wishlist-top-left-side">
          <img
            alt="friend-user-profile"
            className="friend-user-profile"
            src={`${userInfo.user_picture ? userInfo.user_picture : ""}`}
          />
          <div className="friend-user-names">
            <h2>
              {/* {toggleFullView
                ? `${userInfo?.display_name}`
                : `${userInfo?.user_name}`} */}
             { userInfo?.display_name}
            </h2>
            <p>{userInfo.display_name}</p>
            <p className="friend-user-dob">
              {toggleFullView
                ? `${fullMonthOfUpcomingBirthday} ${dayNumOfUpcomingBirthDay}`
                : "Please sign in or make an account to view their birthday"}
            </p>
            {areFriends ? (
              <button
                className="expandedBtn"
                onClick={() =>
                  navigate(`/dashboard/${loggedInID}/friends/${userInfo.id}`)
                }
              >
                More Details
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="friend-wishlist-top-right-side">
          {toggleFullView ? (
            <>{!areFriends ? <SearchListBtn targetUser={userInfo} /> : <></>}</>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="friend-wishlist-list-container">
        <ul className="friend-wishlist-ul">
          {userwishlist.length === 0 ? (
            <li>This user has no wishlist items</li>
          ) : (
            <>
              {userwishlist.map((item) => {
                return (
                  <li key={item.id}>
                    <div className="wishlistItem">
                      <div className="itemGlow"></div>
                      <div className="itemBorderGlow"></div>
                      <div className="itemBody">
                        <div className="itemTitle">
                          {item.item_name.charAt(0).toUpperCase() +
                            item.item_name.slice(1)}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </>
          )}
        </ul>
      </div>
      {/* <div className="back-left-arrow-container" onClick={() => navigate(-1)}>
        <TbArrowLeft size={65} />
      </div> */}
    </div>
  );
}

export default FoundUser;
