import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type : String,
        unique: true,
        required: [true,"please provide a username"]
    },
    dob:{
        type: String,
        required : [true, "please provide a dob"],
        unique : true
    },
    email:{
        type: String,
        required : [true, "please provide a email"],
        unique : true
    },
    password:{
        type: String,
        required:[true,"please provide a password"]
    },
    isVerified:{
        type : Boolean,
        default: false
    },
    isAdmin:{
        type: Boolean,
        default : false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry:Date,
    verifytoken:String,
    VerifyTokenExpiry:Date
})

const User = mongoose.models.users || mongoose.model("users",userSchema)
export default User;