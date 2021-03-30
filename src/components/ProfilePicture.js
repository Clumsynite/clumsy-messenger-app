import React from "react";
import Avatar from "react-avatar";
import _ from "lodash";

import "./ProfilePicture.css";

const ProfilePicture = ({ user, size, className }) => {
  const { photo, firstname, lastname, username } = user;
  return (
    <>
      {!_.startsWith(photo, "data:image") ? (
        <Avatar
          name={`${firstname} ${lastname}`}
          size={size}
          alt={`${username}'s Avatar`}
          className={`${className} `}
          round={true}
        />
      ) : (
        <img
          src={photo}
          alt="PFP"
          className={`profile-picture ${className} `}
          style={{ height: size, width: size }}
          title={`${firstname} ${lastname}`}
        />
      )}
    </>
  );
};

export default ProfilePicture;
