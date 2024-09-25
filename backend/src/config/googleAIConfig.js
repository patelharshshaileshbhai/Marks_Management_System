import {GoogleGenerativeAI} from "@google/generative-ai"

const configureGoogleGenerativeAI = () => {
  return new GoogleGenerativeAI({
    apiKey: process.env.API_KEY, // Replace with your Google Generative AI API key
  });
};

export default configureGoogleGenerativeAI;
