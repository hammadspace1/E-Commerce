"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loading from '../loading';
import Link from 'next/link';
import { jwtDecode } from 'jwt-decode';
import { IoIosClose } from "react-icons/io";
import toast from 'react-hot-toast';
import { useUser } from '../Context/store';
import { RiSubtractFill } from "react-icons/ri";
import { RiAddFill } from "react-icons/ri";
import { FaCartPlus } from "react-icons/fa";

export default function Products() {

  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [commentField, setCommentField] = useState(false);
  const [commentDetail, setCommentDetail] = useState({});
  const [allComments, setAllComments] = useState([]);
  const [productDetailMode, setProductDetailMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [quantity, setQuantity] = useState(1);

  const { userData, cart, setCart } = useUser();

  const commentFunction = async (e) => {
    try {
      const productId = e._id;
      await axios.post("http://localhost:3000/api/getComments", { productId }).then((response) => {
        setAllComments(response.data.data);
        console.log(allComments)
      }).catch((error) => {
        console.log(error)
      })
    } catch (error) {
      console.log(error)
    }

    setCommentField((prev) => !prev);

    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];

    if (token) {
      const decoded = jwtDecode(token);

      // const userId = userData._id;
      setCommentDetail({
        ...commentDetail, userId: decoded.id, productId: e._id
      })
    }
  };

  const handleComment = (e) => {
    setCommentDetail({
      ...commentDetail, [e.target.name]: e.target.value
    })
  }

  const submitComment = async () => {
    try {
      if (commentDetail.productId !== undefined && commentDetail.userId !== undefined && commentDetail.productComment !== undefined)
        await axios.post("http://localhost:3000/api/submitComment", commentDetail).then((response) => {
          toast.success(response.data.message)
          const productId = response.data.data._id;
          const comment = response.data.data.comments[0];
          findProductById(productId, comment);
        }).catch((error) => {
          console.log(error)
        })
    } catch (error) {
      console.log("An Error Occured", error)
    }
    setCommentField((prev) => !prev);
  }

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:3000/api/productUpload");
        setAllProducts(response.data.data)
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // const imageDownload = async (e) => {
  //   try {
  //     const response = await axios.post("http://localhost:3000/api/downloadImage", { productId: e });
  //     toast.success(response.data.message)

  //   } catch (error) {
  //     toast.error(error)
  //   }
  // }

  const getProductDetail = (data) => {
    setProductDetailMode(prev => !prev)
    setSelectedProduct(data)

  }

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    setProductDetailMode(prev => !prev)
    console.log("cartItems:", cart)
  }


  return (
    <div className='mt-16 md:mt-20'>
      {
        commentField && (
          <div className='fixed top-0 left-0  w-full h-screen backdrop-brightness-50'>
            <div className="absolute md:top-[5rem] md:left-[30rem] w-full md:w-[500px] h-screen md:h-[600px] bg-white border-2 md:rounded-3xl shadow-2xl ">
              <div className='w-full h-[550px] overflow-auto px-5'>
                <div className='flex justify-between  mt-4 md:mt-0'>
                  <h1 className='text-[#002147] text-[1.5rem] md:text-[2rem] font-semibold text-center   md:leading-10'>Comments</h1>
                  <button onClick={() => setCommentField((prev) => !prev)}><div className='text-[2.5rem] text-[#002147]'><IoIosClose /></div></button>
                </div>
                {
                  allComments ? (
                    allComments.map((data, index) => (
                      <>
                        <div key={index}>
                          <div className='flex mt-5'>
                            <div className='w-[2rem] border-2 border-[#E7E7E7] bg-[#E7E7E7] rounded-full  '>
                              <img className='w-full h-8 rounded-full object-cover' src={data.userProfileImage ? data.userProfileImage.slice(0, data.userProfileImage.length - 8) : "/images/profileimage.png"} alt="profile" />
                            </div>
                            <div className='w-[22rem] min-h-9  border-2 border-[#E7E7E7] bg-[#E7E7E7] rounded-full ml-2 px-5 py-1 '>
                              {data.text}
                            </div>

                          </div>
                          <div className='md:w-[22rem] flex justify-between text-[0.7rem] ml-[3rem] px-5'><p>{data.username}</p>{data.date.slice(0, 10)}</div>
                        </div>
                      </>
                    ))
                  ) : (
                    <div>
                      <h1 className='text-center text-[1.8rem] text-[#002147] font-bold mt-11'>No Comments to Show</h1>
                    </div>
                  )
                }

              </div>
              <div className={`flex justify-between px-5 mt-10 md:mt-0 ${userData ? "" : "hidden"}`}>
                <textarea name='productComment' onChange={handleComment} className='w-[22rem] h-9  border-2 border-[#002147] rounded-full px-5 py-1' placeholder='Enter Comment'></textarea>
                <button onClick={submitComment} className='w-[5rem] h-9  border-2 border-[#002147] bg-[#002147] text-white rounded-full px-5'>Send</button>
              </div>
            </div>
          </div>
        )
      }
      {isLoading && <Loading />}




      {productDetailMode && (
        <div className='fixed top-16 left-0  w-full h-screen bg-white overflow-auto md:overflow-hidden'>
          <div className='flex justify-between  mt-4 md:mt-2 md:px-5 px-3'>
            <h1 className='text-[#002147] text-[1.5rem] md:text-[1rem] font-serif font-semibold text-center   md:leading-10'><button onClick={() => setProductDetailMode(prev => !prev)} className='underline'>Product</button> {">>"} Product Details</h1>
            {/* <div onClick={() => setProductDetailMode(prev => !prev)} className='text-[2.5rem] text-[#002147]'><IoIosClose /></div> */}
          </div>
          <div className='w-full md:h-[30rem] h-[50rem]  md:flex md:flex-nowrap flex-wrap md:ml-[1rem] md:mr-[1rem] px-3 md:px-0 mt-5'>
            <div className='md:w-[47rem] w-full md:h-[30rem] '>
              <img className='w-full md:h-[480px] h-[320px] object-cover rounded-lg shadow-lg' src={selectedProduct.productImage.slice(0, selectedProduct.productImage.length - 8)} alt="productImage" />
            </div>
            <div className='md:w-[47rem] md:ml-[2rem] '>
              <div className="md:w-1/2 mt-5 md:mt-0">
                <h1 className="text-3xl font-bold text-gray-800">{selectedProduct.productName}</h1>
                <p className="text-lg text-gray-600 mt-2">{selectedProduct.productDescription}</p>
                <p className="text-xl font-semibold text-gray-800 mt-4">PKR:{selectedProduct.productPrice}</p>

                <div className="mt-6 ">
                  <label htmlFor="quantity" className="block text-lg font-medium text-gray-700">Quantity:</label>
                  <div className='flex'>
                    <button onClick={() => setQuantity(prev => prev - 1)} className="mt-1 border border-[#FFB606] active:bg-[#FFB606] rounded-tl-lg rounded-bl-lg text-center pr-3 p-2 w-10"><RiSubtractFill /></button>
                    <input
                      type="number"
                      value={quantity}
                      defaultValue={quantity}
                      min="1"
                      className="mt-1 border border-[#FFB606] pl-6 font-bold  py-2 w-14"
                    />
                    <button onClick={() => setQuantity(prev => prev + 1)} className="mt-1 border border-[#FFB606] active:bg-[#FFB606] rounded-tr-lg rounded-br-lg p-2 w-10"><RiAddFill /></button>
                  </div>
                </div>

                <button
                  onClick={() => handleAddToCart(selectedProduct)}
                  className="mt-4 bg-[#FFB606] text-white px-4 py-2 rounded-lg shadow hover:bg-[#dfc589] transition">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}




      <div className="">
        <div className="flex flex-col md:w-full md:ml-[27rem] ">
          {allProducts ? <h1 className='text-[#002147] font-serif mt-3 md:mt-0 text-[2rem] text-center font-bold md:ml-[-53rem] '>Our Products</h1> : ''}
          <div>
            {
              allProducts ? (
                allProducts.map((data, index) => (
                  <>
                    <div className='flex' key={index}>
                      <div className="md:w-[40rem] w-full flex-col cursor-pointer mt-11">
                        <div className='flex justify-between px-3'>
                          <h1 className='text-[1.7rem] font-semibold font-serif text-[#002147] '>{data.productName}</h1>
                          <h1 className='text-[1.1rem] text-[#002147] mt-3'>PKR: {data.productPrice}</h1>
                        </div>
                        <div className='w-full px-3'>
                          <img className='w-full h-[350px] object-cover' src={data.productImage.slice(0, data.productImage.length - 8)} alt="" />
                        </div>
                        <div className=' min-h-[3rem]  mx-3 px-1 pt-2 border-2 '>{data.productDescription}</div>
                        <div className=' flex justify-between px-3 py-2 border-b-2 mx-3 '>
                          <p className='text-[#002147] text-[1rem] font-bold '>Uploaded By: </p>
                          <div className='flex'>
                            <img className='w-6 h-6 rounded-full object-cover ' src={data.userProfileImage ? data.userProfileImage.slice(0, data.userProfileImage.length - 8) : '/images/profileimage.png'} alt="" />
                            <p className='text-[#002147] text-[0.8rem] mt-1 font-semibold ml-[0.7rem]'>{data.username ? data.username.split(' ')[0] ? data.username.split(' ')[0].toUpperCase() : data.username : "Username"}</p>
                          </div>
                        </div>
                        {/* <div className=' flex justify-between px-3 py-2 border-b-2 mx-3 '>
                      <p className='text-[#002147] text-[1rem] font-bold '>Download Image: </p>
                        <button onClick={() => imageDownload(data._id)} className='text-[#002147] text-[1rem] px-1 cursor-pointer border-2 border-red rounded-xl bg-red-500 font-bold '>Download </button>
                      </div> */}
                        <div className='flex justify-between mt-1 px-3'>
                          <button onClick={() => commentFunction(data)} className='md:w-[18rem] w-[10rem] border-2 border-[#FFB606] shadow-2xl h-10 rounded-full ' >Leave Comment</button>
                          {/* <button onClick={() => getProductDetail(data)} className="flex w-[8rem] h-10 border-1  bg-[#FFB606] rounded-lg px-1 hover:bg-[#b49245]  text-[#002147] pt-2  ">Buy Product<div className='mt-1 mr-1'><FaCartPlus /></div></button> */}
                          <button onClick={() => getProductDetail(data)} className="flex w-[8rem] h-10 border-1  bg-[#FFB606] rounded-lg  hover:bg-[#b49245] px-2 "><div className='text-[2rem] mt-1 '><FaCartPlus /></div><h3 className='text-[0.8rem] mt-3 ml-1'>Buy Product</h3></button>
                        </div>
                      </div>
                      <div className='hidden md:flex md:flex-col'>
                        <h1 className='text-[1.5rem] font-bold font-serif mt-20 '>Category: <span className='font-light'>{data.productCategory}</span > </h1>
                        <h1 className='text-[1.5rem] font-bold font-serif mt-5 '>Quantity: <span className='font-light'>10 Items</span > </h1>
                        <h1 className='text-[1.5rem] font-bold font-serif mt-5 '>Status: <span className='font-light'>Available</span > </h1>
                      </div>
                    </div>

                    <div className='w-full border-b-4 mt-3 '></div>
                  </>
                ))
              ) : (
                <div className='h-screen mt-[10rem]'>
                  <h1 className='text-red-500 text-[2rem] text-center font-bold '>No Products to Show</h1>
                </div>
              )
            }

          </div>

        </div>
      </div>
    </div>
  );
}