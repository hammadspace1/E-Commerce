"use client"
// pages/productDetail.js
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

const ProductDetail = () => {
//   const [quantity, setQuantity] = useState(1);
//   const router = useRouter();

//   const handleAddToCart = () => {
//     // Logic to add the product to cart
//     console.log(`Added ${quantity} of ${product.name} to cart`);
//     // Redirect or show a success message
//   };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row md:space-x-10">
        <div className="md:w-1/2">
          <Image
            src=''
            alt=''
            width={500}
            height={500}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-1/2 mt-5 md:mt-0">
          <h1 className="text-3xl font-bold text-gray-800">productName</h1>
          <p className="text-lg text-gray-600 mt-2">productDiscription</p>
          <p className="text-xl font-semibold text-gray-800 mt-4">$:price</p>

          <div className="mt-6">
            <label htmlFor="quantity" className="block text-lg font-medium text-gray-700">Quantity:</label>
            <input
              type="number"
              id="quantity"
              value=''
            //   onChange={(e) => setQuantity(e.target.value)}
              min="1"
              className="mt-1 border border-gray-300 rounded-lg p-2 w-20"
            />
          </div>

          <button
            // onClick={handleAddToCart}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <button
        onClick={() => router.back()}
        className="mt-6 text-blue-600 underline"
      >
        Back to Products
      </button>
    </div>
  );
};

// Example product data
// export const getServerSideProps = async (context) => {
//   // Fetch product data based on the product ID passed in the URL
//   const productId = context.query.id;
//   const product = {
//     id: productId,
//     name: "Sample Product",
//     description: "This is a great product.",
//     price: 29.99,
//     image: "/path/to/image.jpg", // Update this with the actual image path
//   };

//   return {
//     props: { product },
//   };
// };

export default ProductDetail;
