import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';
import helmet from 'helmet'; // Add security middleware
import authRoutes from "../src/routes/Auth.js";
import facultyRoutes from "../src/routes/faculty.js";
import studentRoutes from "../src/routes/student.js";
import adminRoutes from "../src/routes/admin.js";
import chatRoutes from "../src/routes/chatRoutes.js";
import chatRoutesFaculty from "../src/routes/chatRoutesFaculty.js";

dotenv.config();

const app = express();

// Path management
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet()); // Security middleware
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/faculty', facultyRoutes);
app.use('/api/v1/student', studentRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/chat', chatRoutes);
app.use('/api/v1/chat-faculty', chatRoutesFaculty);

// Default route for unknown routes (optional)
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Error Handling Middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Export app
export { app };
