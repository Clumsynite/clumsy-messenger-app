import React, { useState } from "react";
import { InlineIcon } from "@iconify/react";
import logoutIcon from "@iconify-icons/carbon/logout";
import { useToasts } from "react-toast-notifications";

import store from "../store";
import { setAuthenticated, setUser } from "../actions";
import { logout } from "../api";

import ProfilePicture from "./ProfilePicture";

import "./SidebarOptions.css";

const SidebarOptions = () => {
  const { addToast } = useToasts();

  const { user } = store.getState();
  const { username, firstname, lastname } = user;

  const [spinner, setSpinner] = useState(false);

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
      <div className="Options__user-details">
        <div className="Options__user-logged">Logged in AS</div>
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
