import React from 'react'
import noFriendsImage from "../../../Assets/no-friends.png";
import { Padding } from '@mui/icons-material';

function NoFriendsFound() {
  return (
    <div
      style={{
        textAlign: "center",
        // display: "flex",
        // flexDirection: "column",
        // alignItems: "center",
        backgroundColor: "white",
        border: "1px solid #282828",
        borderRadius: 16,
        boxShadow: "none",
        minWidth: 450,
        padding: 1,
      }}
    >
      <img
        src={noFriendsImage}
        style={{
          width: "30%",
          borderRadius: "120px 20px 120px 20px",
          position: 20,
          margin: 10,
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <p style={{ width: "50%", fontWeight: 500, fontSize: 20 }}>
          {" "}
          No Friends Found
        </p>
        <p
          style={{
            width: "50%",
            color: "#757575",
            letterSpacing: 0.7,
            lineHeight: 1.5,
            marginTop: -10,
          }}
        >
          {" "}
          You will find all upcoming birthdays here. Add some friends to start
          your feed.
        </p>
      </div>
    </div>
  );
}

export default NoFriendsFound