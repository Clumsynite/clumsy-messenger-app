import React, { useEffect } from "react";
import _ from "lodash";

import Header from "./Header";
import Chats from "./Chats";
import MessageInput from "./MessageInput";

import store from "../store";
import "./ChatWindow.css";

import { readMessages } from "../api";
import { setMessages } from "../actions";

const ChatWindow = ({ activeUserId }) => {
  const state = store.getState();
  const { userList, typing, messages } = state;
  const activeUser = _.filter(userList, (user) => user._id === activeUserId)[0];
  useEffect(() => {
    const getMessages = async () => {
      try {
        const data = await readMessages();
        const messageList = _.filter(
          data.messages,
          (obj) => obj.from === activeUserId || obj.to === activeUserId
        );
        if (messages.length !== messageList) setMessages(messageList);
      } catch (error) {
        console.error(error);
      }
    };

    getMessages();
  }, [messages]);
  // const activeMsgs = useMemo(() => state.messages[activeUserId], [
  //   state,
  //   activeUserId,
  // ]);
  // const activeMessages = useMemo(() => _.values(activeMsgs), [activeMsgs]);

  return (
    <div className="ChatWindow">
      <Header user={activeUser} />
      <Chats messages={messages} />
      <MessageInput value={typing} activeUser={activeUser} />
    </div>
  );
};

export default ChatWindow;
