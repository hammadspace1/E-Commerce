import dbConnect from "@/lib/connection/dbConnection";
import User from "@/lib/models/user.model";
import { NextResponse } from "next/server";


export async function POST(request) {
    const { verificationCode, userId } = await request.json();

    await dbConnect();

    try {
        const user = await User.findById(userId);
        const storedKey = await user.verificationCode;

        if (verificationCode === storedKey) {
            user.isVerified = true
            await user.save();


            return NextResponse.json({ message: "User Verified Successfully",
                data: user
             },
                { success: true },
                { status: 201 }
            )
        } else {

            return NextResponse.json({ message: "Please Try Again" },
                { success: false },
                { status: 401 })
        }

    } catch (error) {
        return NextResponse.json({ message: "Something Went Wrong", error },
            { success: false },
            { status: 401 })
    }
}