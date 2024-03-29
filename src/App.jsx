import { useState } from "react";
import "./App.css";
import NotesPage from "./pages/NotesPage";
import RegisterLogin from "./pages/RegisterLogin";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NotesPage />} />
          <Route path="/join" element={<RegisterLogin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
