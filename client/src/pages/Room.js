import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";



const socket = io("http://localhost:3001");

export default function Room() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Pergunta o nome do usuário
    const name = prompt("Digite seu nome:") || "Anônimo";
    setUsername(name);

    // Entra na sala
    socket.emit("joinRoom", { room: roomId, username: name });

    // Recebe as mensagens
    const handleMessage = (data) => {
      setMessages((prev) => [...prev, data]);
    };

    socket.on("receiveMessage", handleMessage);

    // Cleanup ao sair do componente
    return () => {
      socket.off("receiveMessage", handleMessage);
      socket.emit("leaveRoom", { room: roomId, username: name });
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

  const handleLeave = () => {
    socket.emit("leaveRoom", { room: roomId, username });
    setTimeout(() => {
      window.location.href = "/";
    }, 100);
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
      <div style={{ marginTop: "10px" }}>
        <button onClick={handleLeave}>Sair da sala</button>
      </div>
    </div>
  );
}
