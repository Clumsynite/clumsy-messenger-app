import React, { useState, useRef } from "react";
import { InlineIcon } from "@iconify/react";
import logoutIcon from "@iconify-icons/carbon/logout";
import { useToasts } from "react-toast-notifications";
import { Divide as Hamburger } from "hamburger-react";

import Rodal from "rodal";
import "rodal/lib/rodal.css";

import store from "../store";
import { setAuthenticated, setUser } from "../actions";
import { logout } from "../api";

import ProfilePicture from "./ProfilePicture";
import UpdateForm from "./SignupForm";

import "./SidebarOptions.css";
import "./PopupMenu.css";

const SidebarOptions = () => {
  const { addToast } = useToasts();

  const { user } = store.getState();
  const { username, firstname, lastname } = user;

  const [spinner, setSpinner] = useState(false);

  const OptionsMenu = ({ className }) => {
    const menuRef = useRef(null);
    const [menuVisible, setMenuVisible] = useState(false);
    const [editProfileOpen, setEditProfileOpen] = useState(false);

    const onClick = () => {
      setMenuVisible(!menuVisible);
    };

    return (
      <div className="menu-container">
        <Hamburger
          toggled={menuVisible}
          toggle={onClick}
          style={{ cursor: "pointer" }}
          size={20}
          color={`${menuVisible ? "skyblue" : "#fff"}`}
        />
        {editProfileOpen && (
          <Rodal
            visible={editProfileOpen}
            onClose={() => setEditProfileOpen(false)}
            closeOnEsc
            showCloseButton
            enterAnimation={"slideUp"}
            leaveAnimation={"fade"}
            customStyles={{
              backgroundColor: "transparent",
              padding: 0,
              height: "70vh",
              width: "80vw",
            }}
          >
            <UpdateForm update />
          </Rodal>
        )}
        <nav
          ref={menuRef}
          className={`menu ${menuVisible ? "visible" : "hidden"} `}
        >
          <ul>
            <li>
              <div
                onClick={() => {
                  setEditProfileOpen(true);
                  setMenuVisible(false);
                }}
              >
                Edit User Profile
              </div>
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
      const data = await logout();
      setSpinner(false);
      if (data.success) {
        addToast(data.msg, { appearance: "success" });
        localStorage.clear();
        store.dispatch(setAuthenticated());
        store.dispatch(setUser());
      } else if (data.message && data.name) {
        addToast(data.message, { appearance: "error" });
      } else if (!data.success) {
        console.error(data.message);
        addToast(data.error, { appearance: "error" });
      }
    } catch (error) {
      setSpinner(false);
      console.error(error);
    }
  };

  return (
    <div className="Options">
      <ProfilePicture user={user} size={50} className={"Options__pic"} />
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
        className={`btn ${
          !spinner ? "bg-danger text-light" : "bg-light"
        } logout-button`}
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
