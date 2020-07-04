import React from "react";
import Quiz from "./pages/quiz";
import Navbar from "./components/Navbar";
import './App.css'

function App() {
  return (
    <div className="my-page m-0">
      <Navbar />
      <Quiz />
    </div>
  );
}

export default App;