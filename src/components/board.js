import React, { useState, useEffect } from "react";
import "./board.css";

// Movie fetch and display component
const Sampes = () => {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const url = 'https://movies-api14.p.rapidapi.com/movies';
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'd8348a3f0dmshaff60b54df404b1p1f331fjsn26db868882b9',
      'x-rapidapi-host': 'movies-api14.p.rapidapi.com'
    }
  };

  useEffect(() => {
    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        setFilteredMovies(data.json);
      });
  }, []);

  return (
    <div className="movie-list">
      {filteredMovies.map((movie, index) => (
        <div key={index} className="movie-card">
          <img src={movie.poster_path} alt={movie.title} />
          <h2>{movie.title}</h2>
          <p>{movie.release_date}</p>
        </div>
      ))}
    </div>
  );
};

// Birthday Reminder App Component
const BirthdayReminderApp = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [birthdays, setBirthdays] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedBirthdays = JSON.parse(localStorage.getItem("birthdays")) || [];
    setBirthdays(savedBirthdays);
  }, []);

  useEffect(() => {
    localStorage.setItem("birthdays", JSON.stringify(birthdays));
  }, [birthdays]);

  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        console.log("Notification permission:", permission);
      });
    }
  }, []);

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

    const interval = setInterval(notifyUpcomingBirthdays, 60000);
    return () => clearInterval(interval);
  }, [birthdays]);

  const handleAddBirthday = () => {
    if (!name || !date) {
      setError("Please enter both name and date!");
      return;
    }
    setError("");
    setBirthdays([...birthdays, { name, date }]);
    setName("");
    setDate("");
  };

  const handleDeleteBirthdayWithReminder = (index) => {
    const userConfirmed = window.confirm("Are you sure you want to delete this birthday?");
    if (userConfirmed) {
      setBirthdays(prevBirthdays => prevBirthdays.filter((_, i) => i !== index));
    }
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
        <strong>🎉 {name} - {date}</strong>
        <div className="countdown">
          {countdown.days > 0
            ? `⏳ ${countdown.days} days`
            : `⏳ ${countdown.hours} hours, ${countdown.minutes} minutes, ${countdown.seconds} seconds`}
        </div>
        <button onClick={onDelete} className="delete-button">🗑️ Delete</button>
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
        <div id="birthday-list" className={birthdays.length > 0 ? "show-birthday-list" : ""}>
          {birthdays.map((birthday, index) => (
            <BirthdayItem
              key={index}
              name={birthday.name}
              date={birthday.date}
              onDelete={() => handleDeleteBirthdayWithReminder(index)}
            />
          ))}
        </div>
      </div>
      <Sampes />
    </div>
  );
};

export default BirthdayReminderApp;
