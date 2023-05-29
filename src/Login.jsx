import React, { useState } from "react";
import "./Login.css";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(username, password);
  };

  const elemStyle = {
    backgroundColor: "#10a37f",
    color: "#fff",
  };

  return (
    <div>
      <h1 style={elemStyle}>Login</h1>
      <form onSubmit={handleSubmit}>
        <label style={elemStyle}>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <label style={elemStyle}>
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
