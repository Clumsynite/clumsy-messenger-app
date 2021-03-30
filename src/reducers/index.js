import { combineReducers } from "redux";

import authenticated from "./authenticated";
import userList from "./userList";
import user from "./user";
import typing from "./typing";
import messages from "./messages";
import activeUserId from "./activeUserId";

export default combineReducers({
  authenticated,
  userList,
  user,
  typing,
  messages,
  activeUserId,
});
