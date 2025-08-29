import { useNavigate } from "react-router-dom";

export default function RoomSelector() {
  const navigate = useNavigate();

  const handleJoin = (room) => {
    navigate(`/room/${room}`);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Selecione uma sala de bate-papo</h2>
      <button onClick={() => handleJoin("games")}>🎮 Jogos</button>
      <button onClick={() => handleJoin("movies")}>🎬 Filmes</button>
      <button onClick={() => handleJoin("music")}>🎵 Música</button>
    </div>
  );
}
