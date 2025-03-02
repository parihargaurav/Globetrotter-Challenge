import React from "react";

const QuizCard = ({ question, options, handleAnswer }) => {
  if (!question || !options) return <p>Loading question...</p>;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-[420px] text-center border-8 border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{question}</h2>
      <div className="grid grid-cols-2 gap-3">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizCard;
