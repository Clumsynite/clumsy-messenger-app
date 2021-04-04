import React, { useState } from "react";
import store from "../store"; // npm install --save-dev @iconify/react @iconify-icons/carbon
import { Icon } from "@iconify/react";
import sendFilled from "@iconify-icons/carbon/send-filled";
import { useToasts } from "react-toast-notifications";

import { setTypingValue } from "../actions";
import { newMessage } from "../api";
import "./MessageInput.css";

const MessageInput = ({ value, activeUser }) => {
  const { user } = store.getState();
  const [spinner, setSpinner] = useState(false);

  const { addToast } = useToasts();

  const handleChange = (e) => {
    store.dispatch(setTypingValue(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      from: user._id,
      to: activeUser._id,
      message: value.trim(),
    };
    try {
      setSpinner(true);
      const data = await newMessage(message);
      setSpinner(false);
      if (data.success) {
        store.dispatch(setTypingValue(""));
      } else if (data.message && data.name) {
        addToast(data.message, { appearance: "error" });
      } else if (!data.success) {
        console.error(data.message);
        addToast(data.error, { appearance: "error" });
      }
    } catch (error) {
      setSpinner(false);
      console.error("Caught Error", error.message);
    }
  };

  return (
    <form className="Message" onSubmit={handleSubmit}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <input
          type="text"
          className="Message__input"
          value={value}
          onChange={handleChange}
          placeholder="Write a Message..."
        />
        <button
          type="submit"
          className="btn btn-light"
          disabled={spinner}
          style={{ backgroundColor: "#F0FFFF" }}
        >
          {spinner ? (
            <div
              className="spinner-border text-dark spinner-border-sm"
              role="status"
              style={{ width: 24, height: 24 }}
            >
              <span className="visually-hidden">Sending Message...</span>
            </div>
          ) : (
            <Icon icon={sendFilled} width={30} height={30} color={"#262626"} />
          )}
        </button>
      </div>
    </form>
  );
};
export default MessageInput;
