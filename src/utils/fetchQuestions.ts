// utils/fetchQuestions.ts
export const fetchQuestions = async (
  category: string,
  difficulty: string,
  numberOfQuestions: string
) => {
  const MAX_RETRIES = 3; // Maximum number of retries
  let retries = 0;

  while (retries < MAX_RETRIES) {
    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}&type=multiple`
      );

      // If we hit rate-limiting (status 429), wait and retry
      if (response.status === 429) {
        console.warn("Rate limited. Retrying...");
        retries += 1;
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait for 2 seconds before retrying
        continue; // Retry the request
      }

      if (!response.ok) {
        throw new Error("Failed to fetch questions");
      }

      const data = await response.json();

      if (data.response_code !== 0 || !data.results.length) {
        throw new Error("No questions found");
      }

      return data.results;
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching questions");
    }
  }

  throw new Error("Max retries reached. Please try again later.");
};
