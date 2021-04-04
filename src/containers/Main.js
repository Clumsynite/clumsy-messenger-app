import React from "react";

import Empty from "../components/Empty";
import ChatWindow from "../components/ChatWindow";

import "./Main.css";

const Main = ({ user, activeUserId, userList }) => {
  const renderMainContent = () => {
    if (!activeUserId || userList.length === 0) {
      return <Empty user={user} activeUserId={activeUserId} />;
    } else {
      return <ChatWindow activeUserId={activeUserId} />;
    }
  };
  return <main className="Main">{renderMainContent()}</main>;
};

export default Main;
