import Link from "next/link";
import Layout from "../../components/Layout";

const WelcomePage = () => {
  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-6">Welcome to the Trivia Game!</h1>
      <Link href="/trivia/choose-options">
        <button className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition">
          Choose Options
        </button>
      </Link>
    </Layout>
  );
};

export default WelcomePage;
