import React, { useState, useEffect } from "react";
import { ToastProvider } from "react-toast-notifications";
import _ from "lodash";

import store from "../store";
import { refreshUserList } from "../actions";
import { otherUsers, connectedUsers } from "../api";

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
    const getOtherUsers = async () => {
      try {
        const data = await otherUsers();
        const { users } = data;
        const sortedUsers = _.orderBy(users, ["con"], ["desc"]);
        return store.dispatch(refreshUserList(sortedUsers));
      } catch (error) {
        console.error(error);
      }
    };
    getOtherUsers();
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
