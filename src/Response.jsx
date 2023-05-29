import React from "react";
import "./Response.css";
import UseIcon from "./assets/assets/user.svg"
import BotIcon from "./assets/assets/CAT.png"

const Response = ({ sender, message }) => {
  const isUser = sender === "user";

  return (
    <div className={`response ${isUser ? "user" : "ai"}`}>
      <div className="response-profile">
        <img
          src={isUser ? UseIcon : BotIcon}
          alt={sender}
        />
      </div>
      <div className="response-message">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Response;
