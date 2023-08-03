import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbconfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();
export async function GET(request:NextRequest){
    try {
        const userId = getDataFromToken(request)
        const userData = await User.findOne({_id:userId}).select("-password");
        return NextResponse.json({
            message:"User Found",
            data:userData
        })
        
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:400})
    }

}