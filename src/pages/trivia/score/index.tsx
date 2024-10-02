import { useRouter } from "next/router";

const ScorePage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-red-500 to-yellow-500 text-white">
      <h1 className="text-4xl font-bold mb-6">Quiz Completed!</h1>
      <p className="text-lg">Well done! You scored X out of Y!</p>
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
