import { useRouter } from "next/router";

const ScorePage = () => {
  const router = useRouter();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Quiz Completed!</h1>
      <p>Well done! You scored X out of Y!</p>
      <button
        onClick={() => router.push("/trivia")}
        style={{ padding: "10px 20px", marginTop: "20px" }}
      >
        Try Again
      </button>
    </div>
  );
};

export default ScorePage;
