import React, { useEffect, useState } from "react";
import "./Chat.css";

import closeIcon from "../images/closeIcon.png";
import sendLogo from "../images/send.png";
import { user } from "../Join/Join.js";
import ReactScrollToBottom from "react-scroll-to-bottom";
import socketIo from "socket.io-client";

let socket;
const ENDPOINT = "http://localhost:4500";




const Chat = () => {
  const [id, setId] = useState("");
  const [messages, setMessages] = useState([]);

const send=()=>{
  const message=document.getElementById('chatInput').value;
//  console.log(message);
//  console.log(socket.id)
 const tid=socket.id;
  socket.emit('message', {message,tid})
  document.getElementById("chatInput").value="";
}

  useEffect(() => {
    socket = socketIo(ENDPOINT, { transports: ["websocket"] });//uppar initiate karna varna double printing
     
    socket.on("connect", () => {
      alert("Connected");
      // console.log(socket);
      // console.log(socket.id);

      // eslint-disable-next-line no-unused-expressions
      setId[socket.id];
    });
     

   
    socket.emit("joined", { user });

    socket.on("welcome", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });
    socket.on("userJoined", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });
     socket.on("leave", (data) => {
       setMessages([...messages, data]);
       console.log(data.user, data.message);
     });
    return () => {
     socket.disconnect();
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      // setMessages([...messages, data]);
      // console.log(data);
      console.log(data.user, data.message, data.tid);
    },);
    return () => {
      // cleanup;
      socket.off();
    };
  }, []);

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header">
          <h2> Chat</h2>
          <a href="/">
            {" "}
            <img src={closeIcon} alt="Close" />
          </a>
          {/* <h1>{user}</h1> */}
        </div>
        <div className="inputBox">
          <input
            onKeyPress={(event) => (event.key === "Enter" ? send() : null)}
            type="text"
            id="chatInput"
          />
          <div className="chatBox">
           
          </div>
          {/* <ReactScrollToBottom className="chatBox">
            {messages.map((item, i) => (
                {item}
            ))}
          </ReactScrollToBottom> */}
          <button onClick={send} className="sendBtn">
            <img src={sendLogo} alt="Send" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
