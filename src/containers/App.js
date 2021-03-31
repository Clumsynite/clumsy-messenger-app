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
  const { authenticated, userList, user, activeUserId } = store.getState();
  const [numberOnline, setNumberOnline] = useState(0);

  useEffect(() => {
    setInterval(() => {
      const getConnectedUsers = async () => {
        try {
          const data = await connectedUsers();
          const { connected } = data;
          if (numberOnline !== connected) setNumberOnline(connected);
        } catch (error) {
          console.error(error);
        }
      };
      if (localStorage.token) getConnectedUsers();
    }, 1250);
    // eslint-disable-next-line
  });

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
    if (localStorage.token) getOtherUsers();
  }, [numberOnline]);

  return (
    <div className="App">
      <ToastProvider autoDismiss>
        {!authenticated && <UserForm />}
        {authenticated && <Sidebar users={userList} />}
        {authenticated && <Main user={user} activeUserId={activeUserId} />}
      </ToastProvider>
    </div>
  );
};

export default App;
