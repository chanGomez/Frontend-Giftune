/* eslint-disable padded-blocks */
import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserProfile } from "../API/API";
import { calculateZodiacSign } from "../common/Zodiac/CalculateZodiacSign";
import { FriendsContext } from "../common/context/context";
import noFriendsImage from "../../Assets/no-friends.png";
import { pullUserFromLocal } from "../common/FunctionsLibrary";
import NoFriendsFound from "../common/NoResults/NoFriendsFound";
import SidebarNav from "../SidebarNav/SidebarNav";
import SideBarNavMui from "./SideBarNavMui/SideBarNavMui";
import Spinner from "../common/spinner/Spinner";
// import Events from "../common/Events/Events";
import "./Dashboard.css";
import FriendListDashboardMui from "./FriendDashboardMui/FriendDashboardMui"
import Calender from "../Calender/Calender"

function Dashboard() {
  let navigate = useNavigate();
  const [user, setUser] = useState(pullUserFromLocal());
  const [dashboardUser, setDashboardUser] = useState({});
  const [ isloading, setIsLoading]= useState(false)
  let currentDate = new Date(Date.now()); // Time from system
  currentDate.setTime(currentDate.getTime() + currentDate.getTimezoneOffset() * 60 * 1000);
  // const { setFriendsData } = useContext(FriendsContext);
  const [friendsData, setFriendsData] = useState({})

    async function fetchData() {
      try {
        setIsLoading(true);
        let response = await getUserProfile(user.id);
        setDashboardUser(response.data);
        setFriendsData(response.data.friends);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  
  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
    fetchData();
    // eslint-disable-next-line
  }, [user.id]);

  
  // Sorting DOB by positive/negative where we subtract the current date from an upcoming date
  const upcomingDateCalc = (dob) => {
    // DOB date
    let date = new Date(dob);
    let upcomingDateESTTimeZoneOffset = date.getTimezoneOffset() * 60 * 1000;
    // UpcomingDOBDate: calc dates with current year attached.
    let upcomingDateWithCurrentYear = new Date(
      date.setFullYear(currentDate.getFullYear())
    );
    // UpcomingDate - now = Time before each date.
    let oneMiliBeforeTwentyFourHrs = 86399999;
    let upcomingDateDiff =
      upcomingDateWithCurrentYear.setTime(
        upcomingDateWithCurrentYear.getTime() +
          oneMiliBeforeTwentyFourHrs +
          upcomingDateESTTimeZoneOffset
      ) - currentDate;
    // Sort by this ^^^^^
    if (upcomingDateDiff > 0) {
      // positive is in the current year
      return upcomingDateWithCurrentYear;
    } else {
      // negative is next year
      let upcomingDateWithNextYear = new Date(
        date.setFullYear(currentDate.getFullYear() + 1)
      );
      upcomingDateWithNextYear.setTime(
        upcomingDateWithNextYear.getTime() +
          oneMiliBeforeTwentyFourHrs +
          upcomingDateESTTimeZoneOffset
      );
      return upcomingDateWithNextYear;
    }
  };

  dashboardUser?.friends?.forEach((friend) => {
    friend.dobInMili = upcomingDateCalc(friend.dob);
  });
  let sortedfriendList = dashboardUser?.friends?.sort(
    (a, b) => a.dobInMili - b.dobInMili
  );

  let friendsList = sortedfriendList?.map((friendDetails, index) => {
    return (
      <div key={index}>
        <FriendListDashboardMui
          friendDetails={friendDetails}
          user={user}
          currentDate={currentDate}
        />
      </div>
    );
  });

console.log(friendsList);
console.log(dashboardUser.friends);

  return (
    <>
      {isloading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div className="dashboard-container">
            {dashboardUser?.friends?.length ? friendsList : <NoFriendsFound />}
          </div>
          <div>
            <Calender />
          </div>
        </div>
      )}
      {/* <p className="dashboard-heading">Upcoming Birthdays</p> */}
    </>
  );
}


export default Dashboard;
