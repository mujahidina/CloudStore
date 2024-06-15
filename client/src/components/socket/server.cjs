const express = require("express");
const http = require("http");
const cors = require("cors");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("server");
});

// socket.io
let imageUrl, roomIdGlobal;

const loadUserModule = async () => {
  const { userJoin, getUsers, userLeave, getUser } = await import("./utils/users.cjs");
  return { userJoin, getUsers, userLeave, getUser };
};

io.on("connection", async (socket) => {
  const { userJoin, getUsers, userLeave, getUser } = await loadUserModule();

  socket.on("user-joined", (data) => {
    const { roomId, userId, userName, host, presenter } = data;
    roomIdGlobal = roomId; // Update roomIdGlobal when a user joins a room
    const user = userJoin(socket.id, userName, roomId, host, presenter);
    const roomUsers = getUsers(user.room);
    socket.join(user.room);
    socket.broadcast.to(user.room).emit("message", {
      message: `${user.username} has joined`,
    });

    io.to(user.room).emit("users", roomUsers);
    io.to(user.room).emit("canvasImage", imageUrl);
  });

  socket.on("drawing", (data) => {
    imageUrl = data;
    socket.broadcast.to(roomIdGlobal).emit("canvasImage", imageUrl);
  });

  socket.on("message", (data) => {
    const { message } = data;
    const user = getUser(socket.id);
    if (user) {
      socket.broadcast.to(roomIdGlobal).emit("messageResponse", { message, name: user.username });
    }
  });

  socket.on("disconnect", () => {
    const userLeaves = userLeave(socket.id);
    const roomUsers = getUsers(roomIdGlobal);

    if (userLeaves) {
      io.to(userLeaves.room).emit("message", {
        message: `${userLeaves.username} left the chat`,
      });
      io.to(userLeaves.room).emit("users", roomUsers);
    }
  });
});

// serve on port
const PORT = process.env.PORT || 5000;

server.listen(PORT, () =>
  console.log(`server is listening on http://localhost:${PORT}`)
);



// const express = require("express");
// const app = express();

// const server = require("http").createServer(app);
// const { Server } = require("socket.io");

// const { addUser, getUser, removeUser } = require("./utils/users.cjs");

// // const { PeerServer } = require("peer");

// // const peerServer = PeerServer({
// //   host:"/".
// //   port: 5001,
// //   path: "/",
// // });

// // app.use(peerServer);

// const io = new Server(server);
// // server.on("upgrade", (request, socket, head) => {});

// // routes
// app.get("/", (req, res) => {
//   res.send(
//     "This is mern realtime board sharing app official server by fullyworld web tutorials"
//   );
// });

// let roomIdGlobal, imgURLGlobal;

// io.on("connection", (socket) => {
//   socket.on("userJoined", (data) => {
//     const { name, userId, roomId, host, presenter } = data;
//     roomIdGlobal = roomId;
//     socket.join(roomId);
//     const users = addUser({
//       name,
//       userId,
//       roomId,
//       host,
//       presenter,
//       socketId: socket.id,
//     });
//     socket.emit("userIsJoined", { success: true, users });
//     console.log({ name, userId });
//     socket.broadcast.to(roomId).emit("allUsers", users);
//     setTimeout(() => {
//       socket.broadcast
//         .to(roomId)
//         .emit("userJoinedMessageBroadcasted", { name, userId, users });
//       socket.broadcast.to(roomId).emit("whiteBoardDataResponse", {
//         imgURL: imgURLGlobal,
//       });
//     }, 1000);
//   });

//   socket.on("drawing", (data) => {
//         imageUrl = data;
//         socket.broadcast.to(userRoom).emit("canvasImage", imageUrl);
//       });

//   socket.on("whiteboardData", (data) => {
//     imgURLGlobal = data;
//     socket.broadcast.to(roomIdGlobal).emit("whiteBoardDataResponse", {
//       imgURL: data,
//     });
//   });

//   socket.on("message", (data) => {
//     const { message } = data;
//     const user = getUser(socket.id);
//     if (user) {
//       socket.broadcast
//         .to(roomIdGlobal)
//         .emit("messageResponse", { message, name: user.name });
//     }
//   });

//   socket.on("disconnect", () => {
//     const user = getUser(socket.id);
//     if (user) {
//       removeUser(socket.id);
//       socket.broadcast.to(roomIdGlobal).emit("userLeftMessageBroadcasted", {
//         name: user.name,
//         userId: user.userId,
//       });
//     }
//   });
// });

// const port = process.env.PORT || 5000;

// server.listen(port, () =>
//   console.log("server is running on http://localhost:5000")
// );