const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: { origin: "*" },
});

io.on("connection", (socket) => {
    console.log("Novo usuário conectado:", socket.id);

    // Entrar na sala
    socket.on("joinRoom", ({ room, username }) => {
        socket.join(room);
        socket.data.username = username;
        socket.data.room = room;

        console.log(`${username} entrou na sala ${room}`);

        io.to(room).emit("receiveMessage", {
            user: "Sistema",
            message: `${username} entrou na sala`
        });
    });

    // Receber e reenviar mensagem
    socket.on("sendMessage", (data) => {
        io.to(data.room).emit("receiveMessage", {
            user: data.user,
            message: data.message,
        });
    });

    // Sair da sala manual
    socket.on("leaveRoom", ({ room, username }) => {
        if (room && username) {
            io.to(room).emit("receiveMessage", {
                user: "Sistema",
                message: `${username} saiu da sala`
            });
            socket.leave(room);
        }
    });

    // Sair da sala automaticamente ao desconectar
    socket.on("disconnect", () => {
        const username = socket.data?.username;
        const room = socket.data?.room;
        if (room && username) {
            io.to(room).emit("receiveMessage", {
                user: "Sistema",
                message: `${username} saiu da sala`
            });
        }
    });
});

server.listen(3001, () => {
    console.log("Servidor rodando na porta 3001 🚀");
});
