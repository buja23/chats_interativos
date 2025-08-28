import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

export default function Room() {
  const { room } = useParams();
  const [username, setUsername] = useState("");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // pedir o nome do usuário ao entrar
    const name = prompt("Digite seu nome:") || "Anônimo";
    setUsername(name);

    socket.emit("joinRoom", room);

    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, [room]);

  const sendMessage = () => {
    if (input.trim() !== "") {
      const data = { user: username, text: input, room };
      socket.emit("sendMessage", data);
      setInput("");
    }
  };

  return (
    <div>
      <h2>Sala: {room}</h2>
      <div style={{ border: "1px solid #ccc", height: "300px", overflowY: "auto", padding: "10px" }}>
        {messages.map((msg, i) => (
          <p key={i}>
            <strong>{msg.user}:</strong> {msg.text}
          </p>
        ))}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Digite sua mensagem..."
      />
      <button onClick={sendMessage}>Enviar</button>
    </div>
  );
}
