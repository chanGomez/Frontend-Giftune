import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Modal } from "@mui/material";
import { createPortal } from "react-dom";
import { useState } from "react";
import Questionnaire from "../Questionnire/Questionnaire";
import { doSignInWithGoogle } from "../Auth/Firebase/Auth";
// import { useAuth } from "../common/context/authContext";
import { NavLink, useNavigate } from "react-router-dom";
import { createUser } from "../API/API";
import GoogleSignIn from "../Auth/LogIn/GoogleSignIn";
import { Padding } from "@mui/icons-material";

const pages = ["Log Out"];
const pagesNotLoggedIn = ["Find Wishlist", "Login"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const style = {
  backgroundImage: "linear-gradient(120deg, #fdfbfb 0%, #e5dcea 100%)",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 420,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 14,
  p: 4,
  borderRadius: 3,
  // padding: 5
};

function ResponsiveAppBar({ user, setUser, setSuccessfullLogin, setIsLoading, setUserFromBackend }) {
  const navigate = useNavigate();

  function handleLogOut() {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
    setSuccessfullLogin(false);
    handleClose(false)
  }

  //modal-----
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return user ? (
    //LOGGED IN
    <AppBar position="static">
      <Container maxWidth="xl" sx={{ maxWidth: 1200 }}>
        <Toolbar disableGutters>
          <Typography
            variant="h3"
            noWrap
            href="#app-bar-with-responsive-menu"
            sx={{
              // ml: 5,
              mr: 5,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              // letterSpacing: '.3rem',
              textDecoration: "none",
            }}
          >
            Giftune
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Giftune
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "end",
            }}
          >
            <Button
              onClick={handleLogOut}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              {pages}
            </Button>
          </Box>

          {/* <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
        </Toolbar>
      </Container>
    </AppBar>
  ) : (
    //NOT LOGGED IN
    <AppBar position="static">
      <Container maxWidth="l" sx={{ maxWidth: 1200 }}>
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          {/* <img className="logo-nav" src={GiftuneLogo} alt="logo"  style={{width: 200, mixBlendMode: 'multiply', filter: "invert()"}}/> */}

          <NavLink to={"/"}>
            <Typography
              variant="h3"
              noWrap
              href="#app-bar-with-responsive-menu"
              sx={{
                // ml: 5,
                mr: 5,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                // letterSpacing: '.3rem',
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Giftune
            </Typography>
          </NavLink>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pagesNotLoggedIn.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Giftune
          </Typography>

          <Box
            sx={{
              flexGrow: 2,
              display: { xs: "none", md: "flex", justifyContent: "end" },
            }}
          >
            {/* {pagesNotLoggedIn.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))} */}
            {/* <NavLink to={"/search-page"}> */}
            <Button
              onClick={() => {
                navigate("/search-page");
              }}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Find Wishlist
            </Button>
            {/* </NavLink> */}
            <Button
              onClick={handleOpen}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Sign In
            </Button>
            {open && (
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ borderRadius: 20 }}
              >
                <Box sx={style}>
                  {/* if login successfull && and user.firstTimeLogin is false then do questionaire */}
                  {/* {user ? (
                    user.emailVerified === true &&
                    user.firstTimeLogin === true ? (
                      <Questionnaire />
                    ) : (
                      navigate(`/dashboard/${user.id}`)
                    )
                  ) : ( */}
                  <GoogleSignIn
                    handleClose={handleClose}
                    user={user}
                    setUser={setUser}
                    setSuccessfullLogin={setSuccessfullLogin}
                    setIsLoading={setIsLoading}
                    setUserFromBackend={setUserFromBackend}
                  />
                  {/* )} */}
                </Box>
              </Modal>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
