import React, { useState, useEffect } from "react";

function Profile() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const userDataFromSession = await sessionStorage.getItem("user");
      if (userDataFromSession) {
        const parsedUserData = JSON.parse(userDataFromSession);
        setUser(parsedUserData);
      }
    };

    fetchData();
  }, []);

  return (
    <li className="nav-item profile">
      <div className="profile-desc">
        <div className="profile-pic">
          <div className="count-indicator">
            <img
              className="img-xs rounded-circle"
              src={`http://localhost:7000/public/upload/${user.image}`}
              alt=""
            />
            <span className="count bg-success"></span>
          </div>
          <div className="profile-name">
            <h5 className="mb-0 font-weight-normal">{user.fullname}</h5>
            <span>{user.rank}</span>
          </div>
        </div>
      </div>
    </li>
  );
}

export default Profile;
