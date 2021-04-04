import React, { useRef, useEffect } from "react";
import moment from "moment";
import "./Chats.css";

const Chat = ({ chat }) => {
  const { message, is_user_msg, created } = chat;
  return (
    <>
      <span
        className="time-stamp"
        style={{ marginLeft: is_user_msg ? "auto" : null }}
      >
        {moment(created).fromNow()}
      </span>
      <span className={`Chat ${is_user_msg ? "is-user-msg" : ""}`}>
        {message}
      </span>
    </>
  );
};

const Chats = ({ messages }) => {
  const chatsRef = useRef();
  useEffect(() => {
    const scrollToBottom = () =>
      (chatsRef.current.scrollTop = chatsRef.current.scrollHeight);
    scrollToBottom();
  }, [messages]);

  return (
    <div
      className="Chats"
      ref={chatsRef}
      onClick={() => console.log("MESSAGES", messages)}
    >
      {messages.map((message) => (
        <Chat chat={message} key={message._id} />
      ))}
    </div>
  );
};

export default Chats;
