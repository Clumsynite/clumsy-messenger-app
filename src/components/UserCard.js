import React from "react";

import ProfilePicture from "./ProfilePicture";

import "./UserCard.css";

const UserCard = ({ user }) => {
  const { username, firstname, lastname, connected } = user;
  return (
    <div
      className="User"
      title={`${username} is ${connected ? "Online" : "Offline"}`}
    >
      <div style={{ position: "relative" }}>
        <ProfilePicture user={user} size={60} />
        <span className={`${connected ? "online" : "offline"}`}></span>
      </div>
      <div className="User__details">
        <div className="User__details-fullname">
          {firstname} {lastname}
        </div>
        <div className="User__details-username">
          <span className="badge rounded-pill bg-secondary">AKA</span>
          {" " + username}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
