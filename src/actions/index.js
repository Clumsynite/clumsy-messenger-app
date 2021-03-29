import { SET_AUTHENTICATED, REFRESH_USERLIST, SET_USER } from "../constants";

export const setAuthenticated = () => ({
  type: SET_AUTHENTICATED,
  payload: localStorage.user != null,
});

export const refreshUserList = (userList = []) => ({
  type: REFRESH_USERLIST,
  payload: userList,
});

export const setUser = () => ({
  type: SET_USER,
  payload: JSON.parse(localStorage.user || "{}"),
});
