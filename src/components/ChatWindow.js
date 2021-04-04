import React, { useEffect, useState } from "react";
import _ from "lodash";

import Header from "./Header";
import Chats from "./Chats";
import MessageInput from "./MessageInput";

import store from "../store";
import "./ChatWindow.css";

import { readMessages } from "../api";
// import { setMessages } from "../actions";
// import user from "../reducers/messages";

const ChatWindow = ({ activeUserId }) => {
  const state = store.getState();
  const { userList, typing, user } = state;
  const [messages, setMessages] = useState([]);

  const activeUser = _.filter(userList, (user) => user._id === activeUserId)[0];
  useEffect(() => {
    const getMessages = async () => {
      try {
        const data = await readMessages();
        const messageList = _.filter(
          data.messages,
          (obj) => obj.from === activeUser._id || obj.to === activeUser._id
        );
        messageList.map(
          (message) => (message.is_user_msg = message.from === user._id)
        );
        if (messages.length !== messageList) setMessages(messageList);
      } catch (error) {
        console.error(error);
      }
    };
    getMessages();

    return setMessages([]);
    // eslint-disable-next-line
  }, [activeUserId]);

  return (
    <div className="ChatWindow">
      <Header user={activeUser} />
      <Chats messages={messages} />
      <MessageInput value={typing} activeUser={activeUser} />
    </div>
  );
};

export default ChatWindow;
