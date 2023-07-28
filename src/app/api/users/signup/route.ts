import {connect} from "@/dbConfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect()


export async function POST(request: NextRequest){
    try {
        const ReqBody = await request.json();
        const {username, email, password} = ReqBody;
        
        console.log(ReqBody);

        //check if email already exisit
        const user = await User.findOne({email});
        if(user){
            console.log("email already exsists ")
            return NextResponse.json({error:"email already exsists "},{status:400})
        }

        //hash password 
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt);

        const newUser = new User({
            username,
            email,
            password:hashedPassword
        })
        const savedUser = await newUser.save()
        console.log(savedUser)

        return NextResponse.json({
            message: "User created successfully",
            success: true
        })
        
    } catch (error : any) {
        return NextResponse.json({error : error.message},{status: 500})
        
    }
}
