import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const QuizPage = () => {
  const router = useRouter();
  const { numberOfQuestions, difficulty } = router.query;

  const [questions, setQuestions] = useState<any[]>([]); // Ensure it's initialized as an array
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);

  useEffect(() => {
    // Fetch questions from the Open Trivia API
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

  // Return a loading state until the questions are fetched
  if (!questions || questions.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Question {currentQuestionIndex + 1}</h1>
      <p dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />

      {currentQuestion.incorrect_answers
        .concat(currentQuestion.correct_answer)
        .map((answer, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(answer)}
            disabled={selectedAnswer !== null}
            style={{
              display: "block",
              margin: "10px auto",
              padding: "10px 20px",
              backgroundColor:
                selectedAnswer === answer
                  ? answer === correctAnswer
                    ? "green"
                    : "red"
                  : "white",
            }}
          >
            <span dangerouslySetInnerHTML={{ __html: answer }} />
          </button>
        ))}

      {selectedAnswer && (
        <button
          onClick={nextQuestion}
          style={{ padding: "10px 20px", marginTop: "20px" }}
        >
          {currentQuestionIndex < questions.length - 1 ? "Next" : "Finish Quiz"}
        </button>
      )}
    </div>
  );
};

export default QuizPage;
