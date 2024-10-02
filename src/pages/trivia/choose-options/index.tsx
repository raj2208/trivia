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
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Choose Your Options</h1>

      <label>
        Number of Questions:
        <input
          type="number"
          value={numberOfQuestions}
          onChange={(e) => setNumberOfQuestions(parseInt(e.target.value))}
        />
      </label>

      <br />

      <label>
        Difficulty:
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </label>

      <br />
      <button
        onClick={startQuiz}
        style={{ padding: "10px 20px", marginTop: "20px" }}
      >
        Start Quiz
      </button>
    </div>
  );
};

export default ChooseOptionsPage;
