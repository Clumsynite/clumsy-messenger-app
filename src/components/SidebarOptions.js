import React, { useState, useEffect, useRef } from "react";
import { InlineIcon } from "@iconify/react";
import logoutIcon from "@iconify-icons/carbon/logout";
import { useToasts } from "react-toast-notifications";
import { Icon } from "@iconify/react";
import overflowMenuVertical from "@iconify-icons/carbon/overflow-menu-vertical";
import { Divide as Hamburger } from "hamburger-react";

import store from "../store";
import { setAuthenticated, setUser } from "../actions";
import { logout } from "../api";

import ProfilePicture from "./ProfilePicture";

import "./SidebarOptions.css";
import "./PopupMenu.css";

const SidebarOptions = () => {
  const { addToast } = useToasts();

  const { user } = store.getState();
  const { username, firstname, lastname } = user;

  const [spinner, setSpinner] = useState(false);

  const OptionsMenu = () => {
    const menuRef = useRef(null);
    const [menuVisible, setMenuVisible] = useState(false);

    const onClick = () => {
      setMenuVisible(!menuVisible);
    };

    return (
      <div className="menu-container">
        {/* <Icon icon={overflowMenuVertical} width={30} height={30} color="#fff" /> */}
        <Hamburger
          toggled={menuVisible}
          toggle={onClick}
          style={{ cursor: "pointer" }}
          size={20}
          color={`${menuVisible ? "skyblue" : "#fff"}`}
        />

        <nav
          ref={menuRef}
          className={`menu ${menuVisible ? "visible" : "hidden"} `}
        >
          <ul>
            <li>
              <div>Edit User Profile </div>
            </li>
            <li>
              <div>Change Password</div>
            </li>
            <li>
              <div> Option To Be Added</div>
            </li>
          </ul>
        </nav>
      </div>
    );
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      setSpinner(true);
      const data = await logout(localStorage.token);
      setSpinner(false);
      if (data.success) {
        addToast(data.msg, { appearance: "success" });
        localStorage.clear();
        store.dispatch(setAuthenticated());
        store.dispatch(setUser());
      } else {
        console.error(data.error);
        addToast(data.error, { appearance: "error" });
      }
    } catch (error) {
      setSpinner(false);
      console.error(error);
    }
  };

  return (
    <div className="Options">
      <ProfilePicture user={user} size={50} />
      <OptionsMenu />
      <div className="Options__user-details">
        <div className="Options__user-logged">Logged in as</div>
        <div
          className="Options__user-username"
          title={`${firstname} ${lastname}`}
        >
          {username}
        </div>
      </div>
      <button
        type="button"
        title="Logout Button"
        className={`btn btn-lg ${
          !spinner ? "bg-danger text-light" : "bg-light"
        }`}
        onClick={handleLogout}
        disabled={spinner}
      >
        {!spinner && <InlineIcon icon={logoutIcon} width="24" height="24" />}
        {spinner && (
          <div
            className="spinner-border text-danger spinner-border-sm"
            role="status"
            style={{ width: 24, height: 24 }}
          >
            <span className="visually-hidden">Logging out...</span>
          </div>
        )}
      </button>
    </div>
  );
};

export default SidebarOptions;
