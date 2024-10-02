import { useState } from "react";
import { useRouter } from "next/router";

const ChooseOptionsPage = () => {
  const router = useRouter();
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [difficulty, setDifficulty] = useState("easy");

  const startQuiz = () => {
    router.push({
      pathname: "/trivia/quiz",
      query: { numberOfQuestions, difficulty },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-green-500 to-blue-500 text-white">
      <h1 className="text-4xl font-bold mb-6">Choose Your Options</h1>

      <label className="mb-4">
        Number of Questions:
        <input
          type="number"
          value={numberOfQuestions}
          onChange={(e) => setNumberOfQuestions(parseInt(e.target.value))}
          className="ml-2 p-2 rounded bg-white text-blue-500"
        />
      </label>

      <label className="mb-4">
        Difficulty:
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="ml-2 p-2 rounded bg-white text-blue-500"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </label>

      <button
        onClick={startQuiz}
        className="px-6 py-2 bg-white text-blue-500 rounded-lg shadow-lg hover:bg-gray-200 transition"
      >
        Start Quiz
      </button>
    </div>
  );
};

export default ChooseOptionsPage;
