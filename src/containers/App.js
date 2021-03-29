import React, { useState, useEffect } from "react";
import { ToastProvider } from "react-toast-notifications";
import _ from "lodash";

import store from "../store";
import { refreshUserList } from "../actions";
import { allUsers, connectedUsers } from "../api";

import UserForm from "./UserForm";
import Sidebar from "./Sidebar";
import Main from "./Main";

import "./App.css";

const App = () => {
  const { authenticated, userList } = store.getState();
  const [numberOnline, setNumberOnline] = useState(0);
  const [timestamp, setTimestamp] = useState(Date.now());

  useEffect(() => {
    let secTimer = setInterval(() => {
      setTimestamp(Date().toLocaleString());
    }, 1000);

    const getConnectedUsers = async () => {
      try {
        const connected = await connectedUsers();
        const { users } = connected;
        if (numberOnline !== users.length) setNumberOnline(users.length);
      } catch (error) {
        console.error(error);
      }
    };
    if (localStorage.token) getConnectedUsers();
    return () => clearInterval(secTimer);
    // eslint-disable-next-line
  }, [timestamp]);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const data = await allUsers();
        const contacts = data === undefined ? [] : data.users;
        const username = _.get(
          JSON.parse(localStorage.user || "{}"),
          "username"
        );
        const allContacts = _.filter(
          contacts,
          (contact) => contact.username !== username
        );
        return store.dispatch(refreshUserList(allContacts));
      } catch (error) {
        console.error(error);
      }
    };
    getAllUsers();
  }, [numberOnline]);

  return (
    <div className="App">
      <ToastProvider autoDismiss>
        {!authenticated && <UserForm />}
        {authenticated && <Sidebar users={userList} />}
        {authenticated && <Main />}
      </ToastProvider>
    </div>
  );
};

export default App;
