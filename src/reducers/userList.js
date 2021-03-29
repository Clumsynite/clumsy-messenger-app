import { REFRESH_USERLIST } from "../constants";

const user = localStorage.user != null ? JSON.parse(localStorage.user) : {};

export default function userList(state = [], action) {
  switch (action.type) {
    case REFRESH_USERLIST:
      if (action.payload.length > 0 && user._id !== undefined) {
        return action.payload.filter((contact) => contact._id !== user._id);
      }
      return action.payload;
    default:
      return state;
  }
}
