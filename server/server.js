const express = require("express")
const http = require("http")
const {serve} = require("socket.io")
const cors = require("cors")
const { Socket } = require("socket.io-client")

const app = express()
app.use(cors())

const server = http.createServer(app)

const io = new Server(server,{
    cors: {
        origin:"*",
    }
})

// Array com as salas disponíveis
const rooms = ["filmes", "jogos", "musicas"]

io.on("connection", (socket) => {
    console.log(`novo usuario conectado, ${socket.id}`)

    // Usuário pede para entrar em uma sala
    socket.on("joinRoom", (roomName) => {
        if (rooms.includes(roomName)) {
            socket.join(roomName)
            console.log(`Usuario ${socket.id} entrou na sala ${roomName}`)

            // avisa pra sala que entrou um novo usuário
            io.to(roomName).emit("receiveMessage", {
                user: "Sistema",
                message: `Novo usuario entrou na sala ${roomName}`
            })
        }
    })

    socket.on("sendMessage", (data) => {
        io.to(data.room).emit("receiveMessage", data)
    })

    socket.on("disconnect", () => {
        console.log(`Usuario desconectado:${socket.id}`)
    })

    server.listen(3001, () =>{
        console.log("Servidor rodando na porta 3001")
    })
})