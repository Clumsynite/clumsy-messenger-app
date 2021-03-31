import React from "react";
import ProfilePicture from "./ProfilePicture";
import moment from "moment";
import "./Header.css";

const Header = ({ user }) => {
  const { firstname, lastname, connected, lastOnline } = user;
  return (
    <header className="Header">
      <div className=" flex-row">
        <ProfilePicture size={60} user={user} />
        <div>
          <div className="flex-row">
            <h1
              className="Header__name"
              style={{ padding: "0 15px" }}
            >{`${firstname} ${lastname}`}</h1>
          </div>
          <div>
            <div className="last-seen">
              {!connected ? (
                <div>
                  Last Seen <em>{moment(lastOnline).fromNow()}</em>
                </div>
              ) : (
                <div>Online</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
