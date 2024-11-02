import User from "@/lib/models/user.model";
import { NextResponse } from "next/server";


export async function POST(){
    try {
        const response = NextResponse.json({message: "User Logout Successfully"},
            {success: true},
            {status:201}
        )
        response.cookies.set("token", "", {
            httpOnly: true
        });
    
        return response;
    } catch (error) {
        return NextResponse.json({message: "User is Not Logout",
            success: false
        },
    {
        status: 401
    })
    }

}