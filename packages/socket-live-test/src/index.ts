import { Server } from "socket.io";
const io = new Server({
  cors: {
    origin: "http://localhost:1568",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("code", (e) => {
    io.emit("code", e);
  });
  socket.on("schema", (e) => {
    io.emit("schema", e);
  });
});

io.listen(3030);
