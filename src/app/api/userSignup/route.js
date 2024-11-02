import dbConnect from "@/lib/connection/dbConnection";
import User from "@/lib/models/user.model";
import { sendEmail } from "@/utils/nodemailer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET(request){
    await dbConnect();

    const users = await User.find();

    return NextResponse.json({success: true, message: "All Users Fetched!!", data: users},{
        status: 201,
        })

}

export async function POST(request){

    const {name, email, password} = await request.json();
    await dbConnect();

    const existingUser = await User.findOne({email});

    if(!existingUser){

        const newPassword =await bcrypt.hash(password, 10);

        const verificationCode = Math.floor(100000 + Math.random() * 900000);

        const newUser = await new User({
            name,
            email,
            password: newPassword,
            verificationCode,
            date: new Date().toDateString()
        })

        await newUser.save();

        const token = jwt.sign(
            {id: newUser._id, email, newPassword},
             'shhhhh',
             {
                expiresIn:"24h"
             }
            );
            
        newUser.token = token;
        
        await newUser.save();
        
        await sendEmail({email, emailType: "verify", userId: verificationCode});

        return NextResponse.json({
            message: "Please Enter Your Verification Code",
            success: true,
            data: newUser
        },{
            status: 201
        })

    }else{
        return NextResponse.json({message: "User Exists Already!" },
            {success: false},
            {status:401})
    }

        
    }

