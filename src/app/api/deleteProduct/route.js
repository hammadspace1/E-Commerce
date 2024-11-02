import dbConnect from "@/lib/connection/dbConnection";
import { Product } from "@/lib/models/product.model";
import { NextResponse } from "next/server";


export async function POST(request) {

    const { id } = await request.json();

    await dbConnect();

    const filter = {
        status: true
    }

    const product = await Product.findByIdAndUpdate(id, filter);

    if (product.status === true) {
        return NextResponse.json({
            message: "Product Deleted Successfully",
            success: true
        }, {
            status: 201
        })
    }else{
        return NextResponse.json({
            message: "Product is not Deleted",
            success: false
        }, {
            status: 401
        })
    }

}