import React from "react";
import ProfilePicture from "./ProfilePicture";

import "./Empty.css";

const Empty = ({ user }) => {
  const { firstname } = user;
  return (
    <div className="Empty">
      <h1 className="Empty__name">Welcome, {firstname}</h1>
      <ProfilePicture user={user} size={150} />

      <button className="Empty__btn">Start a Conversation</button>
      <p className="Empty__info">
        Search for someone to start chatting with or go to Contacts to see who
        is available
      </p>
    </div>
  );
};
export default Empty;
