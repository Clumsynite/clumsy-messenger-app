import React, { useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import _ from "lodash";
import io from "socket.io-client";

import store from "../store";
import { refreshUserList, setAuthenticated, setUser } from "../actions";

import { ping, otherUsers, url } from "../api";

import UserForm from "./UserForm";
import Sidebar from "./Sidebar";
import Main from "./Main";

import "./App.css";

export let socket = io(url);

const App = () => {
  const { authenticated, userList, user, activeUserId } = store.getState();
  const { addToast } = useToasts();

  useEffect(() => {
    socket.emit("connect user", user._id);
    const cookieName = "auth";
    document.cookie = cookieName + "=123";
    if (document.cookie.indexOf(cookieName + "=") === -1) {
      return true;
    } else {
      localStorage.clear();
      store.dispatch(setAuthenticated());
      store.dispatch(setUser());
      return false;
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    socket.on("refreshUsers", () => {
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
    });
  }, []);

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
  }, []);

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

  return (
    <div className="App">
      {!authenticated && <UserForm />}
      {authenticated && <Sidebar users={userList} />}
      {authenticated && (
        <Main user={user} activeUserId={activeUserId} userList={userList} />
      )}
    </div>
  );
};

export default App;
