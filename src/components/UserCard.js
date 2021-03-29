import React from "react";
import Avatar from "react-avatar";

import "./UserCard.css";

const UserCard = ({ user }) => {
  const { username, firstname, lastname, connected } = user;
  return (
    <div
      className="User"
      title={`${username} is ${connected ? "Online" : "Offline"}`}
    >
      <div style={{ position: "relative" }}>
        <Avatar
          name={`${firstname} ${lastname}`}
          size={60}
          alt={`${username}'s Avatar`}
          round={true}
        />
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
