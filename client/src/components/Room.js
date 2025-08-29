import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

export default function Room() {
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {

    // pergutar nome
    const name = prompt("Digite seu nome:") || "Anônimo";
    setUsername(name);

    //entra na sala
    socket.emit("joinRoom", { room: roomId, username: name });

    // recebe as mensagens
    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      // sair da sala
      socket.off("receiveMessage");
    };
  }, [roomId]);

  const sendMessage = () => {
    if (input.trim() !== "") {
      socket.emit("sendMessage", {
        room: roomId,
        user: username,
        message: input,
      });
      setInput("");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Sala: {roomId}</h2>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          height: "300px",
          overflowY: "auto",
          marginBottom: "10px",
        }}
      >
        {messages.map((msg, i) => (
          <p key={i}>
            <b>{msg.user}:</b> {msg.message}
          </p>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Digite sua mensagem..."
      />
      <button onClick={sendMessage}>Enviar</button>
    </div>
  );
}
