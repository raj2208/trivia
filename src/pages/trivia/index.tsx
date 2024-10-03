import Link from "next/link";
import Layout from "../../components/Layout";

const WelcomePage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center py-6">
        <h1 className="text-5xl font-extrabold mb-8 text-center">
          Welcome to the Trivia Game!
        </h1>
        <p className="text-lg mb-12 text-center">
          Test your knowledge with fun and challenging trivia questions across
          various categories.
        </p>
        <Link href="/trivia/choose-options">
          <button className="px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition">
            Choose Options
          </button>
        </Link>
      </div>

      {/* Features Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto text-center px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Features</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">
                Multiple Categories
              </h3>
              <p className="text-gray-600">
                Choose from a variety of trivia categories to test your
                knowledge.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">
                Various Difficulty Levels
              </h3>
              <p className="text-gray-600">
                Select from easy, medium, or hard questions to match your skill
                level.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">
                Timed Quiz Options
              </h3>
              <p className="text-gray-600">
                Challenge yourself with timed quizzes to test your quick
                thinking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center">
        <p className="text-lg">© 2024 Trivia Game. All rights reserved.</p>
      </footer>
    </Layout>
  );
};

export default WelcomePage;
