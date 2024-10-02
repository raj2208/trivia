import { useRouter } from "next/router";

const WelcomePage = () => {
  const router = useRouter();

  const goToOptions = () => {
    router.push("/trivia/choose-options");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to the Trivia Game!</h1>
      <button
        onClick={goToOptions}
        style={{ padding: "10px 20px", marginTop: "20px" }}
      >
        Choose Options
      </button>
    </div>
  );
};

export default WelcomePage;
