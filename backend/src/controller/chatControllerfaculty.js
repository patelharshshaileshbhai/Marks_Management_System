import jwt from "jsonwebtoken";
import  Teacher  from "../model/Teacher.js"; // Import your User model
import configureGoogleGenerativeAI from "../config/googleAIConfig.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateChatCompletionFaculty = async (req, res, next) => {
  const { prompt } = req.body;

  // Validate prompt
  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ message: "Invalid prompt" });
  }

  try {
    const user = req.user;
    if (!user || !user._id) {
      return res.status(401).json({ message: "Student not registered" });
    }

    // Initialize chats if it doesn't exist
    user.chats = user.chats || [];

    // Store user's message
    const newChat = { role: "user", content: prompt };
    user.chats.push(newChat);

    const chatHistory = user.chats.map(chat => `${chat.role}: ${chat.content}`).join('\n');

    // Configure Google Generative AI
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Generate response from AI
    // const result = await model.generateContent(prompt);
    const result = await model.generateContent(chatHistory);
    const assistantResponse = result.response.text();

    // Store assistant's response
    const assistantChat = { role: "assistant", content: assistantResponse };
    user.chats.push(assistantChat);

    // Save updated user chats to the database
    await user.save();

    // Return only the assistant's response (last chat)
    return res.status(200).json({ data:assistantResponse ,message: "OK" });
  } catch (error) {
    console.error("Error in generateChatCompletion:", error);
    return res.status(500).json({ message: "An error occurred", error: error.message });
  }
};
// Send all chats to the user
export const sendChatsToFaculty = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).send("User not registered or token malfunctioned");
    }

    return res.status(200).json({ message: "OK", chats: user.chats || [] });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred", cause: error.message });
  }
};

// Delete all chats for the user
export const deleteChatsFaculty = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).send("User not registered or token malfunctioned");
    }

    user.chats = []; // Clear the user's chats
    await user.save();

    return res.status(200).json({ message: "Chats cleared successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred while deleting chats", cause: error.message });
  }
};
