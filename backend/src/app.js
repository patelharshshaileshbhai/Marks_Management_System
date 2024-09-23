import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import authRoutes from "../src/routes/Auth.js"
import facultyRoutes from "../src/routes/faculty.js"
import studentRoutes from "../src/routes/student.js"
import adminRoutes from "../src/routes/admin.js"
dotenv.config()

const app = express()




app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))


app.use(cors({
    CORS_ORIGIN:"http://localhost:5173",
    // origin: process.env.CORS_ORIGIN,
    credentials: true
}))





app.use(express.static("public"))
app.use(cookieParser())

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/faculty', facultyRoutes)
app.use('/api/v1/student', studentRoutes)
app.use('/api/v1/admin', adminRoutes)
//routes import

//routes declaration

// http://localhost:8000/api/v1/users/register

export { app }