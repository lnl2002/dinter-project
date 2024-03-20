import React, { useContext, useState } from 'react';
import { Container, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { clearToken } from '../../common/Token';
import { AuthContext } from '../../context/AuthContext.jsx'
import { BACK_END_HOST, FRONT_END_HOST } from '../../utils/AppConfig.js';
import axios from "axios";
import userCommon from '../../common/User.js'

function HeaderHome(props) {
  const nav = useNavigate();
  const { setUser } = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem('User'));
  const [userList, setUserList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllResults, setShowAllResults] = useState(false);
  const [displayedResults, setDisplayedResults] = useState([]);

  const handleLogout = () => {
    clearToken();
    localStorage.removeItem('User');
    setUser(null);
    window.location.href = '/login';
  }
  const handleViewProfile = () => {
    window.location.href = '/profile'
  }
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
    <Container fluid style={{ backgroundColor: "#fff", padding: "10px 0", position: "fixed", zIndex: "2" }} className='headerContainer'>
      <Container className=" d-flex justify-content-between header align-items-center">
        <Link to={'/'} style={{ textDecoration: "none", color: '#000' }}>
          <div className='header-logo poin pointer'>
            <img src={FRONT_END_HOST + 'images/common/dinter-logo.png'} alt='logo' width={"30px"} />
            <strong style={{ marginLeft: "5px" }}>DINTER</strong>
          </div>
        </Link>
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
                  <a href={`/profile/${user._id}`} style={{ textDecoration: "none", color: '#000' }}>
                    <li key={user._id}>
                      <div className="search-result">
                        <div className="profile-photo3">
                          <img
                            src={userCommon.getOtherImage(user.avatar)}
                            alt=""
                            width={41.4}
                          />
                        </div>
                        <div className="">
                          <a href="#">{user.username}</a>
                        </div>
                      </div>
                    </li>
                  </a>

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
                      Show more
                    </a>
                  </div>
                )}
              </ul>
            )}
          </div>
        </div>

        <Dropdown>
          <Dropdown.Toggle className='header-dropdown'>
            <div className="header-avatar avatar">
              <img src={BACK_END_HOST + user.avatar} alt="avatar" />
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#" onClick={handleViewProfile}>View Profile</Dropdown.Item>
            <Dropdown.Item href="#" onClick={handleLogout}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

      </Container>
    </Container>
  );
}

export default HeaderHome;