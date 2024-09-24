import Teacher from "../model/Teacher.js";
import jwt from "jsonwebtoken"

export const isFacultyAuthenticated = async (req, res, next) => {

    try {

        console.log("hello")
        // const token = req.cookies?.accessToken

        const token=req.header("Authorization")?.replace("Bearer ","")
        
        console.log(token)

        if (!token) {
            return res.status(401).json({ message: "Please Login to access this resource" });
        }

        console.log("hello2")
        const decodedData = await jwt.verify(token, process.env.TOKEN_SECRET);
        

        const faculty = await Teacher.findById(decodedData?._id).select("secureCode");

        if (!faculty) {
            return res.status(401).json({ message: "Invalid Access Token" });
        }

        req.user = faculty;

        // if (!req.user) {
        //     return res.status(401).json({ message: "User not found" });
        // }

        next();
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}