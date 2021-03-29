import React, { useEffect } from "react";
import { ToastProvider } from "react-toast-notifications";
import _ from "lodash";

import store from "../store";
import { refreshUserList } from "../actions";
import { allUsers } from "../api";

import UserForm from "./UserForm";
import Sidebar from "./Sidebar";
import Main from "./Main";

import "./App.css";

const App = () => {
  const { authenticated, userList } = store.getState();

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
  }, [authenticated]);

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
