import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../../components/Layout";
import { useTheme } from "../../../ThemeContext";

const QuizPage = () => {
  const router = useRouter();
  const { numberOfQuestions, difficulty } = router.query;

  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [timer, setTimer] = useState(15);
  const [isTimeOut, setIsTimeOut] = useState(false);

  useEffect(() => {
    if (numberOfQuestions && difficulty) {
      fetch(
        `https://opentdb.com/api.php?amount=${numberOfQuestions}&difficulty=${difficulty}&type=multiple`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.results) {
            setQuestions(data.results);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [numberOfQuestions, difficulty]);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (timer > 0 && !isTimeOut) {
      timerId = setTimeout(() => setTimer(timer - 1), 1000);
    } else if (timer === 0) {
      setIsTimeOut(true);
      nextQuestion();
    }

    return () => clearTimeout(timerId);
  }, [timer, isTimeOut]);

  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer);
    setCorrectAnswer(questions[currentQuestionIndex].correct_answer);
    setShowCorrectAnswer(true);
    if (answer === questions[currentQuestionIndex].correct_answer) {
      setCorrectAnswersCount((prevCount) => prevCount + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setSelectedAnswer(null);
      setCorrectAnswer(null);
      setShowCorrectAnswer(false);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimer(15);
      setIsTimeOut(false);
    } else {
      router.push({
        pathname: "/trivia/score",
        query: { score: correctAnswersCount, total: questions.length },
      });
    }
  };

  if (!questions || questions.length === 0) {
    return <div className="text-center">Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-6">
        Question {currentQuestionIndex + 1}
      </h1>
      <p
        className="mb-6"
        dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
      />
      <p className="text-lg mb-4">
        Score: {correctAnswersCount}/{currentQuestionIndex + 1}
      </p>
      <p className="text-lg mb-4">Time Left: {timer} seconds</p>

      {currentQuestion.incorrect_answers
        .concat(currentQuestion.correct_answer)
        .map((answer, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(answer)}
            disabled={selectedAnswer !== null}
            className={`mb-4 w-full px-6 py-2 rounded-lg shadow-lg transition 
            ${
              selectedAnswer === answer
                ? answer === correctAnswer
                  ? "bg-green-500"
                  : "bg-red-500"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            <span dangerouslySetInnerHTML={{ __html: answer }} />
          </button>
        ))}

      {showCorrectAnswer && (
        <div className="mb-4">
          <p
            className={`text-lg ${
              selectedAnswer === correctAnswer
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {selectedAnswer === correctAnswer
              ? "Correct!"
              : `Wrong! The correct answer is: ${currentQuestion.correct_answer}`}
          </p>
        </div>
      )}

      {selectedAnswer && (
        <button
          onClick={nextQuestion}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition"
        >
          {currentQuestionIndex < questions.length - 1 ? "Next" : "Finish Quiz"}
        </button>
      )}
    </Layout>
  );
};

export default QuizPage;
