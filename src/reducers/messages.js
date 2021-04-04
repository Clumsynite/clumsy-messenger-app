import { SET_MESSAGES } from "../constants";

export default function user(state = [], action) {
  switch (action.type) {
    case SET_MESSAGES:
      return action.payload;
    default:
      return state;
  }
}
