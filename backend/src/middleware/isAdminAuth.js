import Admin from "../model/Admin.js";
import jwt from "jsonwebtoken"

export const isAdminAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        if (!token) {
            return res.status(401).json({ message: "Please Login to access this resource" });
        }

        const decodedData = jwt.verify(token, process.env.TOKEN_SECRET);

        console.log(decodedData)
        req.user = await Admin.findById(decodedData._id);

        if (!req.user) {
            return res.status(401).json({ message: "User not found" });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}
