import React from "react";
import _ from "lodash";

import Header from "./Header";
import Chats from "./Chats";
import MessageInput from "./MessageInput";

import store from "../store";
import "./ChatWindow.css";

const ChatWindow = ({ activeUserId }) => {
  const state = store.getState();
  const { userList, typing } = state;
  const activeUser = _.filter(userList, (user) => user._id === activeUserId)[0];
  // const activeMsgs = useMemo(() => state.messages[activeUserId], [
  //   state,
  //   activeUserId,
  // ]);
  // const messages = useMemo(() => _.values(activeMsgs), [activeMsgs]);
  const messages = [];

  return (
    <div className="ChatWindow">
      <Header user={activeUser} />
      <Chats messages={messages} />
      <MessageInput value={typing} />
    </div>
  );
};

export default ChatWindow;
