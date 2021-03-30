import React, { useRef, useEffect } from "react";
import "./Chats.css";

const Chat = ({ message }) => {
  const { text, is_user_msg } = message;
  return (
    <span className={`Chat ${is_user_msg ? "is-user-msg" : ""}`}>{text}</span>
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
    <div className="Chats" ref={chatsRef}>
      {messages.map((message) => (
        <Chat message={message} key={message.number} />
      ))}
    </div>
  );
};

export default Chats;
