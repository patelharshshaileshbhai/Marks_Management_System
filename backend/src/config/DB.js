import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDB = async () => {
    try {
        const uri=`${process.env.MONGO_URI}/${DB_NAME}`
        console.log(`${process.env.PORT}`)
        console.log(`connecting to ${uri}`)
        const connectionInstance = await mongoose.connect(uri,{
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        console.log(`\n MongoDB connected ✌️ `);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}

export default connectDB