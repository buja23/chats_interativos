import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoomSelector from "./components/RoomSelector";
import Room from "./components/Room";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RoomSelector />} />
        <Route path="/room/:roomId" element={<Room />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
