import { Mark } from "../model/Marks.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Student } from "../model/Student.js";
import  Teacher from "../model/Teacher.js";
export const getAllStudentBySemesterAndBranch= asyncHandler(async (req, res) => {

    const {semester,branch}=req.params;

    if(!semester || !branch){
        throw new ApiError(400, "Semester and branch are required")
    }

    const data=await Student.find({semester:semester,branch:branch}).select("-password");
    console.log(data);
    res.status(200).json(new ApiResponse(200,data,"Data fetched successfully"))

})

export const getStudentByEnrolment = asyncHandler(async (req, res) => {

    const { enrollment } = req.params;
    const data = await Student.findOne({enrollment:enrollment}).select("-password");

    if (!data) {
        throw new ApiError(404, "No records found for this enrolment number");
    }

    res.status(200).json(new ApiResponse(200, data, "Data fetched successfully"));
})

export const getDepartmentStudents= asyncHandler(async (req, res) => {
    const {branch}=req.params;
     const student=await Student.find({branch:branch}).select("-password");
     if(!student){
        throw new ApiError(404, "No records found for this department");
     }

     res.status(200).json(new ApiResponse(200,student,"Students fetched successfully"))

 })


export const getSemesterStudent= asyncHandler(async (req, res) => {

    const {semester}=req.params;
    const student=await Student.find({semester:semester}).select("-password");
    if(!student){
       throw new ApiError(404, "No records found for this semester");
    }

    res.status(200).json(new ApiResponse(200,student,"Students fetched successfully"))
})


export const getAllStudents= asyncHandler(async (req, res) => {
    
    const student=await Student.find({}).select("-password");
    if(!student){
        throw new ApiError(404, "No records found");
    }    
    res.status(200).json(new ApiResponse(200,student,"Students fetched successfully"))
})

export const getAllFaculties= asyncHandler(async (req, res) => {
    const faculty=await Teacher.find({}).select("-secureCode");
    if(!faculty){
        throw new ApiError(404, "No records found");
    }    
    res.status(200).json(new ApiResponse(200,faculty,"Faculties fetched successfully"))

})

export const getDepartmentFaculties= asyncHandler(async (req, res) => {

    const {department}=req.params;
     const faculty=await Teacher.find({department:department}).select("-secureCode");
 
     if(!faculty){
         throw new ApiError(404, "No records found for this department");
     }
 
     res.status(200).json(new ApiResponse(200,faculty,"Faculty fetched successfully"))
 })