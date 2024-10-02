import { useRouter } from "next/router";

const WelcomePage = () => {
  const router = useRouter();

  const goToOptions = () => {
    router.push("/trivia/choose-options");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-500 text-white">
      <h1 className="text-4xl font-bold mb-6">Welcome to the Trivia Game!</h1>
      <button
        onClick={goToOptions}
        className="px-6 py-2 bg-white text-blue-500 rounded-lg shadow-lg hover:bg-gray-200 transition"
      >
        Choose Options
      </button>
    </div>
  );
};

export default WelcomePage;
