import { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "../../../components/Layout";

const ChooseOptionsPage = () => {
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [difficulty, setDifficulty] = useState("easy");
  const [category, setCategory] = useState("");
  const [questionType, setQuestionType] = useState("multiple");
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    // Fetching categories from Open Trivia DB
    fetch("https://opentdb.com/api_category.php")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.trivia_categories);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-6 text-center">
        Choose Your Quiz Options
      </h1>
      <div className="bg-white shadow-lg p-8 rounded-lg max-w-md mx-auto space-y-6">
        <label className="block">
          <span className="text-gray-700">Number of Questions:</span>
          <input
            type="number"
            value={numberOfQuestions}
            onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            min="1"
            max="20"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Difficulty:</span>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>
        <label className="block">
          <span className="text-gray-700">Category:</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-gray-700">Question Type:</span>
          <select
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True/False</option>
          </select>
        </label>
        <Link
          href={{
            pathname: "/trivia/quiz",
            query: { numberOfQuestions, difficulty, category, questionType },
          }}
        >
          <button className="w-full bg-indigo-600 text-white py-2 rounded-md shadow-lg hover:bg-indigo-700 transition duration-150">
            Start Your Quiz
          </button>
        </Link>
      </div>
    </Layout>
  );
};

export default ChooseOptionsPage;
