import "./Cat.css";
import catImage from "./assets/assets/CAT.png";
import Response from "./Response";
import LoadingIcon from "./LoadingIcon";

import { useEffect, useRef, useState } from "react";

function CatGpt() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [messages, setMessages] = useState([]);
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const buttonStyle = {
    backgroundColor: "#10a37f",
  };



  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleClick = () => {
    setShow(true);
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!inputValue) return;

    // Add user message to the messages array
    setMessages([...messages, { sender: "user", text: inputValue }]);
    setIsLoading(true);

    // Get AI response
    const aiResponse = await getAIResponse(inputValue);
    setIsLoading(false);
    // Add AI response to the messages array
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "ai", text: aiResponse },
    ]);

    setInputValue("");
  };

  const getAIResponse = async (userMessage) => {
    try {
      const response = await fetch("http://localhost:3001/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userMessage }),
      });

      const data = await response.json();
      return data.aiMessage;
    } catch (error) {
      console.error("Error:", error);
      return "Failed to get response from AI";
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();

    // Check if the credentials are correct
    if (username === "TAKE" && password === "RZV") {
      setLoggedIn(true);
    } else {
      alert("Incorrect username or password. Please try again.");
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const loginForm = (
    <form onSubmit={handleLogin} style={buttonStyle}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={handleUsernameChange}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
      />
      <button type="submit">Login</button>
    </form>
  );
  //CHAT COMPONENT
  const chatComponent = (
    <div id="app">
      {show && (
        <div id="chat_container">
          {messages.map((msg, index) => (
            <Response key={index} sender={msg.sender} message={msg.text} />
          ))}
          {isLoading && <LoadingIcon />} // Display LoadingIcon when loading
          <div ref={chatContainerRef}></div>
        </div>
      )}
      <form onSubmit={handleSubmit} id="form">
        <textarea
          name="prompt"
          rows="1"
          cols="1"
          value={inputValue}
          onChange={handleChange}
          placeholder="ASK CAT AI..."
        ></textarea>
        <button type="submit" onClick={handleClick} style={buttonStyle}>
          <img src={catImage} alt="CAT" />
        </button>
      </form>
    </div>
  );

  return (
    <div id="app" >
      {loggedIn ? chatComponent : loginForm}
    </div>
  );
}

export default CatGpt;
