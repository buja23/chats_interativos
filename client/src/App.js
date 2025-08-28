import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoomSelector from "./components/RoomSelector";
import Room from "./components/Room";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Tela inicial para escolher a sala */}
        <Route path="/" element={<RoomSelector />} />

        {/* Tela da sala */}
        <Route path="/room/:room" element={<Room />} />
      </Routes>
    </Router>
  );
}
