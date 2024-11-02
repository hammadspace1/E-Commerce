import dbConnect from "@/lib/connection/dbConnection";
import User from "@/lib/models/user.model";
import { imageHandler } from "@/utils/imageHandler";
import bcrypt from "bcryptjs/dist/bcrypt";
import { NextResponse } from "next/server";


export async function POST(request) {

    const { userId, profileImage, userName, email, oldPassword, newPassword } = await request.json();

    await dbConnect();


    let encryptedPassword = '';
    let filter = {};

    if (oldPassword !== undefined) {
        const existingUser = await User.findById(userId);
        const existingPassword = await bcrypt.compare(oldPassword, existingUser.password)

        if (existingPassword) {
            encryptedPassword = await bcrypt.hash(newPassword, 10);
            if (profileImage) {
                const image = await imageHandler({ image: profileImage })
                filter = {
                    name: userName,
                    email: email,
                    profileImage: image,
                    password: encryptedPassword
                }
            } else {
                filter = {
                    name: userName,
                    email: email,
                    password: encryptedPassword
                }
            }

        } else {
            return NextResponse.json({
                message: "Password didn't match ",
                success: true
            },
                {
                    status: 401
                })
        }

    } else {
        if (profileImage) {
            const image = await imageHandler({ image: profileImage })
            filter = {
                name: userName,
                email: email,
                profileImage: image
            }
        } else {
            filter = {
                name: userName,
                email: email
            }
        }
    }

    const user = await User.findByIdAndUpdate(userId, filter)

    if (user) {
        return NextResponse.json({
            message: "User Info Updated Successfully",
            success: true,
            data: user
        },
            {
                status: 201
            })
    } else {
        return NextResponse.json({
            message: "User Info not Updated ",
            success: false
        },
            {
                status: 401
            })
    }
}