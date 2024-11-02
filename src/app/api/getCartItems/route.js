import dbConnect from "@/lib/connection/dbConnection";
import { Product } from "@/lib/models/product.model";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function POST(request) {
    const cart = await request.json();

    try {
        await dbConnect();

        const products = await Product.find({
            _id: { $in: cart.map(_id => new ObjectId(_id)) }
        });

        if (products.length > 0) {
            return NextResponse.json({
                message: "Cart Products Fetched!",
                success: true,
                data: products
            }, {
                status: 200 
            });
        } else {
            return NextResponse.json({
                message: "No products found for the provided IDs.",
                success: false
            }, {
                status: 404 
            });
        }

    } catch (error) {
        console.error(error);
        return NextResponse.json({
            message: "An Error Occurred while Fetching the Cart Products!",
            success: false
        }, {
            status: 500
        });
    }
}






// import dbConnect from "@/lib/connection/dbConnection";
// import { Product } from "@/lib/models/product.model";
// import { NextResponse } from "next/server";


// export async function POST(request) {

//     const cart = await request.json();

//     try {
//         await dbConnect();

//         const products = await Product.find({
//             _id: { $in: cart.map(_id => new ObjectId(_id)) }
//         }).toArray();

//         if(products){
//             return NextResponse.json({
//                 message: "Cart Products Fetched!",
//                 success: true,
//                 data: products
//             },
//                 {
//                     status: 201
//                 }
//             )
//         }else{
//             return NextResponse.json({
//                 message: "Cart Products not Fetched!",
//                 success: false
//             },
//                 {
//                     status: 401
//                 }
//             )
//         }

//     } catch (error) {
//         return NextResponse.json({
//             message: "An Error Occured while Fetching the Cart Products!",
//             success: false
//         },
//             {
//                 status: 500
//             }
//         )
//     }

// }