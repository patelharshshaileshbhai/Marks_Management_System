import mongoose from "mongoose";

const marksSchema = new mongoose.Schema({

    branch:{
        type: String,
        enum: ["CE", "IT", "ME","CL"],
        required: true
    },
    semester:{
        type: String,
        enum: ["1", "2", "3", "4", "5", "6", "7", "8"],
        required: true
    },
    subject:{
        type: String,
        required: true
    },
    marks:{
        enrolment:{
            type: Number,
            required: true

        },
        name:{
            type: String,
            required: true,
            default: "unknown"
        },
        marks:{
            type: Number,
            required: true,
            default: 0
        }
    }

},{
    timestamps: true
})

export const Mark = mongoose.model("Mark", marksSchema)