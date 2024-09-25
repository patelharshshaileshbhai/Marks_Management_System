import express from "express";
import { verifyJWT } from "../middleware/authMiddleware.js";
import { deleteChats, generateChatCompletion, sendChatsToUser } from "../controller/chatController.js";

const router = express.Router();

router.post("/new", verifyJWT, generateChatCompletion);
router.get("/all-chats", verifyJWT, sendChatsToUser);
router.delete("/delete", verifyJWT, deleteChats);

export default router