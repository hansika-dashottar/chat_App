import React, { useState, useEffect } from "react";
import "./ChatApp.css";
import io from "socket.io-client";

const socket = io("http://192.168.101.89:4000", {
  transports: ["websocket"],
});

function ChatApp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [receiver, setReceiver] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch("http://192.168.101.89:4000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  
    
    const handleReceiveMessage = (data) => {
      console.log("Message received:", data , typeof (data));
      setMessages((prevMessages) => [...prevMessages, data]); 
    };
  
    socket.on("receiveMessage", handleReceiveMessage);
  
    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, []);
  

  useEffect(() => {
    if (loggedIn) {
      socket.emit("registerUser", email); 
    }
  }, [loggedIn]);

  const handleSignup = async () => {
    const response = await fetch("http://192.168.101.89:4000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await response.json();
    console.log(data.message);
  };

  const handleLogin = async () => {
    const response = await fetch("http://192.168.101.89:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (data.username) {
      setUsername(data.username);
      setLoggedIn(true);
    }
    console.log(data.message);
  };

  const handleSendMessage = () => {
    const messageData = {
      receiverID: receiver,
      text: message,
      senderName: username,
    };

    
    socket.emit("sendMessage", messageData);

    setMessage("");
  };

  return (
    <div className="chat-container">
      {!loggedIn ? (
        <div className="welcome-container">
          <h2>Signup</h2>
          <div className="form-container">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleSignup}>Sign Up</button>
            <h2>Login</h2>
            <button onClick={handleLogin}>Login</button>
          </div>
        </div>
      ) : (
        <div className="main-container">
          <div className="user-list">
            <h3>Users</h3>
            <ul>
              {users.map((user) => (
                <li
                  key={user.id}
                  onClick={() => setReceiver(user.email)}
                  className={`user ${receiver === user.email ? "active" : ""}`}
                >
                  {user.email}
                </li>
              ))}
            </ul>
          </div>
          <div className="chat-screen">
            <h3>Chat with {receiver}</h3>
            <div className="messages">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={
                    msg.senderName === username
                      ? "message-sender"
                      : "message-receiver"
                  }
                >
                  <strong>{msg.senderName}: </strong> {msg.text}
                </div>
              ))}
            </div>
            <div className="chat-input">
              <input
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatApp;



