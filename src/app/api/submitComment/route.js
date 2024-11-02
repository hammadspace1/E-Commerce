import dbConnect from "@/lib/connection/dbConnection";
import { Product } from "@/lib/models/product.model";
import User from "@/lib/models/user.model";
import { NextResponse } from "next/server"


export async function POST(request){

    const {productId, productComment, userId} = await request.json();


    await dbConnect()

    try {

        const user = await User.findById(userId)
        const username = await user.name;
        const userProfileImage = await user.profileImage;

        const comment = {
            user: user,
            username: username,
            userProfileImage: userProfileImage,
            text: productComment,
            date: new Date()
        }

        const productUpdate = await Product.findByIdAndUpdate(productId,
            {$push : { comments: comment}},
            {new: true}
        )

        if(!productUpdate){
            return NextResponse.json(
                {
                    success: false,
                    message: "Comment not Submitted"
                },
                {status: 401}
            )
    
        }

        return NextResponse.json(
            {
                success: true,
                message: "Comment Submitted",
                data: productUpdate
            },
            {status: 201}
        )

    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                success: false,
                message: "An Error Occured",
                error: error
            },
            {status: 401}
        )
    }
    
}