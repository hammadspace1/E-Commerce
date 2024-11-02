import dbConnect from "@/lib/connection/dbConnection";
import { Product } from "@/lib/models/product.model";
import { imageHandler } from "@/utils/imageHandler";
import { NextResponse } from "next/server";


export async function POST(request) {

    const { productId, productName, productDescription, productPrice, productImage } = await request.json();
    await dbConnect();

    let filter = {
        productName: productName,
        productDescription: productDescription,
        productPrice: productPrice,
    }

    if(productImage){
        const image = await imageHandler({image: productImage})

        filter = {
            productName: productName,
            productDescription: productDescription,
            productPrice: productPrice,
            productImage: image
        }
    }


    const product = await Product.findByIdAndUpdate(productId, filter)

    if(product){
        return NextResponse.json({
            message: "Product Updated Successfully",
            success: true
        },
            {
                status: 201
            })
    }else{
        return NextResponse.json({
            message: "Product not Updated ",
            success: true
        },
            {
                status: 201
            })
    }

    
}