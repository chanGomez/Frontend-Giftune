import React, { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import Notification from "../Notification/Notification";
import { FriendsContext, NotificationContext } from "../../common/context/context";
import { getAllFriendsFromUser, getNotificationById } from "../../API/API";
import { TbCake } from "react-icons/tb";
import People from "@mui/icons-material/People";
import PermMedia from "@mui/icons-material/PermMedia";
import Dns from "@mui/icons-material/Dns";
import Public from "@mui/icons-material/Public";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import PeopleIcon from "@mui/icons-material/People";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
//
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ArrowRight from "@mui/icons-material/ArrowRight";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Home from "@mui/icons-material/Home";
import Settings from "@mui/icons-material/Settings";
import getLPTheme from "../../../getLPTheme";
import "../../../App.css"

function SideBarNavMui({user}) {
  const [friendsCount, setFriendsCount] = useState(0);
  const { setFriendsData, toggleUpdate, setToggleUpdate } = useContext(FriendsContext);
  const { setNotificationsData } = useContext(NotificationContext);


  const data = [
    // {
    //   icon: <HomeIcon />,
    //   label: "Home",
    //   route: `/dashboard/${user?.id}`,
    // },
    {
      icon: <PersonSearchIcon />,
      label: "Explore",
      route: `/search-page`,
    },
    {
      icon: <PeopleIcon />,
      label: "Friends",
      route: `/dashboard/${user?.id}/friends`,
    },
    {
      icon: <FormatListBulletedIcon />,
      label: "Wishlist",
      route: `/dashboard/${user?.id}/userwishlist`,
    },
    {
      icon: <NotificationsIcon />,
      label: "Notifications",
      route: `/dashboard/notification`,
    },
    {
      icon: <SettingsIcon />,
      label: "Settings",
      route: `/dashboard/${user?.id}/editProfile`,
    },
  ];

  useEffect(() => {
    fetchFriends(user?.id);
    getNotifications(user?.id);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (toggleUpdate) {
      fetchFriends(user?.id);
      setToggleUpdate(false);
      getNotifications(user?.id);
    }
    // eslint-disable-next-line
  }, [toggleUpdate]);

//   function formatDate(inputDate) {
//     // Parse the input string into a Date object
//     const dateObject = new Date(inputDate);
//     // EST DateTime Offset
//     const dateObjectESTTimeOffset = dateObject.getTimezoneOffset() * 60 * 1000;
//     dateObject.setTime(dateObject.getTime() + dateObjectESTTimeOffset);
//     // Options for formatting the date
//     const options = { month: "long", day: "numeric" };

//     // Format the date using the specified options
//     const formattedDate = dateObject.toLocaleDateString("en-US", options);
//     return formattedDate;
//   }

  async function fetchFriends(id) {
    try {
      let result = await getAllFriendsFromUser(id);
      setFriendsCount(result.data.length);
      setFriendsData(result.data);
    } catch (error) {
      console.log(error);
    }
  }
  async function getNotifications(id) {
    try {
      let result = await getNotificationById(id);
      setNotificationsData(result);
    } catch (error) {
      console.log(error);
    }
  }

  console.log(user.user_picture)

  // const FireNav = styled(List)({
  //   "& .MuiListItemButton-root": {
  //     paddingLeft: 24,
  //     paddingRight: 24,
  //   },
  //   "& .MuiListItemIcon-root": {
  //     minWidth: 0,
  //     marginRight: 16,
  //   },
  //   "& .MuiSvgIcon-root": {
  //     fontSize: 20,
  //   },
  // });

    const LPtheme = createTheme(getLPTheme('light'));
    
  return (
    <Box
      sx={{
        maxWidth: "fit-content",
        marginLeft: "auto",
        marginRight: "auto",
        margin: 0,
        // display: "flex",
        alignItems: "center",
        height: 450,
        backgroundColor: "#fff",
        borderRadius: 4,
      }}
    >
      <ThemeProvider
        theme={createTheme({
          components: {
            MuiListItemButton: {
              defaultProps: {
                disableTouchRipple: true,
              },
            },
          },
          palette: {
            mode: "dark",
            primary: { main: "#000" },
            // backgroundColor: { paper: "#ddd" },
          },
        })}
        // theme={LPtheme}
      >
        <Box elevation={0} sx={{ minWidth: 256 }}>
          <Box component="nav" disablePadding>
            <Box
              sx={{
                backgroundColor: "rgba(145, 158, 171, 0.12)",
                m: 1,
                mb: 2,
                borderRadius: 3,
              }}
            >
              <ListItem component="div">
                <img
                  className="sidebarImage"
                  src={user?.user_picture}
                  alt="Profile Image"
                  style={{ width: 40, height: 40 }}
                />
                <ListItemButton sx={{ height: 56 }}>
                  <ListItemText
                    primary={user.display_name}
                    primaryTypographyProps={{
                      color: "primary",
                      fontWeight: "bold",
                      variant: "body1",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </Box>
            <Divider />
            <Box
              className="sidebar-mui-listitem-list"
              sx={{
                // bgcolor: "#fff",
                pb: 2,
              }}
            >
              {/* <ListItemButton
                alignItems="flex-start"
                sx={{
                  px: 3,
                  pt: 2.5,
                  pb: 0,
                  "&:hover, &:focus": { backgroundColor: "red" },
                }}
              ></ListItemButton> */}
              <NavLink end to={`/dashboard/${user?.id}`}>
                <ListItemButton
                  className="sidebar-mui-listitem"
                  sx={{
                    py: 0,
                    minHeight: 50,
                    color: "#",
                    borderRadius: 2,
                    // border: '1px red solid',
                    mb: 0.6,
                    ml: 1,
                    mr: 1,
                    gap: -2,
                    backgroundColor: "#fff",
                    // ":hover": {
                    //   backgroundColor: "rgba(145, 158, 171, 0.08)",
                    // },
                    // ":focus, :active": {
                    //   color: "rgb(179, 28, 213)",
                    //   backgroundColor: "rgba(238, 163, 255, 0.5)",
                    // },
                  }}
                >
                  <ListItemIcon sx={{ color: "inherit" }}>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Home"
                    primaryTypographyProps={{
                      fontSize: 14,
                      fontWeight: "medium",
                    }}
                  />
                </ListItemButton>
              </NavLink>
              {data.map((item) => (
                <NavLink to={item.route}>
                  <ListItemButton
                    className="sidebar-mui-listitem"
                    key={item.label}
                    sx={{
                      py: 0,
                      minHeight: 50,
                      color: "#",
                      borderRadius: 2,
                      // border: '1px red solid',
                      mb: 0.6,
                      ml: 1,
                      mr: 1,
                      gap: -2,
                      backgroundColor: "#fff",
                      // ":hover": {
                      //   backgroundColor: "rgba(145, 158, 171, 0.08)",
                      // },
                      // ":focus, :active": {
                      //   color: "rgb(179, 28, 213)",
                      //   backgroundColor: "rgba(238, 163, 255, 0.5)",
                      // },
                    }}
                  >
                    <ListItemIcon sx={{ color: "inherit" }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontSize: 14,
                        fontWeight: "medium",
                      }}
                    />
                  </ListItemButton>
                </NavLink>
              ))}
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </Box>
  );
}

export default SideBarNavMui