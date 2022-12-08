// //run node server on cmd because powershell is laaagy
// import express from "express";
// import cors from "cors";

// import { createServer } from "http";
// import { Server } from "socket.io";

// const PORT = 4500;
// const app = express();

// app.use(cors());
// app.get("/", (req, res) => {
//   res.send("Real TIme server");
// });
// const httpServer = createServer();
// const io = new Server(httpServer);


// io.on("connection", (socket) => {
//   console.log("New Connetion: ");
// });



import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
const PORT = 4500|| process.env.PORT;
const app = express();
app.use(cors());//cors is used for inter communication between url  Cross-Origin Resource Sharing (CORS)


const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
});
app.get("/", (req, res) => {
  res.send("Real TIme server");
})
io.on("connection", (socket) => {
  console.log("Connection established")
});

httpServer.listen(PORT, () => {
  console.log(`listening on server http://localhost:${PORT}`);
});