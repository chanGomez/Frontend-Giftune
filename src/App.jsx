// DEPENDENCIES
import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/NavBarMUI/NavBarMUI";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer } from "react-toastify";
import SideBarNavMui from "./components/Dashboard/SideBarNavMui/SideBarNavMui";
import Spinner from "./components/common/spinner/Spinner";
import { pullUserFromLocal } from "./components/common/FunctionsLibrary";
import {getUserData} from "./components/API/API"
import {
  FriendsContext,
  WishlistContext,
  NotificationContext,
} from "./components/common/context/context";
import { createTheme, ThemeProvider } from "@mui/material";

const Dashboard = React.lazy(() => import("./components/Dashboard/Dashboard"));
// const Map = React.lazy(() => import("./components/common/GoogleMaps/Map"));

const NotificationPage = React.lazy(() =>
  import("./components/Notification/NotificationPage")
);
const UserWishlist = React.lazy(() =>
  import("./components/UserWishlist/UserWishlist")
);
const AddWishlist = React.lazy(() =>
  import("./components/AddWishlist/AddWishlist")
);
const EditWishlist = React.lazy(() =>
  import("./components/EditWishlist/EditWishlist")
);
const FoundUser = React.lazy(() => import("./components/FoundUser/FoundUser"));

// COMPONENTS
const SearchPage = React.lazy(() =>
  import("./components/SearchPage/SearchPage")
);
const Nav = React.lazy(() => import("./components/Nav/Nav"));
const SidebarNav = React.lazy(() =>
  import("./components/SidebarNav/SidebarNav")
);
const Home = React.lazy(() => import("./components/Home/Home"));
const Footer = React.lazy(() => import("./components/Footer/Footer"));
const FriendList = React.lazy(() =>
  import("./components/FriendList/FriendList")
);
const FriendsProfile = React.lazy(() =>
  import("./components/FriendsProfile/FriendsProfile")
);
const EditableUserProfile = React.lazy(() =>
  import("./components/Dashboard/EditableUserProfile/EditableUserProfile")
);

import Questionnaire from "./components/Questionnire/Questionnaire";

      // {
      //   showPreview && (
      //     <Suspense fallback={<Loading />}>
      //       <h2>Preview</h2>
      //       <MarkdownPreview markdown={markdown} />
      //     </Suspense>
      //   );
      // }

function App() {
  const [user, setUser] = useState(null);
  const [successfullLogin, setSuccessfullLogin] = useState(false)
  const [isLoading, setIsLoading] = useState()
  const [FriendsData, setFriendsData] = useState(null);
  const [WishlistData, setWishlistData] = useState([]);
  const [toggleUpdate, setToggleUpdate] = useState(false);
  const [NotificationsData, setNotificationsData] = useState([]);
  const [SentRequest, setSentRequest] = useState([]);
  const [userFromBackend, setUserFromBackend] = useState(null);

  const FriendsContextValue = {
    setFriendsData,
    FriendsData,
    toggleUpdate,
    setToggleUpdate,
  };
  const WishlistContextValue = {
    WishlistData,
    toggleUpdate,
    setWishlistData,
    setToggleUpdate,
  };
  const NotificationContextValue = {
    NotificationsData,
    toggleUpdate,
    SentRequest,
    setNotificationsData,
    setToggleUpdate,
    setSentRequest,
  };

  useEffect(() => {
   
    let storedUser = pullUserFromLocal();
    {storedUser && setUser(storedUser.data)}

  }, [successfullLogin]);


  const theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#9c27b0",
      },
      secondary: {
        main: "#f50057",
      },
      background: {
        default: "#f3f0ff",
      },
      divider: "#9c27b0",
    },
    typography: {
      h1: {
        fontFamily: "Monospace",
      },
      h2: {
        fontFamily: "Monospace",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <React.Suspense fallback={<Spinner />}>
        <Router>
          {/* remove navbar from router */}
              <Navbar
                user={user}
                setUser={setUser}
                setSuccessfullLogin={setSuccessfullLogin}
                setIsLoading={setIsLoading}
                setUserFromBackend={setUserFromBackend}
              />
          <main className={user ? "page-content-container" : ""}>
            <div className={user ? "page-content" : ""}>
              <NotificationContext.Provider value={NotificationContextValue}>
                <FriendsContext.Provider value={FriendsContextValue}>
                  {/* move sidebar into dashboard */}
                  {user && <SideBarNavMui user={user} />}
                </FriendsContext.Provider>
              </NotificationContext.Provider>
              <Routes>
                <Route
                  path="/search-page"
                  element={
                    <NotificationContext.Provider
                      value={NotificationContextValue}
                    >
                      <FriendsContext.Provider value={FriendsContextValue}>
                        <SearchPage />
                      </FriendsContext.Provider>
                    </NotificationContext.Provider>
                  }
                />
                {/* <Route path="/sign-up" element={<SignUpPage />} /> */}
                <Route path="/" element={<Home />} />
                {/* <Route path="/login" element={<Login setUser={setUser} />} /> */}
                <Route path="/users/:id" element={<FoundUser />} />
                <Route path="/questionnaire" element={<Questionnaire />} />
                <Route
                  path="/dashboard/:id/new"
                  element={
                    <WishlistContext.Provider value={WishlistContextValue}>
                      <AddWishlist user={user} />
                    </WishlistContext.Provider>
                  }
                />
                <Route
                  path="/dashboard/notification"
                  element={
                    <NotificationContext.Provider
                      value={NotificationContextValue}
                    >
                      <FriendsContext.Provider value={FriendsContextValue}>
                        <NotificationPage />
                      </FriendsContext.Provider>
                    </NotificationContext.Provider>
                  }
                />
                <Route
                  path="/dashboard/:id/userwishlist"
                  element={
                    <WishlistContext.Provider value={WishlistContextValue}>
                      <UserWishlist user={user} />
                    </WishlistContext.Provider>
                  }
                />
                <Route
                  path="/dashboard/:id/edit"
                  element={
                    <WishlistContext.Provider value={WishlistContextValue}>
                      <EditWishlist />
                    </WishlistContext.Provider>
                  }
                />
                <Route
                  path="/dashboard/:id"
                  element={
                    <FriendsContext.Provider value={FriendsContextValue}>
                      <Dashboard user={user} />
                    </FriendsContext.Provider>
                  }
                />

                <Route
                  path="/dashboard/:id/friends"
                  element={
                    <FriendsContext.Provider value={FriendsContextValue}>
                      <FriendList />
                    </FriendsContext.Provider>
                  }
                />
                <Route
                  path="/dashboard/:id/friends/:friendId"
                  element={
                    <FriendsContext.Provider value={FriendsContextValue}>
                      <FriendsProfile />
                    </FriendsContext.Provider>
                  }
                />

                <Route
                  path="/dashboard/:id/editProfile"
                  element={
                    <WishlistContext.Provider value={WishlistContextValue}>
                      <EditableUserProfile user={user} />
                    </WishlistContext.Provider>
                  }
                />
                {/* <Route path="/dashboard/events" element={<Map />} /> */}
              </Routes>
            </div>
          </main>
          <Footer user={user} setUser={setUser} />
        </Router>
      </React.Suspense>
    </ThemeProvider>
  );
}

export default App;
