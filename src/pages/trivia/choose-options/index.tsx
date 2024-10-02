import { useState } from "react";
import Link from "next/link";
import Layout from "../../../components/Layout";

const ChooseOptionsPage = () => {
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [difficulty, setDifficulty] = useState("easy");

  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-6">Choose Your Options</h1>
      <div className="flex flex-col items-center">
        <label className="mb-2">
          Number of Questions:
          <input
            type="number"
            value={numberOfQuestions}
            onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
            className="ml-2 border p-1 rounded"
            min="1"
            max="20"
          />
        </label>
        <label className="mb-2">
          Difficulty:
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="ml-2 border p-1 rounded"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>
        <Link
          href={{
            pathname: "/trivia/quiz",
            query: { numberOfQuestions, difficulty },
          }}
        >
          <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition">
            Start Your Quiz
          </button>
        </Link>
      </div>
    </Layout>
  );
};

export default ChooseOptionsPage;
