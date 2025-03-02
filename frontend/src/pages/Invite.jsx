import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

const Invite = () => {
  const [searchParams] = useSearchParams();
  const inviterName = searchParams.get("username");
  const inviterScore = searchParams.get("score");
  const [username, setUsername] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [isPlaying, setIsPlaying] = useState(false);

  const handleStartGame = () => {
    if (username.trim() === "") return alert("Please enter a username!");
    localStorage.setItem("quizUsername", username);
    setIsPlaying(true);
    window.location.href = "/quiz";
  };

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">You've Been Challenged! 🎉</h1>
      <p>
        <strong>{inviterName}</strong> scored <strong>{inviterScore}</strong> points! Can you beat them? 😏
      </p>

      <input
        type="text"
        placeholder="Enter your username"
        className="border border-gray-300 p-2 rounded-lg mt-4"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <button
        onClick={handleStartGame}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
      >
        Start Playing
      </button>
    </div>
  );
};

export default Invite;
