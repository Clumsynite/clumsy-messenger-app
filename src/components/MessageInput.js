import React from "react";
import store from "../store";
import { setTypingValue, sendMessage } from "../actions";
import "./MessageInput.css";

const MessageInput = ({ value }) => {
  const state = store.getState();

  const handleChange = (e) => {
    store.dispatch(setTypingValue(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { typing, activeUserId } = state;
    store.dispatch(sendMessage(typing, activeUserId));
    
  };

  return (
    <form className="Message" onSubmit={handleSubmit}>
      <input
        type="text"
        className="Message__input"
        value={value}
        onChange={handleChange}
        placeholder="Write a Message..."
      />
    </form>
  );
};
export default MessageInput;
