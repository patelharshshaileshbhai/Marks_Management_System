import jwt from "jsonwebtoken";
import {Student} from "../model/Student.js"; // Import your User model
import configureGoogleGenerativeAI from "../config/googleAIConfig.js";
import configureGemini from "../config/geminiConfig.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
export const generateChatCompletion = async (req, res, next) => {
  const { message } = req.body;

  try {
    const user = req.user;
    if (!user || !user._id) {
      return res.status(401).json({ message: "Student not registered" });
    }

    // Ensure that user.chats is an array
    if (!user.chats) {
      user.chats = [];
    }

    // Add the new message from the user
    const chats = user.chats.map(({ role, content }) => ({
      role,
      content,
    }));
    chats.push({ role: "user", content: message });
    user.chats.push({ role: "user", content: message });

    // Configure Google Generative AI
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Generate content using the user's message as a prompt
    const prompt = message; // Use the user's message as the prompt
    const result = await model.generateContent(prompt);

    console.log("Result:", result);
    // Push the generated response to the user's chats
    user.chats.push({ role: "assistant", content: result.response.text() });

    // Save updated user chats to the database
    await user.save();

    // Return the updated chats to the client
    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.error("Error in generateChatCompletion:", error);
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

  // Send all chats to the user
  export const sendChatsToUser = async (req, res, next) => {
    try {
      const user = req.user;
      if (!user) {
        return res.status(401).send("User not registered or token malfunctioned");
      }
      
      return res.status(200).json({ message: "OK", chats: user.chats });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "An error occurred", cause: error.message });
    }
  };
  
  // Delete all chats for the user
  export const deleteChats = async (req, res, next) => {
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