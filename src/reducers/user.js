import { SET_USER } from "../constants";

export default function userList(
  state = localStorage.user != null ? JSON.parse(localStorage.user) : {},
  action
) {
  switch (action.type) {
    case SET_USER:
      return action.payload;
    default:
      return state;
  }
}
