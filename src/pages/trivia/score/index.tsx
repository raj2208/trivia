import { useRouter } from "next/router";
import Layout from "../../../components/Layout";

const ScorePage = () => {
  const router = useRouter();
  const { score, total } = router.query;

  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-6">Quiz Completed!</h1>
      <p className="text-lg mb-4">
        Your Score: {score} out of {total}
      </p>
      <p className="text-lg">
        {score && parseInt(score) >= (parseInt(total as string) || 0) / 2
          ? "Well done!"
          : "Try better next time!"}
      </p>
      <button
        onClick={() => router.push("/trivia")}
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition"
      >
        Try Again
      </button>
    </Layout>
  );
};

export default ScorePage;
