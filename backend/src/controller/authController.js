import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { Student } from "../model/Student.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";
import Teacher from "../model/Teacher.js";
import Admin from "../model/Admin.js";


const generateAccessTokens = async(student) =>{
    try {
        
        const token = student.generateToken()
        await student.save({ validateBeforeSave: false })

        return {token}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}



//<-------------------------------------------Student----------------------------------------------------------------->
 export const registerStudent = asyncHandler(async (req, res) => {

    const { fullname, email, enrollment, phone, branch, semester,password,gender } = req.body
    //console.log("email: ", email);

    // if(!fullname || !email || !enrollment || !phone || !branch || !semester || !password){
    //     throw new ApiError(400, "All fields are required");
    // }
    if(
        [fullname, email, enrollment, phone, branch, semester, password,gender].some(
            (field) => !field 
        )){
            throw new ApiError(400, "All fields are required");
        }
    

    const existedStudent = await Student.findOne({
        $or: [{ enrollment }, { email }]
    })

    if (existedStudent) {
        throw new ApiError(409, "Student with email or enrollment already exists")
    }
    

    const student= await Student.create({
        fullname,
        email,
        enrollment,
        phone,
        branch,
        semester,
        password,
        gender
    })

    const createdStudent = await Student.findById(student._id).select(
        "-password "
    )

    if (!createdStudent) {
        throw new ApiError(500, "Something went wrong while registering the student")
    }

    return res.status(201).json(
        new ApiResponse(200, createdStudent, "Student registered Successfully")
    )

})
export const loginStudent = asyncHandler(async (req, res) =>{
    
    const { enrollment, email, password } = req.body;

    
    const student = await Student.findOne({
        $or: [{enrollment}, {email}]
    })

    if (!student) {
        throw new ApiError(404, "student does not exist")
    }

   const isPasswordValid = await student.isPasswordCorrect(password)

   if (!isPasswordValid) {
    throw new ApiError(401, "Invalid student credentials")
    }

   const {token} = await generateAccessTokens(student)

    const loggedInStudent = await Student.findById(student._id).select("-password ")

    console.log(loggedInStudent)
    console.log(student._id)
    const options = {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    }

    return res
    .status(200)
    .cookie("token", token, options)
    .json(
        new ApiResponse(
            200, 
            {
                student: loggedInStudent,token
            },
            "Student logged In Successfully"
        )
    )

})


export const getStudentProfile = asyncHandler(async (req, res) => {
    const student = await Student.findById(req.user._id).select("-password ")

    console.log(student.fullname)
    console.log(student.createdAt.getTime())
    if (!student) {
        throw new ApiError(404, "Student not found")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(
            200, 
            {
                student
            },
            "Student profile fetched successfully"
        )
    )
})

export const logoutStudent = asyncHandler(async(req, res) => {
    await Student.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                token: "",// this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("token", options)
    .json(new ApiResponse(200, {}, "Student logged Out"))
})

export const teacherSignup = asyncHandler(async (req, res) => {
    const {facultyname, email,secureCode,department} = req.body

    if(
        [facultyname, email, secureCode, department ].some(
            (field)=> !field
        )
    ){
        throw new ApiError(400, "All fields are required")
    }

    const existedTeacher = await Teacher.findOne({email})

    if(existedTeacher){
        throw new ApiError(409, "Teacher with email already exists")
    }

    const teacher=new Teacher({
        facultyname,
        email,
        secureCode,
        department
    })
   
    await teacher.save();
    const savedTeacher = await Teacher.findById(teacher._id).select("-password ")

    if(!savedTeacher){
        throw new ApiError(500, "Something went wrong while registering the teacher")
    }

    return res.status(201).json(new ApiResponse(201, savedTeacher , "Teacher registered successfully"))
})

export const teacherLogin = asyncHandler(async (req, res) => {
    const {email,secureCode} = req.body

    if(
        [email, secureCode ].some(
            (field)=> !field
        )
    ){
        throw new ApiError(400, "All fields are required")
    }

    const existedFaculty = await Teacher.findOne({email})

    if(!existedFaculty){
        throw new ApiError(409, "Teacher with email does not exist")
    }
    const isPasswordValid = await existedFaculty.isPasswordCorrect(secureCode)

    if (!isPasswordValid) {
     throw new ApiError(401, "Invalid faculty credentials")
     }
 
    const {token} = await generateAccessTokens(existedFaculty)
 
     const loggedInFaculty = await Teacher.findById(existedFaculty._id).select("-secureCode ")
     const options = {
         httpOnly: true,
         secure: true
     }
 
     return res
     .status(200)
     .cookie("token", token, options)
     .json(
         new ApiResponse(
             200, 
             {
                 existedFaculty: loggedInFaculty,token
             },
             "You are logged In Successfully"
         )
     )
})
export const logoutFaculty= asyncHandler(async(req, res) => {
    console.log("hello");
    
    await Teacher.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                token: "",// this removes the field from document
            }
        },
        {
            new: true
        }
    )

    // const options = {
    //     httpOnly: true,
    //     secure: true
    // }

    return res
    .status(200)
    // .clearCookie("token", options)
    .json(new ApiResponse(200, {}, "Teacher logged Out"))
})
// export const logoutTeacher = asyncHandler(async (req, res) => {
//     await Teacher.findByIdAndUpdate(
//         req.user._id,
//         {
//             $unset: {
//                 token: "", // This removes the field from the document
//             }
//         },
//         {
//             new: true
//         }
//     );

//     const options = {
//         httpOnly: true,
//         secure: true // Ensure this is true if you are using HTTPS
//     };

//     return res
//         .status(200)
//         .clearCookie("token", options)
//         .json(new ApiResponse(200, {}, "Faculty logged out successfully"));
// });

// In your authController.js
// export const logoutTeacher = asyncHandler(async (req, res) => {
//     // Clear the cookie or session as per your authentication strategy
//     res.clearCookie("token"); // Adjust the cookie name as necessary
//     return res.status(200).json({ message: "Logged out successfully" });
// });



export const adminLogin = asyncHandler(async (req, res) => {
    const {email,password} = req.body

    if(
        [email, password ].some(
            (field)=> !field
        )
    ){
        throw new ApiError(400, "All fields are required")
    }

    const admin = await Admin.findOne({email})

    if(!admin){
        throw new ApiError(409, "admin not found")
    }
    const isPasswordValid = await admin.isPasswordCorrect(password)

    if (!isPasswordValid) {
     throw new ApiError(401, "Invalid faculty credentials")
     }
 
    const {token} = await generateAccessTokens(admin)
 
     const loggedInAdmin = await Admin.findById(admin._id).select("-password ")
 
     const options = {
         httpOnly: true,
         secure: true
     }
 
     return res
     .status(200)
     .cookie("token", token, options)
     .json(
         new ApiResponse(
             200, 
             {
                 admin: loggedInAdmin,token
             },
             "You are logged In Successfully"
         )
     )
})


export const adminLogout= asyncHandler(async(req, res) => {
    console.log("hello");
    
    await Admin.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                token: "",// this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("token", options)
    .json(new ApiResponse(200, {}, "Admin logged Out"))
})