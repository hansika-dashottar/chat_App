

// // Initialize Socket.IO client
// const socket = io("http://192.168.101.32:4000");

// const ChatApp = () => {
//   const [username, setUsername] = useState(""); // User's name
//   const [roomID, setRoomID] = useState(""); // Room ID
//   const [message, setMessage] = useState(""); // Message input
//   const [messages, setMessages] = useState([]); // Chat history
//   const [isInRoom, setIsInRoom] = useState(false); // Track if user is in a room
//   const [createdRoomID, setCreatedRoomID] = useState(""); // Store generated room ID

//   // Listen for incoming events from the backend
//   useEffect(() => {
//     // Event: New message received
//     socket.on("receiveMessage", (newMessage) => {
//       if (newMessage.sender !== username) {
//         setMessages((prevMessages) => [...prevMessages, newMessage]);
//       }
//     });

//     // Event: System messages
//     socket.on("message", (systemMessage) => {
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { sender: "System", text: systemMessage },
//       ]);
//     });

//     // Event: Room created
//     socket.on("roomCreated", ({ roomID, username }) => {
//       console.log("Room created successfully:", { roomID, username });
//       setCreatedRoomID(roomID);
//       setRoomID(roomID);
//       setIsInRoom(true);
//     });

//     // Event: Room joined
//     socket.on("roomJoined", ({ roomID, username }) => {
//       console.log(`${username} joined room: ${roomID}`);
//       setRoomID(roomID);
//       setIsInRoom(true);
//     });

//     // Event: Error messages
//     socket.on("errorMessage", (error) => {
//       alert(error);
//     });

//     // Cleanup listeners on component unmount
//     return () => {
//       socket.off("receiveMessage");
//       socket.off("message");
//       socket.off("roomCreated");
//       socket.off("roomJoined");
//       socket.off("errorMessage");
//     };
//   }, [username]);

//   // Function: Create a new room
//   const createRoom = () => {
//     if (username.trim()) {
//       console.log("Requesting room creation for:", username);
//       socket.emit("createRoom", username);
//     } else {
//       alert("Please enter your name first.");
//     }
//   };

//   // Function: Join an existing room
//   const joinRoom = () => {
//     if (username.trim() && roomID.trim()) {
//       console.log(`Requesting to join room ${roomID} as ${username}`);
//       socket.emit("joinRoom", { roomID, username });
//     } else {
//       alert("Please enter your name and room ID.");
//     }
//   };

//   // Function: Send a message
//   const sendMessage = () => {
//     if (message.trim() && roomID.trim()) {
//       // Add the message to the sender's local chat history
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { sender: "You", text: message },
//       ]);

//       // Emit the message to the server
//       socket.emit("sendMessage", { roomID, username, message });

//       // Clear the input field
//       setMessage("");
//     }
//   };

//   return (
//     <div className="chat-container">
//       {!isInRoom ? (
//         <div className="room-container">
//           <h2>Enter Your Name</h2>
//           <input
//             type="text"
//             placeholder="Your name"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           <button onClick={createRoom}>Create Room</button>
//           {createdRoomID && (
//             <p>
//               Room Created: <strong>{createdRoomID}</strong>
//             </p>
//           )}
//           <h3>Or Join an Existing Room</h3>
//           <input
//             type="text"
//             placeholder="Room ID"
//             value={roomID}
//             onChange={(e) => setRoomID(e.target.value)}
//           />
//           <button onClick={joinRoom}>Join Room</button>
//         </div>
//       ) : (
//         <>
//           <div className="chat-header">
//             <h2>Room: {roomID}</h2>
//             <p>Logged in as: {username}</p>
//           </div>

//           <div className="chat-messages">
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={
//                   msg.sender === "You"
//                     ? "message-sender"
//                     : msg.sender === "System"
//                     ? "message-system"
//                     : "message-receiver"
//                 }
//               >
//                 <strong>{msg.sender}:</strong> {msg.text}
//               </div>
//             ))}
//           </div>

//           <div className="chat-input">
//             <input
//               type="text"
//               placeholder="Type your message..."
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//             />
//             <button onClick={sendMessage}>Send</button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default ChatApp;


// import React, { useState } from "react";
// import "./ChatApp.css";

// const ChatApp = () => {
//   const [isSignup, setIsSignup] = useState(false);
//   const [isLogin, setIsLogin] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loginEmail, setLoginEmail] = useState("");
//   const [loginPassword, setLoginPassword] = useState("");
//   const [activeUser, setActiveUser] = useState(null);
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState({});
//   const [groupName, setGroupName] = useState("");
//   const [selectedUsers, setSelectedUsers] = useState([]);
//   const [groups, setGroups] = useState([]);
//   const [isCreatingGroup, setIsCreatingGroup] = useState(false);

//   const users = ["Piyush", "Ankita", "Charlie", "David", "Jerry"]; // Dummy user list

//   // Handle signup submission
//   const handleSignupSubmit = () => {
//     if (username.trim() && email.trim() && password.trim()) {
//       alert(`Signup successful for ${username}!`);
//       setIsSignup(false);
//     } else {
//       alert("Please fill all fields for Signup!");
//     }
//   };

//   // Handle login submission
//   const handleLoginSubmit = () => {
//     if (loginEmail.trim() && loginPassword.trim()) {
//       alert(`Login successful for ${loginEmail}!`);
//       setIsLoggedIn(true);
//       setIsLogin(false);
//     } else {
//       alert("Please fill all fields for Login!");
//     }
//   };

//   // Handle sending a message
//   const handleSendMessage = () => {
//     if (message.trim() && (activeUser || groups.length > 0)) {
//       const target = activeUser || groups[activeUser]; // If no active user, chat in group
//       setMessages((prevMessages) => ({
//         ...prevMessages,
//         [target]: [...(prevMessages[target] || []), { sender: "You", text: message }],
//       }));
//       setMessage("");
//     }
//   };

//   // Handle group creation
//   const handleCreateGroup = () => {
//     if (groupName.trim() && selectedUsers.length > 0) {
//       const newGroup = { groupName, users: selectedUsers };
//       setGroups([...groups, newGroup]);
//       setIsCreatingGroup(false);
//       setGroupName("");
//       setSelectedUsers([]);
//     } else {
//       alert("Please provide a group name and select users.");
//     }
//   };

//   return (
//     <div className="chat-container">
//       {!isLoggedIn ? (
//         <>
//           {!isSignup && !isLogin ? (
//             <div className="welcome-container">
//               <h1>Welcome to ChatApp</h1>
//               <div className="button-group">
//                 <button onClick={() => setIsSignup(true)}>Signup</button>
//                 <button onClick={() => setIsLogin(true)}>Login</button>
//               </div>
//             </div>
//           ) : isSignup ? (
//             <div className="form-container">
//               <h2>Signup</h2>
//               <input
//                 type="text"
//                 placeholder="Enter your name"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//               />
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <input
//                 type="password"
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <button onClick={handleSignupSubmit}>Submit</button>
//             </div>
//           ) : (
//             <div className="form-container">
//               <h2>Login</h2>
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 value={loginEmail}
//                 onChange={(e) => setLoginEmail(e.target.value)}
//               />
//               <input
//                 type="password"
//                 placeholder="Enter your password"
//                 value={loginPassword}
//                 onChange={(e) => setLoginPassword(e.target.value)}
//               />
//               <button onClick={handleLoginSubmit}>Submit</button>
//             </div>
//           )}
//         </>
//       ) : (
//         <div className="main-container">
//           <div className="user-list">
//             <h3>Users</h3>
//             {users.map((user) => (
//               <div
//                 key={user}
//                 className={`user ${activeUser === user ? "active" : ""}`}
//                 onClick={() => setActiveUser(user)}
//               >
//                 {user}
//               </div>
//             ))}
//             <button onClick={() => setIsCreatingGroup(true)}>Create Group</button>
//           </div>
//           <div className="chat-screen">
//             {isCreatingGroup && (
//               <div className="group-creation">
//                 <h3>Create a Group</h3>
//                 <input
//                   type="text"
//                   placeholder="Group Name"
//                   value={groupName}
//                   onChange={(e) => setGroupName(e.target.value)}
//                 />
//                 <div className="user-selection">
//                   {users.map((user) => (
//                     <div key={user}>
//                       <input
//                         type="checkbox"
//                         checked={selectedUsers.includes(user)}
//                         onChange={() =>
//                           setSelectedUsers((prev) =>
//                             prev.includes(user)
//                               ? prev.filter((u) => u !== user)
//                               : [...prev, user]
//                           )
//                         }
//                       />
//                       {user}
//                     </div>
//                   ))}
//                 </div>
//                 <button onClick={handleCreateGroup}>Create Group</button>
//               </div>
//             )}

//             {activeUser || groups.length > 0 ? (
//               <>
//                 <h3>{activeUser ? `Chat with ${activeUser}` : "Chat in Group"}</h3>
//                 <div className="messages">
//                   {(messages[activeUser] || []).map((msg, index) => (
//                     <div key={index} className={msg.sender === "You" ? "message-sender" : "message-receiver"}>
//                       <strong>{msg.sender}:</strong> {msg.text}
//                     </div>
//                   ))}
//                 </div>
//                 <div className="chat-input">
//                   <input
//                     type="text"
//                     placeholder="Type a message"
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                   />
//                   <div className="chat-button">
//                     <button onClick={handleSendMessage}>Send</button>
//                   </div>
//                 </div>
//               </>
//             ) : (
//               <h3>Select a user or group to start chatting</h3>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatApp;


// import React, { useState, useEffect } from "react";
// import "./ChatApp.css";
// import io from "socket.io-client";

// const ChatApp = () => {
//   const [isSignup, setIsSignup] = useState(false);
//   const [isLogin, setIsLogin] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [activeUser, setActiveUser] = useState(null);
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState({});
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [showGroupModal, setShowGroupModal] = useState(false);
//   const [selectedUsers, setSelectedUsers] = useState([]);
//   const [groups, setGroups] = useState([]);
//   const [socket, setSocket] = useState(null); // State to hold the socket connection

//   // Socket.io server URL (replace this with your backend IP and port)
//   const serverUrl = "http://192.168.101.32:4000"; // Example: http://192.168.0.1:5000

//   useEffect(() => {
//     // Fetch users
//     const fetchUsers = async () => {
//       try {
//         const response = await fetch(
//           "https://675914d260576a194d130185.mockapi.io/api/v1/Users"
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch users");
//         }
//         const data = await response.json();
//         setUsers(data);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchUsers();

//     // Initialize socket.io connection
//     const socketInstance = io(serverUrl);
//     setSocket(socketInstance);

//     socketInstance.on("connect", () => {
//       console.log("Socket.io connected");
//     });

//     // Listen for incoming messages
//     socketInstance.on("receive_message", (msgData) => {
//       if (msgData && msgData.user === activeUser) {
//         setMessages((prevMessages) => ({
//           ...prevMessages,
//           [activeUser]: [
//             ...(prevMessages[activeUser] || []),
//             { sender: msgData.sender, text: msgData.text },
//           ],
//         }));
//       }
//     });

//     return () => {
//       socketInstance.disconnect(); // Disconnect on cleanup
//     };
//   }, [serverUrl, activeUser]);

//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const validatePassword = (password) => {
//     return password.length >= 6;
//   };

//   const handleSignupSubmit = () => {
//     if (!username.trim()) {
//       alert("Username is required!");
//       return;
//     }
//     if (!email.trim() || !validateEmail(email)) {
//       alert("Please enter a valid email address!");
//       return;
//     }
//     if (!password.trim() || !validatePassword(password)) {
//       alert("Password must be at least 6 characters long!");
//       return;
//     }
//     alert(`Signup successful for ${username}!`);
//     setIsSignup(false);
//   };

//   const handleLoginSubmit = () => {
//     if (!email.trim() || !validateEmail(email)) {
//       alert("Please enter a valid email address!");
//       return;
//     }
//     if (!password.trim() || !validatePassword(password)) {
//       alert("Password must be at least 6 characters long!");
//       return;
//     }
//     alert(`Login successful for ${email}!`);
//     setIsLoggedIn(true);
//     setIsLogin(false);
//   };

//   const handleSendMessage = () => {
//     if (message.trim() && activeUser && socket) {
//       const msgData = { user: activeUser, sender: "You", text: message };
//       socket.emit("send_message", msgData); // Send the message to backend using socket.io
//       setMessages((prevMessages) => ({
//         ...prevMessages,
//         [activeUser]: [
//           ...(prevMessages[activeUser] || []),
//           { sender: "You", text: message },
//         ],
//       }));
//       setMessage("");
//     }
//   };

//   const toggleUserSelection = (userId) => {
//     setSelectedUsers((prevSelected) =>
//       prevSelected.includes(userId)
//         ? prevSelected.filter((id) => id !== userId)
//         : [...prevSelected, userId]
//     );
//   };

//   const handleCreateGroup = () => {
//     if (selectedUsers.length > 0) {
//       setGroups((prevGroups) => [
//         ...prevGroups,
//         { id: groups.length + 1, members: selectedUsers },
//       ]);
//       alert("Group created successfully!");
//       setSelectedUsers([]);
//       setShowGroupModal(false);
//     } else {
//       alert("Please select at least one user to create a group!");
//     }
//   };

//   return (
//     <div className="chat-container">
//       {!isLoggedIn ? (
//         <>
//           {!isSignup && !isLogin ? (
//             <div className="welcome-container">
//               <h1>Welcome to ChatApp</h1>
//               <div className="button-group">
//                 <button onClick={() => setIsSignup(true)}>Signup</button>
//                 <button onClick={() => setIsLogin(true)}>Login</button>
//               </div>
//             </div>
//           ) : isSignup ? (
//             <div className="form-container">
//               <h2>Signup</h2>
//               <input
//                 type="text"
//                 placeholder="Enter your name"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//               />
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <input
//                 type="password"
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <button onClick={handleSignupSubmit}>Submit</button>
//             </div>
//           ) : (
//             <div className="form-container">
//               <h2>Login</h2>
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <input
//                 type="password"
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <button onClick={handleLoginSubmit}>Submit</button>
//             </div>
//           )}
//         </>
//       ) : (
//         <div className="main-container">
//           <div className="user-list">
//             <h3>Users</h3>
//             {loading ? (
//               <p>Loading...</p>
//             ) : error ? (
//               <p style={{ color: "red" }}>{error}</p>
//             ) : (
//               users.map((user) => (
//                 <div
//                   key={user.id}
//                   className={`user ${
//                     activeUser === user.id ? "active" : ""
//                   }`}
//                   onClick={() => setActiveUser(user.id)}
//                 >
//                   {user.name}
//                 </div>
//               ))
//             )}
//             <button onClick={() => setShowGroupModal(true)}>Create Group</button>
//           </div>

//           <div className="chat-screen">
//             {activeUser ? (
//               <>
//                 <h3>Chat with {activeUser}</h3>
//                 <div className="messages">
//                   {(messages[activeUser] || []).map((msg, index) => (
//                     <div
//                       key={index}
//                       className={
//                         msg.sender === "You"
//                           ? "message-sender"
//                           : "message-receiver"
//                       }
//                     >
//                       <strong>{msg.sender}:</strong> {msg.text}
//                     </div>
//                   ))}
//                 </div>
//                 <div className="chat-input">
//                   <input
//                     type="text"
//                     placeholder="Type a message"
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                   />
//                   <button onClick={handleSendMessage}>Send</button>
//                 </div>
//               </>
//             ) : (
//               <h3>Select a user to start chatting</h3>
//             )}
//           </div>

//           {showGroupModal && (
//             <div className="modal">
//               <h3>Create a Group</h3>
//               {users.map((user) => (
//                 <div key={user.id}>
//                   <label>
//                     <input
//                       type="checkbox"
//                       checked={selectedUsers.includes(user.id)}
//                       onChange={() => toggleUserSelection(user.id)}
//                     />
//                     {user.name}
//                   </label>
//                 </div>
//               ))}
//               <button onClick={handleCreateGroup}>Create Group</button>
//               <button onClick={() => setShowGroupModal(false)}>Cancel</button>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatApp;



// import React, { useState, useEffect } from "react";
// import "./ChatApp.css";
// import io from "socket.io-client";

// const ChatApp = () => {
//   const [isSignup, setIsSignup] = useState(false);
//   const [isLogin, setIsLogin] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [activeUser, setActiveUser] = useState(null);
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState({});
//   const [users, setUsers] = useState([]); // User list fetched from backend after login
//   const [error, setError] = useState("");
//   const [showGroupModal, setShowGroupModal] = useState(false);
//   const [selectedUsers, setSelectedUsers] = useState([]);
//   const [groups, setGroups] = useState([]);
//   const [socket, setSocket] = useState(null);

//   const serverUrl = "http://192.168.101.32:4000"; // Your backend server URL

//   useEffect(() => {
//     if (isLoggedIn) {
//       // Initialize socket connection
//       const socketInstance = io(serverUrl);
//       setSocket(socketInstance);

//       socketInstance.on("connect", () => {
//         console.log("Socket.io connected");
//       });

//       // Listen for incoming messages
//       socketInstance.on("receive_message", (msgData) => {
//         if (msgData && msgData.user === activeUser) {
//           setMessages((prevMessages) => ({
//             ...prevMessages,
//             [activeUser]: [
//               ...(prevMessages[activeUser] || []),
//               { sender: msgData.sender, text: msgData.text },
//             ],
//           }));
//         }
//       });

//       return () => {
//         socketInstance.disconnect(); // Cleanup on unmount
//       };
//     }
//   }, [serverUrl, isLoggedIn, activeUser]);

//   const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//   const validatePassword = (password) => password.length >= 6;

//   const handleSignupSubmit = async () => {
//     if (!username.trim()) {
//       alert("Username is required!");
//       return;
//     }
//     if (!email.trim() || !validateEmail(email)) {
//       alert("Please enter a valid email address!");
//       return;
//     }
//     if (!password.trim() || !validatePassword(password)) {
//       alert("Password must be at least 6 characters long!");
//       return;
//     }

//     try {
//       const response = await fetch(`${serverUrl}/signup`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, email, password }),
//       });

//       if (!response.ok) {
//         throw new Error("Signup failed. Please try again.");
//       }

//       alert("Signup successful! Please login to continue.");
//       setIsSignup(false);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleLoginSubmit = async () => {
//     if (!email.trim() || !validateEmail(email)) {
//       alert("Please enter a valid email address!");
//       return;
//     }
//     if (!password.trim() || !validatePassword(password)) {
//       alert("Password must be at least 6 characters long!");
//       return;
//     }

//     try {
//       const response = await fetch(`${serverUrl}/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       if (!response.ok) {
//         throw new Error("Login failed. Please check your credentials.");
//       }

//       const data = await response.json();
//       setUsername(data.username); // Set username from backend response
//       setIsLoggedIn(true);
//       setIsLogin(false);

//       // Fetch user list from the backend
//       const usersResponse = await fetch(`${serverUrl}/users`, {
//         headers: {
//           Authorization: `Bearer ${data.token}`, // Assuming backend provides a token
//         },
//       });

//       if (!usersResponse.ok) {
//         throw new Error("Failed to fetch users.");
//       }

//       const usersData = await usersResponse.json();
//       setUsers(usersData);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleSendMessage = () => {
//     if (message.trim() && activeUser && socket) {
//       const msgData = { user: activeUser, sender: "You", text: message };
//       socket.emit("send_message", msgData);
//       setMessages((prevMessages) => ({
//         ...prevMessages,
//         [activeUser]: [
//           ...(prevMessages[activeUser] || []),
//           { sender: "You", text: message },
//         ],
//       }));
//       setMessage("");
//     }
//   };

//   const toggleUserSelection = (userId) => {
//     setSelectedUsers((prevSelected) =>
//       prevSelected.includes(userId)
//         ? prevSelected.filter((id) => id !== userId)
//         : [...prevSelected, userId]
//     );
//   };

//   const handleCreateGroup = () => {
//     if (selectedUsers.length > 0) {
//       setGroups((prevGroups) => [
//         ...prevGroups,
//         { id: groups.length + 1, members: selectedUsers },
//       ]);
//       alert("Group created successfully!");
//       setSelectedUsers([]);
//       setShowGroupModal(false);
//     } else {
//       alert("Please select at least one user to create a group!");
//     }
//   };

//   return (
//     <div className="chat-container">
//       {!isLoggedIn ? (
//         <>
//           {!isSignup && !isLogin ? (
//             <div className="welcome-container">
//               <h1>Welcome to ChatApp</h1>
//               <div className="button-group">
//                 <button onClick={() => setIsSignup(true)}>Signup</button>
//                 <button onClick={() => setIsLogin(true)}>Login</button>
//               </div>
//             </div>
//           ) : isSignup ? (
//             <div className="form-container">
//               <h2>Signup</h2>
//               <input
//                 type="text"
//                 placeholder="Enter your name"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//               />
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <input
//                 type="password"
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <button onClick={handleSignupSubmit}>Submit</button>
//             </div>
//           ) : (
//             <div className="form-container">
//               <h2>Login</h2>
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <input
//                 type="password"
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <button onClick={handleLoginSubmit}>Submit</button>
//             </div>
//           )}
//         </>
//       ) : (
//         <div className="main-container">
//           <div className="user-list">
//             <h3>Users</h3>
//             {error ? (
//               <p style={{ color: "red" }}>{error}</p>
//             ) : (
//               users.map((user) => (
//                 <div
//                   key={user.id}
//                   className={`user ${
//                     activeUser === user.id ? "active" : ""
//                   }`}
//                   onClick={() => setActiveUser(user.id)}
//                 >
//                   {user.name}
//                 </div>
//               ))
//             )}
//             <button onClick={() => setShowGroupModal(true)}>Create Group</button>
//           </div>

//           <div className="chat-screen">
//             {activeUser ? (
//               <>
//                 <h3>Chat with {activeUser}</h3>
//                 <div className="messages">
//                   {(messages[activeUser] || []).map((msg, index) => (
//                     <div
//                       key={index}
//                       className={
//                         msg.sender === "You"
//                           ? "message-sender"
//                           : "message-receiver"
//                       }
//                     >
//                       <strong>{msg.sender}:</strong> {msg.text}
//                     </div>
//                   ))}
//                 </div>
//                 <div className="chat-input">
//                   <input
//                     type="text"
//                     placeholder="Type a message"
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                   />
//                   <button onClick={handleSendMessage}>Send</button>
//                 </div>
//               </>
//             ) : (
//               <h3>Select a user to start chatting</h3>
//             )}
//           </div>

//           {showGroupModal && (
//             <div className="modal">
//               <h3>Create a Group</h3>
//               {users.map((user) => (
//                 <div key={user.id}>
//                   <label>
//                     <input
//                       type="checkbox"
//                       checked={selectedUsers.includes(user.id)}
//                       onChange={() => toggleUserSelection(user.id)}
//                     />
//                     {user.name}
//                   </label>
//                 </div>
//               ))}
//               <button onClick={handleCreateGroup}>Create Group</button>
//               <button onClick={() => setShowGroupModal(false)}>Cancel</button>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatApp;



// import React, { useState, useEffect } from "react";
// import "./ChatApp.css";
// import io from "socket.io-client";

// const ChatApp = () => {
//   const [isSignup, setIsSignup] = useState(false);
//   const [isLogin, setIsLogin] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [activeUser, setActiveUser] = useState(null);
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState({});
//   const [users, setUsers] = useState([]);
//   const [error, setError] = useState("");
//   const [socket, setSocket] = useState(null);

//   // Update the server URL
//   const serverUrl = "http://192.168.101.32:4000";

//   useEffect(() => {
//     if (isLoggedIn) {
//       const socketInstance = io(serverUrl);
//       setSocket(socketInstance);

//       socketInstance.on("connect", () => {
//         console.log("Socket connected:", socketInstance.id);
//       });

//       socketInstance.on("receiveMessage", (msgData) => {
//         if (msgData && msgData.senderID === activeUser) {
//           setMessages((prevMessages) => ({
//             ...prevMessages,
//             [activeUser]: [
//               ...(prevMessages[activeUser] || []),
//               { sender: msgData.senderName, text: msgData.text },
//             ],
//           }));
//         }
//       });

//       return () => {
//         socketInstance.disconnect();
//       };
//     }
//   }, [isLoggedIn, activeUser]);

//   const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//   const validatePassword = (password) => password.length >= 6;

//   const handleSignupSubmit = async () => {
//     if (!username || !email || !password) {
//       alert("All fields are required.");
//       return;
//     }

//     if (!validateEmail(email)) {
//       alert("Invalid email format.");
//       return;
//     }

//     if (!validatePassword(password)) {
//       alert("Password must be at least 6 characters.");
//       return;
//     }

//     try {
//       const response = await fetch(`${serverUrl}/signup`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, email, password }),
//       });

//       if (response.ok) {
//         alert("Signup successful! Please login.");
//         setIsSignup(false);
//       } else {
//         const errorData = await response.json();
//         setError(errorData.message || "Signup failed.");
//       }
//     } catch (err) {
//       setError("Network error occurred. Please try again.");
//     }
//   };

//   const handleLoginSubmit = async () => {
//     if (!email || !password) {
//       alert("Email and password are required.");
//       return;
//     }

//     try {
//       const response = await fetch(`${serverUrl}/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setUsername(data.username);
//         setIsLoggedIn(true);
//         setIsLogin(false);

//         const usersResponse = await fetch(`${serverUrl}/users`);
//         if (usersResponse.ok) {
//           const usersData = await usersResponse.json();
//           setUsers(usersData);
//         }
//       } else {
//         const errorData = await response.json();
//         setError(errorData.message || "Login failed.");
//       }
//     } catch (err) {
//       setError("Network error occurred. Please try again.");
//     }
//   };

//   const handleSendMessage = () => {
//     if (message.trim() && activeUser && socket) {
//       const msgData = {
//         senderID: socket.id,
//         receiverID: activeUser,
//         text: message,
//         senderName: username,
//       };
//       socket.emit("sendMessage", msgData);
//       setMessages((prevMessages) => ({
//         ...prevMessages,
//         [activeUser]: [...(prevMessages[activeUser] || []), { sender: "You", text: message }],
//       }));
//       setMessage("");
//     }
//   };

//   return (
//     <div className="chat-container">
//       {!isLoggedIn ? (
//         <div>
//           <h2>Welcome to ChatApp</h2>
//           {isSignup ? (
//             <div>
//               <h3>Signup</h3>
//               <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
//               <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
//               <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//               <button onClick={handleSignupSubmit}>Signup</button>
//             </div>
//           ) : isLogin ? (
//             <div>
//               <h3>Login</h3>
//               <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
//               <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//               <button onClick={handleLoginSubmit}>Login</button>
//             </div>
//           ) : (
//             <div>
//               <button onClick={() => setIsSignup(true)}>Signup</button>
//               <button onClick={() => setIsLogin(true)}>Login</button>
//             </div>
//           )}
//           {error && <p>{error}</p>}
//         </div>
//       ) : (
//         <div>
//           <h3>ChatApp</h3>
//           <div>
//             <h4>Users</h4>
//             {users.map((user) => (
//               <div key={user.id} onClick={() => setActiveUser(user.id)}>
//                 {user.email}
//               </div>
//             ))}
//           </div>
//           <div>
//             <h4>Messages</h4>
//             <div>
//               {(messages[activeUser] || []).map((msg, index) => (
//                 <div key={index}>{msg.sender}: {msg.text}</div>
//               ))}
//             </div>
//             <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message" />
//             <button onClick={handleSendMessage}>Send</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatApp;




// import React, { useState, useEffect } from "react";
// import "./ChatApp.css";
// import io from "socket.io-client";

// const ChatApp = () => {
//   const [isSignup, setIsSignup] = useState(false);
//   const [isLogin, setIsLogin] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [activeUser, setActiveUser] = useState(null);
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState({});
//   const [users, setUsers] = useState([]);
//   const [error, setError] = useState("");
//   const [socket, setSocket] = useState(null);

//   const serverUrl = "http://192.168.101.89:4000";

//   useEffect(() => {
//     if (isLoggedIn) {
//       const socketInstance = io(serverUrl);
//       setSocket(socketInstance);

//       socketInstance.on("connect", () => {
//         console.log("Socket connected:", socketInstance.id);
//       });

//       socketInstance.on("receiveMessage", (msgData) => {
//         if (msgData && msgData.senderID === activeUser) {
//           setMessages((prevMessages) => ({
//             ...prevMessages,
//             [activeUser]: [
//               ...(prevMessages[activeUser] || []),
//               { sender: msgData.senderName, text: msgData.text },
//             ],
//           }));
//         }
//       });

//       return () => {
//         socketInstance.disconnect();
//       };
//     }
//   }, [isLoggedIn, activeUser]);

//   const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//   const validatePassword = (password) => password.length >= 6;

//   const handleSignupSubmit = async () => {
//     if (!username || !email || !password) {
//       alert("All fields are required.");
//       return;
//     }

//     if (!validateEmail(email)) {
//       alert("Invalid email format.");
//       return;
//     }

//     if (!validatePassword(password)) {
//       alert("Password must be at least 6 characters.");
//       return;
//     }

//     try {
//       const response = await fetch(`${serverUrl}/signup`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, email, password }),
//       });

//       if (response.ok) {
//         alert("Signup successful! Please login.");
//         setIsSignup(false);
//         setIsLogin(true); // Automatically switch to login after signup
//       } else {
//         const errorData = await response.json();
//         setError(errorData.message || "Signup failed.");
//       }
//     } catch (err) {
//       setError("Network error occurred. Please try again.");
//     }
//   };

//   const handleLoginSubmit = async () => {
//     if (!email || !password) {
//       alert("Email and password are required.");
//       return;
//     }

//     try {
//       const response = await fetch(`${serverUrl}/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setUsername(data.username);
//         setIsLoggedIn(true);
//         setIsLogin(false);

//         const usersResponse = await fetch(`${serverUrl}/users`);
//         if (usersResponse.ok) {
//           const usersData = await usersResponse.json();
//           setUsers(usersData);
//         }
//       } else {
//         const errorData = await response.json();
//         setError(errorData.message || "Login failed.");
//       }
//     } catch (err) {
//       setError("Network error occurred. Please try again.");
//     }
//   };

//   const handleSendMessage = () => {
//     if (message.trim() && activeUser && socket) {
//       const msgData = {
//         senderID: socket.id,
//         receiverID: activeUser,
//         text: message,
//         senderName: username,
//       };
//       socket.emit("sendMessage", msgData);
//       setMessages((prevMessages) => ({
//         ...prevMessages,
//         [activeUser]: [...(prevMessages[activeUser] || []), { sender: "You", text: message }],
//       }));
//       setMessage("");
//     }
//   };

//   return (
//     <div className="chat-container">
//       {!isLoggedIn ? (
//         <div className="welcome-container">
//           <h2>Welcome to ChatApp</h2>
//           {isSignup ? (
//             <div className="form-container">
//               <h3>Signup</h3>
//               <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
//               <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
//               <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//               <button onClick={handleSignupSubmit}>Signup</button>
//               <p>Already have an account? <button onClick={() => setIsSignup(false)}>Login here</button></p>
//             </div>
//           ) : isLogin ? (
//             <div className="form-container">
//               <h3>Login</h3>
//               <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
//               <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//               <button onClick={handleLoginSubmit}>Login</button>
//               <p>Don't have an account? <button onClick={() => setIsSignup(true)}>Sign up here</button></p>
//             </div>
//           ) : (
//             <div>
//               <button onClick={() => setIsSignup(true)}>Signup</button>
//               <button onClick={() => setIsLogin(true)}>Login</button>
//             </div>
//           )}
//           {error && <p>{error}</p>}
//         </div>
//       ) : (
//         <div className="main-container">
//           <div className="user-list">
//             <h3>Users</h3>
//             {users.map((user) => (
//               <div
//                 key={user.id}
//                 className={`user ${activeUser === user.id ? "active" : ""}`}
//                 onClick={() => setActiveUser(user.id)}
//               >
//                 {user.email}
//               </div>
//             ))}
//           </div>
//           <div className="chat-screen">
//             <h3>Chat</h3>
//             <div className="messages">
//               {(messages[activeUser] || []).map((msg, index) => (
//                 <div key={index} className={msg.sender === "You" ? "message-sender" : "message-receiver"}>
//                   {msg.sender}: {msg.text}
//                 </div>
//               ))}
//             </div>
//             <div className="chat-input">
//               <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message" />
//               <button onClick={handleSendMessage}>Send</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatApp;


import React, { useState, useEffect } from "react";
import "./ChatApp.css";
import io from "socket.io-client";

// Socket Connection
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
    // Fetch users from backend
    fetch("http://192.168.101.89:4000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  
    // Listen for incoming messages
    const handleReceiveMessage = (data) => {
      console.log("Message received:", data , typeof (data));
      setMessages((prevMessages) => [...prevMessages, data]); // Update the state with received messages
    };
  
    socket.on("receiveMessage", handleReceiveMessage);
  
    // Cleanup the event listener on unmount
    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, []);
  

  useEffect(() => {
    if (loggedIn) {
      socket.emit("registerUser", email); // Register the current user in socket
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

    // Emit the message via socket
    socket.emit("sendMessage", messageData);

    // Update messages state locally to show the sent message
    //setMessages((prevMessages) => [...prevMessages, messageData]);

    // Clear message input
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



