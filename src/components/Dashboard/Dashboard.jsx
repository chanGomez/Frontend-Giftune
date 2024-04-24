/* eslint-disable padded-blocks */
import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserProfile } from "../API/API";
import { calculateZodiacSign } from "../common/Zodiac/CalculateZodiacSign";
import { FriendsContext } from "../common/context/context";
// import Events from "../common/Events/Events";
import "./Dashboard.css";

function Dashboard({ user }) {
  let navigate = useNavigate();
  const [dashboardId, setDashboardId] = useState(user.id);
  const [dashboardUser, setDashboardUser] = useState({});
  let currentDate = new Date(Date.now()); // Time from system
  currentDate.setTime(
    currentDate.getTime() + currentDate.getTimezoneOffset() * 60 * 1000
  );
  const { setFriendsData } = useContext(FriendsContext);

  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
    fetchData();
    setFriendsData(dashboardUser.friends);
    // eslint-disable-next-line
  }, [dashboardId]);

  async function fetchData() {
    try {
      setDashboardId(user?.id);
      let response = await getUserProfile(dashboardId);
      setDashboardUser(response.data);
    } catch (error) {
      console.log(error);
    }
  }

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
        <Friend
          friendDetails={friendDetails}
          dashboardUserId={dashboardId}
          currentDate={currentDate}
        />
      </div>
    );
  });

  return (
    <>
      <div className="dashboard-container">
        <p className="dashboard-heading">Upcoming Birthdays</p>
        {friendsList}
      </div>
    </>
  );
}

function Friend({ friendDetails, dashboardUserId, currentDate }) {
  let { user_id, user_picture, first_name, last_name, dobInMili } =
    friendDetails;
  let dayNumOfUpcomingBirthDay = new Date(dobInMili).toLocaleDateString(
    "en-US",
    { day: "numeric" }
  );
  let fullMonthOfUpcomingBirthday = new Date(dobInMili).toLocaleDateString(
    "en-US",
    {
      month: "long",
    }
  );

  let monthNumOfUpcomingBirthday = new Date(dobInMili).getMonth() + 1;
  let yearNumOfUpcomingBirthday = new Date(dobInMili).getYear();

  function friendContentClassNames() {
    if (
      monthNumOfUpcomingBirthday === currentDate.getMonth() + 1 &&
      Number(dayNumOfUpcomingBirthDay) === currentDate.getDate()
    ) {
      return "dashboard-friend-card-container-today";
    } else if (
      monthNumOfUpcomingBirthday === currentDate.getMonth() + 1 &&
      yearNumOfUpcomingBirthday === currentDate.getYear()
    ) {
      return "dashboard-friend-card-container-this-month";
    } else {
      return "dashboard-friend-card-container";
    }
  }

  let sign = calculateZodiacSign(dobInMili, user_id);
  let userPic = user_picture.includes("http")? user_picture : profileImg;

  return (
    <div className={friendContentClassNames()} key={user_id}>
      <Link
        to={`/dashboard/${dashboardUserId}/friends/${user_id}`}
        className="friend-list-link"
      >
        <div
          className={`dashboard-friend-card-content${
            monthNumOfUpcomingBirthday === currentDate.getMonth() + 1
              ? "-this-month"
              : ""
          }`}
        >
          <div className="dashboard-friend-card-left">
            {/* <div className="dashboard-img-placeholder"> */}
            <img
              className="dashboard-img-placeholder"
              src={userPic}
              alt="profile_img"
            />
            {/* </div> */}
            <p className="dashboard-card-name">
              {first_name} {last_name}{" "}
            </p>
          </div>
          <p className="dashboard-card-text">
            {fullMonthOfUpcomingBirthday} {dayNumOfUpcomingBirthDay}{" "}
          </p>
          <p className="dashboard-card-text-zodiac" key={sign.zodiacSign.key}>
            Zodiac: {sign.zodiacSign}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default Dashboard;
