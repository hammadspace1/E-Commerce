import { Product } from '@/lib/models/product.model';
import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import fs from 'fs';

export async function POST(request) {
    const { productId } = await request.json();

    try {
        const product = await Product.findById(productId);
        
        if (!product) {
            return NextResponse.json({
                message: "Product not found!",
                success: false
            }, {
                status: 404
            });
        }

        const image = await product.productImage; // Ensure this is valid image data

        // Create a proper path to save the image
        const savePath = path.join(process.cwd(), 'public', 'images', 'Downloaded_Images', 'myimage.jpg');

        // Ensure the directory exists
        await fs.promises.mkdir(path.dirname(savePath), { recursive: true });

        // Write the image file

        // await writeFile(savePath, image);

        return NextResponse.json({
            message: "Image Downloaded Successfully!",
            success: true
        }, {
            status: 201
        });

    } catch (error) {
        console.error('Error downloading image:', error);
        return NextResponse.json({
            message: "Image not Downloaded Successfully!",
            success: false
        }, {
            status: 500 // Use 500 for server errors
        });
    }
};
