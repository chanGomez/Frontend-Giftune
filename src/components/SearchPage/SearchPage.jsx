import React, { useState, useEffect } from "react";
import "./SearchPage.css";
import SearchList from "./SearchList";
import SearchIcon from "@mui/icons-material/Search";
import { getAllUsersAPI } from "../API/API";

function Search() {
  const [input, setInput] = useState("");
  const [usersData, setUsersData] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [mainUser, setMainUser] = useState({});

  useEffect(() => {
    let userFromStorage = localStorage.getItem("user");
    let storedUser = JSON.parse(userFromStorage);
    setMainUser(storedUser);
    fetchUsers();
    // eslint-disable-next-line
  }, []);

  async function fetchUsers() {
    try {
      let result = await getAllUsersAPI();
      setUsersData(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (value) => {
    setInput(value);
    handleFilter(value);
  };

  function handleFilter(input) {
    let filtered = usersData.filter((user) => {
      return user?.display_name.toLowerCase().includes(input.trim());
    });

    if (mainUser) {
      filtered = filtered.filter((element) => {
        return element?.display_name !== mainUser?.display_name;
      });
    }

    setFilteredUsers(filtered.sort());
  }

  return (
    <div
      className={
        mainUser
          ? "search-page-container"
          : "search-page-container-not-signed-in"
      }
    >
      <div className="search-page-content">
        <div className="search-page-content-background">
          <div className="search-page-title">
            <p> Find Your Friend</p>
          </div>

          <div className="search-box">
            <input
              type="text"
              className="search-page-search-input"
              placeholder="Search by username"
              value={input}
              onChange={(e) => handleChange(e.target.value)}
            />

            <button
              className="search-page-search-button"
              style={{ backgroundColor: 'transparent' }}
            >
                <SearchIcon />
            </button>
          </div>
          <div className="search-page-results">
            {input ? <SearchList filteredUsers={filteredUsers} /> : ""}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
