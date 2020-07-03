import React from "react";
// import { HashRouter as Router, Route } from "react-router-dom";
import Quiz from "./pages/quiz";
import Navbar from "./components/Navbar";
import firebase from "firebase/app";
import 'firebase/database';
import DB_CONFIG from "./config/firebase/db_config";
import './App.css'

function App() {
  // Initialize Firebase
  const app = firebase.initializeApp(DB_CONFIG);
  //firebase.analytics();
  const database = app.database().ref().child('questions');
  return (
    <div className="my-page m-0">
      <Navbar />
      <Quiz />
    </div>
  );
}

export default App;