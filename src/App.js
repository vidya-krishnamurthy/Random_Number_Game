import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [randomNumber, setRandomNumber] = useState(generateRandomNumber());
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("Guess a number between 1 and 100!");
  const [attempts, setAttempts] = useState(10);
  const [gameOver, setGameOver] = useState(false);
  const [shake, setShake] = useState(false);
  const [guessHistory, setGuessHistory] = useState([]); // Store previous guesses

  function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  const handleGuess = () => {
    if (gameOver || guess.trim() === "") return; // Ensure input is not empty
    const userGuess = parseInt(guess);

    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
      setMessage("⚠️ Enter a valid number between 1 and 100!");
      return;
    }

    if (userGuess === randomNumber) {
      setMessage("🎉 Correct! You won the game!");
      setGameOver(true);
    } else if (userGuess < randomNumber) {
      setMessage("📉 Too Low! Try again.");
    } else {
      setMessage("📈 Too High! Try again.");
    }

    setGuessHistory([...guessHistory, userGuess]); // Add guess to history
    setAttempts((prev) => prev - 1);

    if (attempts - 1 === 0) {
      setMessage(`❌ Game Over! The number was ${randomNumber}.`);
      setGameOver(true);
    }

    // Shake Effect on Wrong Guess
    setShake(true);
    setTimeout(() => setShake(false), 300);

    setGuess("");
  };

  const restartGame = () => {
    setRandomNumber(generateRandomNumber());
    setGuess("");
    setMessage("Guess a number between 1 and 100!");
    setAttempts(10);
    setGuessHistory([]); // Clear history on restart
    setGameOver(false);
  };

  return (
    <div className="container">
      <h1>🔢 Random Number Game</h1>
      <p className="attempts">
        Attempts Left: <span className="highlight">{attempts}</span>
      </p>
      <p id="message" className={shake ? "shake" : ""}>
        {message}
      </p>

      <input
        type="number"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        disabled={gameOver} // Disable input if game over
        placeholder="Enter your guess"
      />
      <br />

      <button onClick={handleGuess} disabled={gameOver || guess.trim() === ""}>
        Submit Guess
      </button>

      <button className="restart" onClick={restartGame}>
        Restart Game
      </button>

      {/* Display previous guesses */}
      <div className="guess-history">
        <h3>Previous Guesses:</h3>
        <p>{guessHistory.join(", ") || "No guesses yet"}</p>
      </div>

      <p className="instructions">
        Instructions: Guess a number between 1 and 100. You have 10 attempts!
      </p>
    </div>
  );
};

export default App;
