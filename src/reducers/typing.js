import { SET_TYPING_VALUE, SET_MESSAGES } from "../constants";

export default function typing(state = "", action) {
  switch (action.type) {
    case SET_TYPING_VALUE:
      return action.payload;
    case SET_MESSAGES:
      return "";
    default:
      return state;
  }
}
