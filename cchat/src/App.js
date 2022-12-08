import React from 'react'
import socketIo from "socket.io-client";

const ENDPOINT = 'http://localhost:4500';

const socket=socketIo(ENDPOINT,{transports:['websocket']})


const App = () => {

  socket.on('connect',()=>{
    
  })

  return (
       <h1>Working</h1>
  )
}

export default App