import React from "react";

import UserCard from "../components/UserCard";
import SidebarOptions from '../components/SidebarOptions'

import "./Sidebar.css";

const Sidebar = ({ users, socket }) => {
  return (
    <aside className="Sidebar">
      {users.map((user) => (
        <UserCard user={user} key={user._id} />
      ))}
      <SidebarOptions socket={socket} />
    </aside>
  );
};

export default Sidebar;
