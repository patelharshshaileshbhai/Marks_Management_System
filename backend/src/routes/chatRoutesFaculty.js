import express from "express";
import { isFacultyAuthenticated } from "../middleware/isFacultyAuthenicate.js";
import { deleteChatsFaculty, generateChatCompletionFaculty, sendChatsToFaculty } from "../controller/chatControllerfaculty.js";

const router = express.Router();



router.post("/new", isFacultyAuthenticated, generateChatCompletionFaculty);
router.get("/all-chats", isFacultyAuthenticated, sendChatsToFaculty);
router.delete("/delete", isFacultyAuthenticated, deleteChatsFaculty);

export default router