import React, { useState, useEffect } from "react";
import QuizCard from "../components/QuizCard.jsx";
import Confetti from "react-confetti";
import { getQuestions } from "../services/quizService";
import { FaWhatsapp, FaCopy } from "react-icons/fa";

const Quiz = () => {
  const [username, setUsername] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [funFact, setFunFact] = useState("");
  const [inviteLink, setInviteLink] = useState("");
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
    const [usedUsernames, setUsedUsernames] = useState([]);


  useEffect(() => {
    localStorage.removeItem("quizUsername");
    const storedUsernames = JSON.parse(localStorage.getItem("usedUsernames")) || [];
    setUsedUsernames(storedUsernames);
  }, []);
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getQuestions();
        if (Array.isArray(data)) {
          setQuestions(data);
        } else {
          console.error("Invalid questions response. Expected an array, but got:", data);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, []);

 const handleStartGame = () => {
    if (username.trim() === "") {
      alert("Please enter a username!");
      return;
    }
    if (usedUsernames.includes(username)) {
      alert("Username already taken! Choose another one.");
      return;
    }
    localStorage.setItem("quizUsername", username);
    const updatedUsernames = [...usedUsernames, username];
    setUsedUsernames(updatedUsernames);
    localStorage.setItem("usedUsernames", JSON.stringify(updatedUsernames));
    setIsPlaying(true);
    setIsQuizCompleted(false);
  };


  const handleAnswer = (selectedOption) => {
    if (questions.length === 0) return;

    const correctAnswer = questions[currentIndex].correctAnswer;
    if (selectedOption === correctAnswer) {
      setScore(score + 1);
      setShowConfetti(true);
      setFeedback("🎉 Correct! Well done!");
    } else {
      setFeedback("😢 Oops! Wrong answer!");
    }

    setFunFact(questions[currentIndex].funFact);

    setTimeout(() => {
      setShowConfetti(false);
    }, 2000);
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setFeedback(null);
      setFunFact("");
    } else {
      setIsQuizCompleted(true);
      setIsPlaying(false);
    }
  };

  const handleChallengeFriend = () => {
    const link = `${window.location.origin}/invite?username=${encodeURIComponent(username)}&score=${score}`;
    setInviteLink(link);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteLink);
    alert("Link copied to clipboard!");
  };

  const openWhatsApp = () => {
    if (!inviteLink) {
      alert("Generate an invite link first!");
      return;
    }
    const whatsappMessage = `Hey! I just played this fun quiz game and scored *${score}* points! Can you beat my score? 😎\nJoin here: ${inviteLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`, "_blank");
  };

  const handleRestart = () => {
    setIsPlaying(false);
    setCurrentIndex(0);
    setScore(0);
    setFeedback(null);
    setFunFact("");
    setIsQuizCompleted(false);
  };

  if (!isPlaying) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Enter Your Username</h1>
        <input
          type="text"
          placeholder="Enter your username"
          className="border border-gray-300 p-2 rounded-lg"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          onClick={handleStartGame}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Start Game
        </button>
      </div>
    );
  }

  if (isQuizCompleted) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold">Quiz Completed!</h1>
        <p className="mt-4 text-lg font-semibold">Your Final Score: {score}/{questions.length}</p>
        <button
          onClick={handleRestart}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Restart Quiz
        </button>
      </div>
    );
  }

  if (isPlaying && questions.length === 0) {
    return <div className="p-6 text-center">Loading questions...</div>;
  }

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Quiz Time!</h1>
      {showConfetti && <Confetti />}
      {questions.length > 0 && (
        <QuizCard
          question={questions[currentIndex].clue}
          options={questions[currentIndex].options}
          handleAnswer={handleAnswer}
        />
      )}
      {feedback && (
        <div className="mt-4 p-4 bg-gray-200 rounded-lg text-center">
          <p className="text-lg font-semibold">{feedback}</p>
          <p className="mt-2 text-sm text-gray-600">{funFact}</p>
          <button
            onClick={handleNextQuestion}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            {currentIndex < questions.length - 1 ? "Next Question" : "Finish Quiz"}
          </button>
        </div>
      )}
      <p className="mt-6 text-lg font-bold">Score: {score}</p>

      {/* Challenge a Friend Feature */}
      <div className="mt-4 flex flex-col items-center">
        {inviteLink && (
          <div className="mb-2 p-2 border border-gray-300 rounded-lg text-sm break-all">
            {inviteLink}
          </div>
        )}
        <div className="flex gap-4">
          <button
            onClick={handleChallengeFriend}
            className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
          >
            🎉 Generate Invite Link
          </button>
          {inviteLink && (
            <>
              <button
                onClick={copyToClipboard}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 flex items-center gap-2"
              >
                <FaCopy /> Copy Link
              </button>
              <button
                onClick={openWhatsApp}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center gap-2"
              >
                <FaWhatsapp /> WhatsApp
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
