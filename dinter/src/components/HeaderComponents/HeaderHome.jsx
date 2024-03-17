import React, { useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";

function HeaderHome(props) {
  const [userList, setUserList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllResults, setShowAllResults] = useState(false);
  const [displayedResults, setDisplayedResults] = useState([]);

  const handleSearch = async (value) => {
    try {
      const data = await axios.get(
        `http://localhost:3008/api/v1/user/user-search/${value}`
      );
      const users = data.data.users;
      setUserList(users);
      // Reset the displayed results and show "Xem thêm" link
      setDisplayedResults(users.slice(0, 5));
      setShowAllResults(users.length <= 5);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowAllResults = () => {
    setDisplayedResults(userList);
    setShowAllResults(true);
  };

  return (
    <Container
      fluid
      style={{
        backgroundColor: "#fff",
        padding: "10px 0",
        position: "fixed",
        zIndex: "2",
      }}
      className="headerContainer"
    >
      <Container className=" d-flex justify-content-between header align-items-center">
        <div className="header-logo poin pointer">
          <img src="images/common/dinter-logo.png" alt="logo" width={"30px"} />
          <strong style={{ marginLeft: "5px" }}>DINTER</strong>
        </div>
        <div className="header-search">
          <div className="d-flex align-items-center">
            <ion-icon name="search-outline"></ion-icon>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                handleSearch(e.target.value);
                setSearchTerm(e.target.value);
              }}
              title="Type in a category"
              placeholder="Search your friends"
            />

            {displayedResults.length > 0 && (
              <ul id="myMenu">
                {displayedResults.map((user) => (
                  <li key={user._id}>
                    <div className="search-result">
                      <div className="profile-photo3">
                        <img
                          src={`http://localhost:3008/${user.avatar}`}
                          alt=""
                          width={41.4}
                        />
                      </div>
                      <div className="">
                        <a href="#">{user.username}</a>
                      </div>
                    </div>
                  </li>
                ))}
                {userList.length > 5 && !showAllResults && (
                  <div
                    className="show-more-link"
                    style={{ textAlign: "center" }}
                  >
                    <a
                      href="#"
                      onClick={handleShowAllResults}
                      style={{ textDecoration: "none" }}
                    >
                      Xem thêm
                    </a>
                  </div>
                )}
              </ul>
            )}
          </div>
        </div>
        <div className="header-avatar avatar">
          <img src="images/common/avatar.png" alt="avatar" />
        </div>
      </Container>
    </Container>
  );
}

export default HeaderHome;
