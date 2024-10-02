import { useRouter } from "next/router";

const ScorePage = () => {
  const router = useRouter();
  const { score, total } = router.query; // Retrieve score and total questions from the query params

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-red-500 to-yellow-500 text-white">
      <h1 className="text-4xl font-bold mb-6">Quiz Completed!</h1>
      <p className="text-lg mb-4">
        Your Score: {score} out of {total}
      </p>{" "}
      {/* Updated score display */}
      <p className="text-lg">
        {score && parseInt(score) >= (parseInt(total as string) || 0) / 2
          ? "Well done!"
          : "Try better next time!"}
      </p>
      <button
        onClick={() => router.push("/trivia")}
        className="mt-4 px-6 py-2 bg-white text-red-500 rounded-lg shadow-lg hover:bg-gray-200 transition"
      >
        Try Again
      </button>
    </div>
  );
};

export default ScorePage;
