import React from "react";
import ProfilePicture from "./ProfilePicture";
import "./Header.css";

const Header = ({ user }) => {
  const { firstname, lastname, username } = user;
  return (
    <header className="Header">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <ProfilePicture size={60} user={user} />
        <h1
          className="Header__name"
          style={{ padding: "0 15px" }}
        >{`${firstname} ${lastname}`}</h1>
        <div
          className="User__details-username"
          style={{ padding: "0", fontSize: 20 }}
        >
          <span className="badge rounded-pill bg-secondary" style={{marginRight: "0 10px"}}>AKA</span>
          {" " + username}
        </div>
      </div>
    </header>
  );
};
export default Header;
