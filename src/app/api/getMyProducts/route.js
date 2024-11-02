import dbConnect from "@/lib/connection/dbConnection";
import { Product } from "@/lib/models/product.model";
import { NextResponse } from "next/server";

export async function POST(request){

    const userData = await request.json()

    const id = userData._id;
    
    await dbConnect();
    try {
        const allProducts = await Product.find({productOwnerId: id, status: false});

        if(allProducts.length > 0){
            return NextResponse.json(
                {
                    success: true,
                    message: "All Products Fetched Successfully",
                    data: allProducts
                },
                {status: 201}
            )
        }else{
            return NextResponse.json(
                {
                    success: true,
                    message: "No Products to Show"
                },
                {status: 201}
            )
        }
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "An Error Occured White Fetching the Products"
            },
            {status: 401}
        )
    }
}