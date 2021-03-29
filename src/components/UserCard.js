import React from "react";
import Avatar from "react-avatar";
import _ from "lodash";

import "./UserCard.css";

const UserCard = ({ user }) => {
  const { photo, username, firstname, lastname, connected } = user;
  return (
    <div
      className="User"
      title={`${username} is ${connected ? "Online" : "Offline"}`}
    >
      <div style={{ position: "relative" }}>
        {!_.startsWith(photo, "data:image") ? (
          <Avatar
            name={`${firstname} ${lastname}`}
            size={60}
            alt={`${username}'s Avatar`}
            round={true}
          />
        ) : (
          <img src={photo} alt="PFP" className="profile-picture" />
        )}
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
