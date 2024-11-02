import dbConnect from "@/lib/connection/dbConnection";
import { Product } from "@/lib/models/product.model";
import User from "@/lib/models/user.model";
import { imageHandler } from "@/utils/imageHandler";
import { NextResponse } from "next/server";

export async function GET(){
    
    await dbConnect();
    try {
        const allProducts = await Product.find({status: false});

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

export async function POST(request){
    const{productName, productDescription, productOwnerId, productCategory, productPrice, productImage} = await request.json();
    await dbConnect();
    let image = '';
    // let userImage = '';

    const userInfo = await User.findById(productOwnerId);
    const username = await userInfo.name;
    const userProfileImage = await userInfo.profileImage;
    if(productImage){
        image = await imageHandler({image: productImage})
    }
    // if(userInfo.profileImage){
    //     userImage = await userInfo.profileImage
    // }
    try {
        const newProduct = await new Product({
            productName,
            productDescription,
            productImage: image,
            productOwnerId,
            username,
            userProfileImage,
            productCategory,
            productPrice,
            date: new Date()
        })

        await newProduct.save();
        return NextResponse.json(
            {
                success: true,
                message: "Product Added Successfully"
            },
            {status: 201}
        )
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            {
                success: false,
                message: "This Product is not Added"

            },
            {status: 401}
        )
    }
}