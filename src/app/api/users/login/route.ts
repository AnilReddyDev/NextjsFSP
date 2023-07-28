import {connect} from "@/dbConfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

connect()

export async function POST(request : NextRequest){
    try {
        const resBody = await request.json();
        const {email, password} = resBody;

        console.log(resBody);

        //check if user exisits
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({message:"User not found !"},{status:400})
        }

        //check for the password 
        const validPassword = await bcryptjs.compare(password,user.password);
        if(!validPassword){
            console.log("Incorrect password was entered !")
            return NextResponse.json({message:"Password not matched!"},{status:400})
        }

        //create a Tokendata
        const tokenData={
            id: user._id,
            username : user.username,
            email: user.email
        }      

        //create a token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!,
            {expiresIn:"1d"})
           
        const response = NextResponse.json({
            message:"Login successfull",
            success:true
        })

        response.cookies.set("token",token,{httpOnly:true})

        return response;

    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:400})
        
    }
}