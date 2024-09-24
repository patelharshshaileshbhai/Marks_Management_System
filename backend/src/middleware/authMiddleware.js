import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { Student } from "../model/Student.js";

export const verifyJWT = asyncHandler(async(req, _, next) => {
    try {
        const token =  req.header("Authorization")?.replace("Bearer ", "")
       

        console.log(token)
        
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
        console.log(decodedToken);
    
        const student = await Student.findById(decodedToken?._id).select("-password")
    
        if (!student) {
            
            throw new ApiError(401, "Invalid Access Token")
        }
    
        req.user = student;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
    
})