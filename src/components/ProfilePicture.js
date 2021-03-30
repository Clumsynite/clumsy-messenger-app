import React from "react";
import Avatar from "react-avatar";
import _ from "lodash";

import "./ProfilePicture.css";

const ProfilePicture = ({ user, size }) => {
  const { photo, firstname, lastname, username } = user;
  return (
    <>
      {!_.startsWith(photo, "data:image") ? (
        <Avatar
          name={`${firstname} ${lastname}`}
          size={size}
          alt={`${username}'s Avatar`}
          round={true}
        />
      ) : (
        <img
          src={photo}
          alt="PFP"
          className="profile-picture"
          style={{ height: size, width: size }}
        />
      )}
    </>
  );
};

export default ProfilePicture;
