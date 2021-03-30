import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";

import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

import "./UserForm.css";

const UserForm = () => {
  const [flipped, setFlipped] = useState(false);
  const handleFlip = (e) => {
    e.preventDefault();
    setFlipped(!flipped);
  };

  return (
    <div className="container">
      <h1 className="text-center fw-light py-3 shadow-sm mb-4">
        <span className="fw-bold">Clumsy Messenger</span> A Realtime Messaging App
      </h1>
      <ReactCardFlip isFlipped={flipped} flipDirection="vertical">
        <LoginForm handleFlip={handleFlip} />
        <SignupForm handleFlip={handleFlip} />
      </ReactCardFlip>
    </div>
  );
};

export default UserForm;
