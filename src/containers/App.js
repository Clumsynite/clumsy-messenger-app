import React, { useState, useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import _ from "lodash";

import store from "../store";
import { refreshUserList } from "../actions";
import { ping, otherUsers, connectedUsers } from "../api";

import UserForm from "./UserForm";
import Sidebar from "./Sidebar";
import Main from "./Main";

import "./App.css";

const App = () => {
  const { authenticated, userList, user, activeUserId } = store.getState();
  const [numberOnline, setNumberOnline] = useState(0);
  const { addToast } = useToasts();

  useEffect(() => {
    // Wake up Heroku server
    let retry;
    const wakeupServer = async () => {
      try {
        const data = await ping();
        if (data?.status === 200) {
          addToast("Connected to Server", { appearance: "success" });
          clearTimeout(retry);
          console.clear();
        } else {
          retry = setTimeout(wakeupServer, 2000);
          addToast("Heroku's still asleep. Retrying....", {
            appearance: "error",
          });
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (!localStorage.token && !localStorage.user) wakeupServer();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // Check if a user connects or disconnects every 1.25 seconds
    // if true refreshContacts
    // But only if current user is logged in
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
      {!authenticated && <UserForm />}
      {authenticated && <Sidebar users={userList} />}
      {authenticated && <Main user={user} activeUserId={activeUserId} />}
    </div>
  );
};

export default App;
