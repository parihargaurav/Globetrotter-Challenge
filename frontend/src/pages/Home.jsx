import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center flex-grow text-center p-8">
      <h1 className="text-5xl font-bold mb-6 text-blue-700">Welcome to Globetrotter!</h1>
      <p className="text-lg font-semibold text-gray-900 max-w-lg">
        Test your travel knowledge by guessing destinations based on cryptic clues.  
        Compete with friends and climb the leaderboard!
      </p>
      <Link
        to="/quiz"
        className="mt-6 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300"
      >
        Start Playing
      </Link>
    </div>
  );
};

export default Home;
