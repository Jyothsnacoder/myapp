import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Board from "./components/board";
import LoginSignup from "./components/loginSignup";
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
        <Route path="/birthday-reminder" element={<BirthdayReminderApp />} />
          {/* Login/Signup Page */}
          <Route
            path="/"
            element={<LoginSignup onLogin={handleLogin} />}
          />
          {/* Birthday Reminder Page */}
          <Route
            path="/birthday-reminder"
            element={isLoggedIn ? <Board /> : <LoginSignup onLogin={handleLogin} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
