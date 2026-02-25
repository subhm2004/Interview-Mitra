import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    credits:{
        type:Number,
        default:100
    },
    photoUrl: { type: String, default: "" },
    streak: { type: Number, default: 0 },
    lastPracticeDate: { type: Date, default: null },
    badges: { type: [String], default: [] },
}, {timestamps:true})

const User = mongoose.model("User" , userSchema)

export default User