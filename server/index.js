const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // libera qualquer frontend (para estudo)
  },
});

// Quando o usuário se conecta
io.on("connection", (socket) => {
  console.log("Novo usuário conectado:", socket.id);

  // Entrar em uma sala
socket.on("joinRoom", ({ room, username }) => {
  socket.join(room);

  // salva info no socket
  socket.data.username = username;
  socket.data.room = room;

  console.log(`${username} entrou na sala ${room}`);

  io.to(room).emit("receiveMessage", {
    user: "Sistema",
    message: `${username} entrou na sala`
  });
});



  // Receber mensagem e reenviar para a sala
  socket.on("sendMessage", (data) => {
    io.to(data.room).emit("receiveMessage", {
      user: data.user,
      message: data.message,
    });
  });

  // Desconectar
  socket.on("disconnect", () => {
    const username = socket.data?.username;
    const room = socket.data?.room;

    if (room && username) {
      io.to(room).emit("receiveMessage", {
        username: "Sistema",
        text: `${username} saiu do chat`
      });
    }
  });
});

server.listen(3001, () => {
  console.log("Servidor rodando na porta 3001 🚀");
});
