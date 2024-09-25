import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { randomUUID } from "crypto";
const chatSchema = new mongoose.Schema({
    id: {
      type: String,
      default: crypto.randomUUID(),
    },
    role: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  });
const studentSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        
    },
    email: {
        type: String,
        required: true,
       
    },
    password: {
        type: String,
        required: true,
        
    },
    enrollment: {
        type: String,
        required: true,
        unique: true,
        
    },
    phone: {
        type: Number,
        required: true,
        
    },
    branch: {
        type: String,
        required: true,
        enum: ["CE", "IT", "ME", "CL"],
       
    },
    semester:{
        type: Number,
        required: true,
        enum: [1,2,3,4,5,6,7,8,]
      
    },
    chats: [chatSchema],
    
},
{timestamps: true})
studentSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})
studentSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}
studentSchema.methods.generateToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            enrollment: this.enrollment,
            fullname: this.fullname
        },
        process.env.TOKEN_SECRET,
        {
            expiresIn: process.env.TOKEN_EXPIRY
        }
    )
}
export const Student = mongoose.model("Student", studentSchema)