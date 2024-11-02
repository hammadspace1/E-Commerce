import dbConnect from "@/lib/connection/dbConnection";
import { Product } from "@/lib/models/product.model";
import { NextResponse } from "next/server";


export async function POST(request){
    try {
        const {productId} = await request.json();
        await dbConnect();

        const product = await Product.findById(productId).select("comments");
        const comments = await product.comments

        if(comments.length > 0){
            return NextResponse.json({message: "All Comment Fetched!",
                success: true,
                data: comments
            },
            {
                status: 201
            }
            )
        }else{
            return NextResponse.json({message: "No Comments to Show",
                success: true
            },
            {
                status: 201
            }
            )
        }
        
    } catch (error) {
        return NextResponse.json({message: "Something went wrong",
            success: false
        },
        {
            status: 401
        }
        )
    }
}