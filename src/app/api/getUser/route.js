import dbConnect from "@/lib/connection/dbConnection";
import User from "@/lib/models/user.model";
import { NextResponse } from "next/server";

export async function POST(request){

const {userId} = await request.json();

await dbConnect()

try {

    const user = await User.findById(userId)

    if(user){
        return NextResponse.json({
            message: "User Fetched Successfully",
            success: true,
            data: user
        },{
            status: 201
        })
    }else{
        return NextResponse.json({
            message: "User didnot fetch",
            success: false
        },{
            status: 401
        })
    }
    
} catch (error) {
    return NextResponse.json({
        message: "something went wrong",
        success: false
    },{
        status: 401
    })
}



}