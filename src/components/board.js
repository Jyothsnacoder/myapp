import React, { useState, useEffect } from "react";
import "./board.css";

const BirthdayReminderApp = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [birthdays, setBirthdays] = useState([]);
  const [error, setError] = useState("");

  // Load birthdays from local storage on initial render
  useEffect(() => {
    const savedBirthdays = JSON.parse(localStorage.getItem("birthdays")) || [];
    setBirthdays(savedBirthdays);
  }, []);

  // Save birthdays to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("birthdays", JSON.stringify(birthdays));
  }, [birthdays]);

  // Request Notification permission on initial render
  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        console.log("Notification permission:", permission);
      });
    }
  }, []);

  // Notification for upcoming birthdays
  useEffect(() => {
    const notifyUpcomingBirthdays = () => {
      const today = new Date();
      birthdays.forEach(({ name, date }) => {
        const countdown = calculateCountdown(date);
        if (countdown.days === 0 && countdown.hours === 0 && countdown.minutes <= 1) {
          if ("Notification" in window && Notification.permission === "granted") {
            new Notification(`🎉 Reminder: It's ${name}'s birthday in less than 1 minute! 🎂`);
          }
        }
      });
    };

    const interval = setInterval(notifyUpcomingBirthdays, 60000); // Check every 60 seconds
    return () => clearInterval(interval);
  }, [birthdays]);

  const handleAddBirthday = () => {
    if (!name || !date) {
      setError("Please enter both name and date!");
      return;
    }
    setError(""); // Clear the error
    setBirthdays([...birthdays, { name, date }]);
    setName("");
    setDate("");
  };

  const handleDeleteBirthday = (indexToRemove) => {
    const updatedBirthdays = birthdays.filter((_, index) => index !== indexToRemove);
    setBirthdays(updatedBirthdays);
  };

  const calculateCountdown = (date) => {
    const today = new Date();
    const birthdayDate = new Date(date);
    const nextBirthday = new Date(birthdayDate);
    nextBirthday.setFullYear(today.getFullYear());

    if (nextBirthday < today) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }

    const timeDiff = nextBirthday.getTime() - today.getTime();
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  const formatCountdown = (countdown) => {
    if (countdown.days > 0) {
      return `${countdown.days} days`;
    }
    return `${countdown.hours} hours, ${countdown.minutes} minutes, ${countdown.seconds} seconds`;
  };

  const BirthdayItem = ({ name, date, onDelete }) => {
    const [countdown, setCountdown] = useState(calculateCountdown(date));

    useEffect(() => {
      const interval = setInterval(() => {
        setCountdown(calculateCountdown(date));
      }, 1000);

      return () => clearInterval(interval);
    }, [date]);

    return (
      <div className="birthday-item">
        <strong>{name}</strong> - {date}
        <div className="countdown">{formatCountdown(countdown)}</div>
        <button onClick={onDelete} className="delete-button">
          Delete
        </button>
      </div>
    );
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
        {birthdays.map((birthday, index) => (
          <BirthdayItem
            key={index}
            name={birthday.name}
            date={birthday.date}
            onDelete={() => handleDeleteBirthday(index)}
          />
        ))}
      </div>
    </div>
    </div>
  );
};

export default BirthdayReminderApp;
