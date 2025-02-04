import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Board from "./components/board";
import Signup1 from "./components/Signup1";  // Import Signup1
import BirthdayReminderApp from "./components/board";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (status) => {
    setIsLoggedIn(status);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Signup1 />} />
          <Route path="/birthday-reminder" element={<BirthdayReminderApp />} />
          <Route 
            path="/dashboard" 
            element={isLoggedIn ? <Board /> : <Signup1 />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
