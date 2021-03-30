import React from "react";

import store from "../store";
import { setActiveUserId } from "../actions";

import ProfilePicture from "./ProfilePicture";
import "./UserCard.css";

const UserCard = ({ user }) => {
  const { username, firstname, lastname, connected, _id } = user;
  return (
    <div
      className="User"
      title={`${username} is ${connected ? "Online" : "Offline"}`}
      onClick={() => {
        store.dispatch(setActiveUserId(_id));
      }}
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
