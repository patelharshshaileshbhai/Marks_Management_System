import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const teacherSchema = new mongoose.Schema({
    facultyname: {
        type: String,
        required: true,
        
    },
    email: {
        type: String,
        required: true,
       
    },
    department:{
        type: String,
        enum:["CE","IT","ME","CL"],
        required: true,
    },
    secureCode: {
        type: String,
        required: true,
        
        
    },
},{
    timestamps: true
})
teacherSchema.pre("save", async function (next) {
    if(!this.isModified("secureCode")) return next();

    this.secureCode = await bcrypt.hash(this.secureCode, 10)
    next()
})
teacherSchema.methods.isPasswordCorrect = async function(secureCode){
    return await bcrypt.compare(secureCode, this.secureCode)
}
teacherSchema.methods.generateToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullname: this.fullname,
            secureCode: this.secureCode
        },
        process.env.TOKEN_SECRET,
        {
            expiresIn: process.env.TOKEN_EXPIRY
        }
    )
}
export default mongoose.model("Teacher", teacherSchema)