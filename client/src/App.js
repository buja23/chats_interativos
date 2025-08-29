import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoomSelector from "./pages/RoomSelector";
import Room from "./pages/Room";
import './styles.css'; 



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
