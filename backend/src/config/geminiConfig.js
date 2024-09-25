import GeminiAPI from "gemini-api";

const configureGemini = () => {
  return new GeminiAPI({
    apiKey: process.env.API_KEY, // Replace with your Gemini API key
  });
};

export default configureGemini;
