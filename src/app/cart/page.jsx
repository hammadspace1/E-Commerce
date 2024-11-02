'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useUser } from '../Context/store';
import toast from 'react-hot-toast';
import axios from 'axios';
import Loading from '../loading';
import { RiCloseLargeLine } from "react-icons/ri";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [fetch, setFetch] = useState(false)

  const { cart, setCart } = useUser();

  // useEffect(() => {
  //   if (cart.length > 0) {
  //     setIsLoading(true)
  //     axios.post("http://localhost:3000/api/getCartItems", cart).then((response) => (
  //       toast.success(response.data.message),
  //       setCartItems(response.data.data)
  //     )).catch((error) => (
  //       toast.error(error)
  //     ))
  //     setIsLoading(false);
  //   }

  // }, [])

  useEffect(() => {
    if (cart.length > 0) {
      const total = cart.reduce((accumulator, item) => accumulator + item.productPrice, 0);
      setTotalPrice(total);
    }

  }, [fetch])

  const removeItem = (id) => {
    setCart(prev => prev.filter(item => item._id !== id));
    setFetch(() => prev => !prev);
  }
  

  return (
    <div>
      {isLoading && <Loading />}
      <div className="p-6 w-full h-screen md:px-[20rem] px-3 mt-16">
        <h1 className="text-3xl font-bold mb-6 font-serif text-center">Shopping Cart</h1>

        {cart.length == 0 ? (
          <p className="text-center text-gray-600">Your cart is empty.</p>
        ) : (
          <div>
            <ul className="divide-y divide-gray-300">
              {cart.map((data, index) => (
                <div key={index}>
                  <li className="flex justify-between items-center py-4">
                    <div className="flex items-center">
                      <img className="w-[64px] h-[64px] rounded-lg object-cover mr-4" src={data.productImage.slice(0, data.productImage.length - 8)} alt="productImage" />
                      <div>
                        <h2 className="font-semibold">{data.productName}</h2>
                        <p className="text-gray-500">PKR:{data.productPrice}</p>
                      </div>
                    </div>
                    <button onClick={() => removeItem(data._id)} className="text-red-600 text-[1.5rem] hover:text-red-800"><RiCloseLargeLine /></button>
                  </li>
                </div>
              ))}


            </ul>

            <div className="mt-6 flex justify-between items-center">
              <h2 className="text-xl font-bold">Total: PKR {totalPrice}</h2>
              <Link href="">
                <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
