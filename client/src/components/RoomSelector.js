import { Link } from "react-router-dom";

export default function RoomSelector() {
  const rooms = ["Filmes", "Música", "Esportes"]; // nossas 3 salas

  return (
    <div style={{ padding: "20px" }}>
      <h2>Escolha uma sala de bate-papo</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {rooms.map((room) => (
          <li key={room} style={{ margin: "10px 0" }}>
            {/* cada sala vira um link */}
            <Link to={`/room/${room}`}>
              <button style={{ padding: "10px 20px", cursor: "pointer" }}>
                {room}
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
