import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const QuizPage = () => {
  const router = useRouter();
  const { numberOfQuestions, difficulty } = router.query;

  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);

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

  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer);
    setCorrectAnswer(questions[currentQuestionIndex].correct_answer);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setSelectedAnswer(null);
      setCorrectAnswer(null);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      router.push("/trivia/score");
    }
  };

  if (!questions || questions.length === 0) {
    return <div className="text-center">Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 text-white">
      <h1 className="text-4xl font-bold mb-6">
        Question {currentQuestionIndex + 1}
      </h1>
      <p
        className="mb-6"
        dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
      />

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
                : "bg-white text-blue-500 hover:bg-gray-200"
            }`}
          >
            <span dangerouslySetInnerHTML={{ __html: answer }} />
          </button>
        ))}

      {selectedAnswer && (
        <button
          onClick={nextQuestion}
          className="px-6 py-2 bg-white text-blue-500 rounded-lg shadow-lg hover:bg-gray-200 transition"
        >
          {currentQuestionIndex < questions.length - 1 ? "Next" : "Finish Quiz"}
        </button>
      )}
    </div>
  );
};

export default QuizPage;
