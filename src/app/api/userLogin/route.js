import dbConnect from "@/lib/connection/dbConnection";
import User from "@/lib/models/user.model";
import { sendEmail } from "@/utils/nodemailer";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";


export async function GET() {

}

export async function POST(request) {
    const { email, password } = await request.json();

    await dbConnect();

    const existingUser = await User.findOne({ email: email }); 
    // "email" || true "password" || anything

    if (existingUser) {
        const isPasswordValid = await bcrypt.compare(password, existingUser.password) 

        if (isPasswordValid) {
            const isVerified = await existingUser.isVerified;

            if (isVerified == true) {
                const token = await existingUser.token;
                const response = NextResponse.json({
                    message: "User Logged In Successfully",
                    data: existingUser,
                    success: true
                }, {
                    status: 201
                });
                response.cookies.set("token", token);
                return response;

            } else {
                const verificationCode = Math.floor(100000 + Math.random() * 900000);

                existingUser.verificationCode = verificationCode;
                await existingUser.save();

                await sendEmail({ email, emailType: "verify", userId: verificationCode });

                return NextResponse.json({
                    message: "Please Enter Your Verification Code",
                    success: true,
                    data: existingUser
                }, {
                    status: 201
                })
            }
        } else {
            return NextResponse.json({ message: "Email or Password is Incorrect!" },
                { success: false },
                { status: 401 })
        }
    } else {
        return NextResponse.json({ message: "Email or Password is Incorrect!" },
            { success: false },
            { status: 401 })
    }

}