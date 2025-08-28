import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoomSelector from "./RoomSelector";
import Room from "./Room";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Página inicial → seleção de salas */}
        <Route path="/" element={<RoomSelector />} />

        {/* Página de sala → chat */}
        <Route path="/room/:room" element={<Room />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
