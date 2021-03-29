import { SET_AUTHENTICATED } from "../constants";

export default function authenticated(
  state = localStorage.user != null,
  action
) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return action.payload;
    default:
      return state;
  }
}
