import React, { useState, useEffect } from "react";
import "./board.css";

const BirthdayReminderApp = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [birthdays, setBirthdays] = useState([]);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  // Load saved birthdays and check for logged-in user on initial render
  useEffect(() => {
    const savedBirthdays = JSON.parse(localStorage.getItem("birthdays")) || [];
    setBirthdays(savedBirthdays);

    // Get the user from local storage
    const currentUser = JSON.parse(localStorage.getItem("user"));
    if (!currentUser) {
      window.location.href = "/"; // Redirect to login if not logged in
    } else {
      setUser(currentUser);
    }
  }, []);

  // Handle adding a birthday
  const handleAddBirthday = () => {
    if (!name || !date) {
      setError("Please enter both name and date!");
      return;
    }
    setError(""); // Clear the error
    const newBirthday = { name, date };
    setBirthdays([...birthdays, newBirthday]);

    // Save the updated birthdays to local storage
    localStorage.setItem("birthdays", JSON.stringify([...birthdays, newBirthday]));

    setName("");
    setDate("");
  };

  // Handle deleting a birthday
  const handleDeleteBirthdayWithReminder = (index) => {
    const updatedBirthdays = birthdays.filter((_, i) => i !== index);
    setBirthdays(updatedBirthdays);

    // Update local storage
    localStorage.setItem("birthdays", JSON.stringify(updatedBirthdays));
  };

  // Calculate countdown to the next birthday
  const calculateCountdown = (birthdayDate) => {
    const today = new Date();
    const nextBirthday = new Date(birthdayDate);
    nextBirthday.setFullYear(today.getFullYear());
    
    if (nextBirthday < today) {
      nextBirthday.setFullYear(today.getFullYear() + 1); // Next year
    }

    const timeDiff = nextBirthday - today;
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

    return { days, hours, minutes };
  };

  // Format countdown display
  const formatCountdown = (countdown) => {
    if (countdown.days > 0) {
      return `${countdown.days} days`;
    }
    return `${countdown.hours} hours, ${countdown.minutes} minutes`;
  };

  return (
    <div className="container">
      <div className="birthday-app">
        <h1>Birthday Reminder App</h1>
        <div className="birthday-form">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button onClick={handleAddBirthday}>Add Birthday</button>
          {error && <div className="error-message">{error}</div>}
        </div>
        <div id="birthday-list">
          {birthdays.map((birthday, index) => {
            const countdown = calculateCountdown(birthday.date);
            return (
              <div key={index} className="birthday-item">
                <strong>{birthday.name}</strong> - {birthday.date}
                <div className="countdown">{formatCountdown(countdown)}</div>
                <button
                  onClick={() => handleDeleteBirthdayWithReminder(index)}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BirthdayReminderApp;
