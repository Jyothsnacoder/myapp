import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BirthdayReminderApp from "./board";
// import "./LoginSignup.css";




const LoginSignup = () => {
  const [activeTab, setActiveTab] = useState("Login");
  const [formData, setFormData] = useState({
    email1: "",
    password1: "",
    name: "",
    email: "",
    password: "",
  });

  const openTab = (tabName) => {
    setActiveTab(tabName);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const navigate=useNavigate();

  const Login = (e) => {
    e.preventDefault();
    console.log("Login Data: ", {
      email: formData.email1,
      password: formData.password1,
    });
    navigate("/birthday-reminder"); 
    
  };

  const Signup = (e) => {
    e.preventDefault();
    console.log("Signup Data: ", {
      username: formData.name,
      email: formData.email,
      password: formData.password,
    });
    navigate("/birthday-reminder"); 
  };

  return (
    <div className="container">
      {/* Tabs */}
      <div className="tab">
        <button
          className={`tablink ${activeTab === "Login" ? "active" : ""}`}
          onClick={() => openTab("Login")}
        >
          Login
        </button>
        <button
          className={`tablink ${activeTab === "Signup" ? "active" : ""}`}
          onClick={() => openTab("Signup")}
        >
          Signup
        </button>
      </div>

      {/* Login Tab */}
      {activeTab === "Login" && (
        <div id="Login" className="tabcontent active">
         <h2>Login</h2>
          <form onSubmit={Login}>
            <input
              type="email"
              id="email1"
              placeholder="Email"
              autoComplete="on"
              required
              value={formData.email1}
              onChange={handleChange}
            />
            <input
              type="password"
              id="password1"
              placeholder="Password"
              autoComplete="on"
              required
              value={formData.password1}
              onChange={handleChange}
            />
            <button type="submit">Login</button>
          </form>
        </div>
      )}

      {/* Signup Tab */}
      {activeTab === "Signup" && (
        <div id="Signup" className="tabcontent active">
          <h2>Signup</h2>
          <form onSubmit={Signup}>
            <input
              type="text"
              id="name"
              placeholder="Username"
              autoComplete="on"
              required
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="email"
              id="email"
              placeholder="Email"
              autoComplete="on"
              required
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              id="password"
              placeholder="Password"
              autoComplete="on"
              required
              value={formData.password}
              onChange={handleChange}
            />
            <button type="submit">Signup</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginSignup;
