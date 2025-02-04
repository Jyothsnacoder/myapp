import React, { useState, useEffect, useRef } from "react";
import { app } from "../../fbconfig";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./signup.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Signup1() {
  const auth = getAuth(app);
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
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
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
      setError(
        "Password must have 8+ characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character."
      );
      setLoading(false);
      return;
    }

    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
        setIsSignup(false);
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      const errorMessages = {
        "auth/invalid-credential": "Invalid credentials provided/password incorrect.",
        "auth/user-not-found": "No account found with this email.",
        "auth/wrong-password": "Incorrect password. Please try again.",
        "auth/email-already-in-use": "This email is already registered. Please log in or use a different email.",
      };
      setError(errorMessages[err.code] || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = () => {
    navigate("/dashboard");
  };

  const handleToggle = () => {
    setRotate(!rotate);
    setIsSignup(!isSignup);
  };

  return (
    <div className="auth-container">
      <div className={`auth-form ${rotate ? "rotate" : ""}`}>
        <h1>{isSignup ? "Signup" : "Login"}</h1>
        <form onSubmit={handleSubmit} className="auth-form">
          {error && <p className="error-message">{error}</p>}

          <input
            ref={emailRef}
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
            required
          />

          <div className="password-container">
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
            <div className="password-container">
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

        <button onClick={handleGuestLogin} className="guest-button">
          Guest Login
        </button>

        <p onClick={handleToggle} className="toggle-auth">
          {isSignup ? "Already have an account? Login" : "Don't have an account? Signup"}
        </p>
      </div>
    </div>
  );
}

export default Signup1;
