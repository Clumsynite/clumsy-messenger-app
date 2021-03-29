import { combineReducers } from "redux";

import authenticated from "./authenticated";
import userList from "./userList";
import user from "./user";

export default combineReducers({ authenticated, userList, user });
