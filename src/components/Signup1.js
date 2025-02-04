import React, { useState, useEffect, useRef } from "react";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./board.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Signup1() {
  const auth = getAuth();
  const navigate = useNavigate();
  const emailRef = useRef(null);

  const [isSignup, setIsSignup] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rotate, setRotate] = useState(false);

  useEffect(() => {
    setError("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    emailRef.current?.focus();
  }, [isSignup]);

  const validatePassword = (password) => {
    const pattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;
    return pattern.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password || (isSignup && !confirmPassword)) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    if (isSignup && password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    if (isSignup && !validatePassword(password)) {
      setError("Password must have 8+ characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character.");
      setLoading(false);
      return;
    }

    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
        setIsSignup(false); // Switch to Login form
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/birthday");  // Navigate to the BirthdayReminderApp
      }
    } catch (err) {
      console.error(err);
      if (err.code === "auth/invalid-credential") {
        setError("Invalid credentials provided/password incorrect.");
      } else if (err.code === "auth/user-not-found") {
        setError("No account found with this email.");
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password. Please try again.");
      } else if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered. Please log in or use a different email.");
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = () => {
    navigate("/birthday"); // Navigate to BirthdayReminderApp for guest
  };

  const handleToggle = () => {
    setRotate(!rotate);
    setIsSignup(!isSignup); // Switch between signup and login
  };

  return (
    <div className="auth-container">
      <div className={`auth-form ${rotate ? "rotate" : ""}`}>
        <h1 style={{ fontSize: "2rem", fontFamily: "Roboto" }}>
          {isSignup ? "Signup" : "Login"}
        </h1>
        <form onSubmit={handleSubmit} className="auth-form" style={{ fontSize: "1rem", fontFamily: "Roboto" }}>
          {error && <p className="error-message">{error}</p>}
          <input
            ref={emailRef}
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auths-input"
            required
          />
          <div className="password-container" style={{ fontSize: "1rem", fontFamily: "Roboto" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input"
              required
            />
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {isSignup && (
            <div className="password-container" style={{ fontSize: "1rem", fontFamily: "Roboto" }}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="auth-input"
                required
              />
              <span onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          )}
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Processing..." : isSignup ? "Signup" : "Login"}
          </button>
        </form>
        <button onClick={handleGuestLogin} className="guest-button" style={{ fontSize: "1rem", fontFamily: "Roboto" }}>
          Guest Login
        </button>
        <p onClick={handleToggle} className="toggle-auth" style={{ fontSize: "1rem", fontFamily: "Roboto" }}>
          {isSignup ? "Already have an account? Login" : "Don't have an account? Signup"}
        </p>
      </div>
    </div>
  );
}

export default Signup1;
