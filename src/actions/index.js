import {
  SET_AUTHENTICATED,
  REFRESH_USERLIST,
  SET_USER,
  SET_ACTIVE_USER_ID,
  SET_TYPING_VALUE,
  SET_MESSAGES,
} from "../constants";

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

export const setActiveUserId = (id) => ({
  type: SET_ACTIVE_USER_ID,
  payload: id,
});

export const setTypingValue = (value) => ({
  type: SET_TYPING_VALUE,
  payload: value,
});

export const setMessages = (messages) => ({
  type: SET_MESSAGES,
  payload: messages,
});
