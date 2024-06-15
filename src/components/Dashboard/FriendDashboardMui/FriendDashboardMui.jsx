import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { calculateZodiacSign } from "../../common/Zodiac/CalculateZodiacSign";
import { Link, useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import { Padding } from "@mui/icons-material";

const style = {
  backgroundColor: "white",
  border: "1px solid #282828",
  borderRadius: 3,
  boxShadow: "none",
  minWidth: 450,
  padding: 1,
};

export default function RecipeReviewCard({ friendDetails, user, currentDate }) {
      let { user_id, user_picture, display_name, dobInMili } = friendDetails;
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


      //Use this logic but apply Mui chips to the cards instead!----------------

    //   function friendContentClassNames() {
    //     if (
    //       monthNumOfUpcomingBirthday === currentDate.getMonth() + 1 &&
    //       Number(dayNumOfUpcomingBirthDay) === currentDate.getDate()
    //     ) {
    //       return "dashboard-friend-card-container-today";
    //     } else if (
    //       monthNumOfUpcomingBirthday === currentDate.getMonth() + 1 &&
    //       yearNumOfUpcomingBirthday === currentDate.getYear()
    //     ) {
    //       return "dashboard-friend-card-container-this-month";
    //     } else {
    //       return "dashboard-friend-card-container";
    //     }
    //   }

      let sign = calculateZodiacSign(dobInMili, user_id);

  return (
    <Card sx={style} key={user_id}>
      <Link to={`/dashboard/${user.id}/friends/${user_id}`}>
        <CardHeader
          avatar={
            <img
              className="dashboard-img-placeholder"
              src={user_picture}
              alt="profile_img"
            />
          }
          action={
            <Tooltip title={sign?.zodiacName} arrow>
              <IconButton>
                <Typography color="text.secondary">
                  {sign?.zodiacSign}
                </Typography>
              </IconButton>
            </Tooltip>
          }
          title={
            <Typography color="h2">{friendDetails.display_name}</Typography>
          }
          subheader={
            <Typography color="text.secondary">
              {fullMonthOfUpcomingBirthday} {dayNumOfUpcomingBirthDay}
            </Typography>
          }
        />
      </Link>
    </Card>
  );
}
