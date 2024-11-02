"use client"

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import { productUploadSchema } from '@/components/productUploadSchema';
import Loading from '../loading';
import { useDropzone } from 'react-dropzone';
import DataTable from 'react-data-table-component';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import Link from 'next/link';
import toast from 'react-hot-toast';
import { usePathname, useRouter } from 'next/navigation';
import { useUser } from '../Context/store';
import { ClipLoader } from 'react-spinners';
import styles2 from './createProduct.module.css';
import { IoMenuOutline } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { FaCartPlus } from "react-icons/fa";
import { RiAddFill } from "react-icons/ri";
import { RiSubtractFill } from "react-icons/ri";


const initialValues = {
  productName: "",
  productDescription: "",
  productImage: "",
  productPrice: ""
}

function Admin() {
  const [userId, setUserId] = useState('');
  const [myProducts, setMyProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [shouldFetch, setshouldFetch] = useState(false);
  const [adminButton, setAdminButton] = useState("dashboard");
  const [allProducts, setAllProducts] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [editedProductImagePreview, setEditedProductImagePreview] = useState(null);
  const [editedUserImagePreview, setEditedUserImagePreview] = useState(null);
  const [productEditMode, setProductEditMode] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editedProductData, setEditedProductData] = useState({});
  const [userUpdatedData, setUserUpdatedData] = useState({});
  const [commentField, setCommentField] = useState(false);
  const [commentDetail, setCommentDetail] = useState({});
  const [allComments, setAllComments] = useState([]);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [menuButton, setMenuButton] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordtype, setPasswordType] = useState('password');
  const [userButton, setUserButton] = useState(false);
  const [passwordField, setPasswordField] = useState(false)


  const router = useRouter();
  const pathName = usePathname();

  const { userData, setUserData, cart, setCart } = useUser();

  useEffect(() => {
    if (!userData.isAdmin) {
      router.push("/")
    }
  }, [])

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
  }, [shouldFetch]);


  const tableHeading = [
    {
      name: 'Image',
      cell: row => (
        <img
          src={row.productImage.slice(0, row.productImage.length - 8)}
          alt={row.productName}
          style={{ width: '50px', height: '50px', borderRadius: '5px' }}
        />
      ),
    },
    {
      name: 'Name',
      selector: row => row.productName,
    },
    {
      name: "Description",
      // (
      //   <div className="hidden md:table-cell">Description</div>
      // ),
      selector: row => row.productDescription
      // cell: row => (
      //   <div className="hidden md:table-cell">{row.productDescription}</div>
      // ),
    },
    {
      name: 'Price',
      selector: row => row.productPrice,
    },
    {
      name: 'Comments',
      cell: row => (
        <div className='flex justify-between'>
          <button onClick={() => commentFunction(row)} className='text-[#002147] border-2 border-[#002147] rounded-full hover:bg-[#002147] hover:text-white px-2 py-1 text-[1rem]'>
            {isLoading ? <ClipLoader /> : "See Comments"}
          </button>
        </div>
      ),
    },
    {
      name: 'Action',
      cell: row => (
        <div className='flex justify-between'>
          <button onClick={() => editProduct(row)} className='text-green-500 text-[1.5rem] hover:bg-green-300 active:border-2 active:border-green-700 hover:rounded-full p-1'><FaRegEdit /></button>
          <button onClick={() => deleteProduct(row)} className='text-red-500 text-[1.5rem] ml-5 hover:bg-red-300 hover:rounded-full active:border-2 active:border-red-700 p-1'>{isLoading ? <ClipLoader /> : <MdDelete />}</button>
        </div>
      ),
    }
  ];

  const editProduct = (e) => {
    setEditingProduct(e);
    setEditedProductData({
      ...editedProductData, productId: e._id
    })
    setProductEditMode((prev) => !prev)
  }

  const deleteProduct = (e) => {
    const id = e._id;
    axios.post("http://localhost:3000/api/deleteProduct", { id }).then((response) => (
      toast.success(response.data.message),
      setshouldFetch(() => prev => !prev)
    )).catch((error) => (
      console.log(error)
    ))
  }

  const passwordToggle = () => {
    setShowPassword(prev => !prev);

    if (showPassword) {
      setPasswordType("password")
    } else {
      setPasswordType("text")
    }
  }

  const updateEditedProduct = () => {
    if (editedProductData) {
      setIsLoading(true)
      axios.post("http://localhost:3000/api/updateEditedProduct", editedProductData).then((response) => (
        setIsLoading(false),
        toast.success(response.data.message),
        setshouldFetch(() => prev => !prev)
      )).catch((error) => (
        console.log(error)
      ))
      setProductEditMode((prev) => !prev)
    } else {
      alert("nothing to update")
    }

  }

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();


    reader.onload = () => {
      if (productEditMode) {
        setFieldValue('productImage', reader.result);
        setEditedProductData({
          ...editedProductData, productImage: reader.result
        })
        setEditedProductImagePreview(reader.result);
      } else if (adminButton === 'myProfile') {
        setUserUpdatedData({
          ...userUpdatedData, profileImage: reader.result, userId: userData._id
        })
        setEditedUserImagePreview(reader.result);
      } else {
        setFieldValue('productImage', reader.result);
        setFieldValue('productOwnerId', userData._id);
        setImagePreview(reader.result);
      }
    };

    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*'
  });

  const handleEditedProductUpload = (e) => {
    setEditedProductData({
      ...editedProductData, [e.target.name]: e.target.value
    })
  }

  const handleUserUploadData = (e) => {
    setUserUpdatedData({
      ...userUpdatedData, [e.target.name]: e.target.value, userId: userData._id
    })
  }


  const updateEditedUser = async () => {
    if (userUpdatedData) {
      if (userUpdatedData.oldPassword !== undefined) {
        if (userUpdatedData.newPassword === userUpdatedData.confirmNewPassword) {
          setIsLoading(true)
          axios.post("http://localhost:3000/api/updateEditedUser", userUpdatedData).then((response) => (
            setIsLoading(false),
            toast.success(response.data.message),
            setUserData(response.data.data),
            setUserUpdatedData({})
          )).catch((error) => (
            console.log(error)
          ))
        } else {
          toast.error("Password didn't match")
        }
      } else {
        setIsLoading(true)
        axios.post("http://localhost:3000/api/updateEditedUser", userUpdatedData).then((response) => (
          setIsLoading(false),
          toast.success(response.data.message),
          setUserData(response.data.data),
          setUserUpdatedData({})
        )).catch((error) => (
          console.log(error)
        ))
      }

    } else {
      toast.error("Fill the Fields first")
    }
  }


  const userLogout = async () => {
    try {
      setLogoutLoading(true)
      const response = await axios.post("http://localhost:3000/api/userLogout");
      setUserData("");
      setLogoutLoading(false)
      toast.success(response.data.message);
      router.push("/");
    } catch (error) {
      console.error(error);
      toast.error("Logout failed. Please try again.");
    }
  };


  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue, resetForm } = useFormik({
    initialValues: initialValues,
    validationSchema: productUploadSchema,
    onSubmit: (values) => {
      setIsLoading(true)
      axios.post("http://localhost:3000/api/productUpload", values).then((response) => (
        setIsLoading(false),
        toast.success(response.data.message),
        setshouldFetch(() => prev => !prev),
        setAdminButton("myProducts"),
        setImagePreview(''),
        resetForm()
      )).catch((error) => (
        console.log(error)
      ))
    }
  });

  const tableStyle = {
    headCells: {
      style: {
        backgroundColor: "white",
        borderTop: "1px solid #002147",
        borderBottom: "1px solid #002147",
        color: "#002147",
        fontWeight: 'bold',
        fontSize: "18px",
        FontFace: "serif"
      }
    },
    rows: {
      style: {
        backgroundColor: "white",
        fontWaight: "bold",
        paddingTop: '10px',
        paddingBottom: '10px'
      }
    },
    cells: {
      style: {
        width: "40px",
        borderRight: "2px "
      }
    }
  }

  const commentFunction = async (e) => {
    try {
      const productId = e._id;
      setIsLoading(true)
      await axios.post("http://localhost:3000/api/getComments", { productId }).then((response) => {
        setIsLoading(false),
          setAllComments(response.data.data);
        console.log(allComments)
      }).catch((error) => {
        console.log(error)
      })
    } catch (error) {
      console.log(error)
    }

    setCommentField((prev) => !prev);

    const user = userData;

    if (user) {
      setCommentDetail({
        ...commentDetail, userId: user._id, productId: e._id
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
        setIsLoading(true)
      await axios.post("http://localhost:3000/api/submitComment", commentDetail).then((response) => {
        setIsLoading(false),
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


  return (

    <div className='flex flex-col'>
      <div className="w-full md:hidden flex justify-between items-center bg-[#002147] md:px-[8rem] px-4 py-4 md:py-2">
        <div className="md:w-[14rem] w-[8rem] ] text-white md:text-[1.4rem] text-[1.2rem] font-serif font-semibold text-center  py-1">
          Dashboard
        </div>

        <div className='flex ml-16'>
          <div className='text-[#FFB606] text-[1.4rem] mt-1'><Link href='/cart'><FaCartShopping /></Link></div>
          <div className={`relative top-4 right-1 ${cart.length === 0 ? "hidden" : ""} w-4 h-4 text-center font-bold text-[0.7rem] text-[#002147] bg-[#FFB606] rounded-full`}>{cart.length}</div>
        </div>
        <button className="md:hidden text-white text-[2rem] " onClick={() => setMenuButton((prev) => !prev)}>
          {menuButton ? <IoCloseOutline /> : <IoMenuOutline />}
        </button>


      </div>

      {/* mobile screen */}

      <div className={`md:hidden ${menuButton ? "block" : "hidden"} absolute top-[3.45rem] z-50 w-full h-screen text-center  bg-[#002147] pt-[1rem] leading-[3.5rem]   pb-6`}>
        <ul className='text-white mt-4 flex flex-col space-y-4'>
          <li onClick={() => setMenuButton((prev) => !prev)} className={`text-[1.3rem] font-serif text-white `}><Link href='/'>Home</Link></li>
          <li onClick={() => (setMenuButton((prev) => !prev), setAdminButton("dashboard"))} className={`text-[1.3rem] font-serif text-white ${adminButton === "dashboard" ? 'border-b-4 w-[6rem] ml-[8.6rem] border-[#FFB606]' : ''}`}>Dashboard</li>
          <li onClick={() => (setMenuButton((prev) => !prev), setAdminButton("myProducts"))} className={`text-[1.3rem] font-serif text-white ${adminButton === "myProducts" ? 'border-b-4 w-[8rem] ml-[8rem] border-[#FFB606] ' : ''}`}>My Products</li>
          <li onClick={() => (setMenuButton((prev) => !prev), setAdminButton("myProfile"))} className={`text-[1.3rem] font-serif text-white ${adminButton === "myProfile" ? 'border-b-4 w-[6rem] ml-[8.7rem] border-[#FFB606]' : ''}`}>My Profile</li>
          <li onClick={() => (setMenuButton((prev) => !prev))} className={`text-[1.3rem] font-serif text-white ${adminButton === "" ? 'border-b-4 w-[6rem] border-[#FFB606]' : ''}`}><button onClick={userLogout}>Logout</button></li>

        </ul>
      </div>



      <div className="w-[100%] min-h-screen flex   ">

        <div className={`w-[22.8%] hidden h-screen md:flex mt-[-4px] border-4 border-[#002147] bg-[#002147] text-white`}>
          <ul className=" mt-9 ">
            <li className={`font-serif font-semibold text-[1.8rem] hover:text-[#FFB606]   mt-[-5px] ml-8 `}><button >Admin Dashboard</button></li>

            <li className={` ml-10 mt-[1rem] flex`}>
              <button onClick={() => setUserButton(prev => !prev)} className='flex items-center'>
                <img className="w-8 h-8 rounded-full border-2 brightness-125 object-cover border-white " src={userData.profileImage ? userData.profileImage.slice(0, userData.profileImage.length - 8) : "/images/profileimage.png"} alt='profileImage' />
                <span className="text-[1rem] flex text-white ml-2 rounded-2xl">{isLoading ? <ClipLoader color='white' /> : userData.name}<div className='mt-1 ml-2'>{userButton ? <IoIosArrowUp /> : <IoIosArrowDown />}</div></span>
              </button>
              {/* <div className='flex ml-16'>
                <div className='text-[#FFB606] text-[1.4rem] mt-1'><Link href='/cart'><FaCartShopping /></Link></div>
                <div className={`relative top-4 right-1 ${cart.length === 0 ? "hidden" : ""} w-4 h-4 text-center font-bold text-[0.7rem] text-[#002147] bg-[#FFB606] rounded-full`}>{cart.length}</div>
              </div> */}
            </li>
            <li className={`font-serif font-semibold text-[1.3rem] hover:text-[#FFB606] border-b-[1px] mt-[4.2rem] ml-10 ${adminButton === "dashboard" ? "text-[#FFB606]" : " "}`}><button onClick={() => (setAdminButton("dashboard"))}>Dashboard</button></li>
            <li className={`font-serif font-semibold text-[1.3rem] hover:text-[#FFB606] border-b-[1px] mt-[3rem] ml-10 ${adminButton === "myProducts" ? "text-[#FFB606]" : " "}`}><button onClick={() => (setAdminButton("myProducts"))}>My Products</button></li>
            <li className={`font-serif font-semibold text-[1.3rem] hover:text-[#FFB606] border-b-[1px] mt-[3rem] ml-10 ${adminButton === "myProfile" ? "text-[#FFB606]" : " "}`}><button onClick={() => (setAdminButton("myProfile"))}>My Profile</button></li>
            {userData && (
              <div className={`absolute ${!userButton ? "hidden" : ""} top-[5rem] left-[6rem]  z-10 mt-9 w-48  rounded-md bg-white shadow-lg`}>
                <Link onClick={() => setUserButton(false)} href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 " role="menuitem">Goto Home</Link>
                <button onClick={userLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Logout</button>
              </div>
            )}
          </ul>
        </div>
        <div className=" w-full md:w-[77.5%] h-screen flex-col  md:mt-[-4px] ml-[-4px] border-4 border-white bg-white box-border overflow-auto">
          {isLoading && <Loading />}

          {
            productEditMode && (
              <div className='fixed top-0 left-0  w-full h-screen backdrop-brightness-50'>
                <div className="absolute md:top-[5rem] md:left-[30rem] md:w-[500px] w-full md:h-[600px] h-screen bg-white border-2 md:rounded-3xl shadow-2xl ">
                  <div className='w-full md:h-[530px] h-screen px-5'>
                    <div className='flex justify-between '>
                      <h1 className='text-[#002147] text-[1.5rem] md:text-[2rem] font-semibold text-center mt-4 md:mt-0  md:leading-10'>Edit Product</h1>
                      <button onClick={() => setProductEditMode((prev) => !prev)}><div className='text-[2.5rem] text-[#002147]'><IoIosClose /></div></button>
                    </div>
                    <div className='mt-8 '>
                      <div className='w-[20rem] h-[5rem] text-[#002147] bg-white mt-5 px-5'>
                        <div {...getRootProps()} className={`dropzone  md:ml-[8.6rem] ml-[5rem] w-[8rem] h-[8rem] }  rounded-lg`}>
                          <input className='' {...getInputProps()} />
                          <div className={`flex-col  `}>
                            {editedProductImagePreview ? (
                              <img src={editedProductImagePreview} alt="Preview" className='w-[8rem] h-[8rem]  rounded-lg object-cover' />
                            ) : (
                              <img src={editingProduct.productImage ? editingProduct.productImage.slice(0, editingProduct.productImage.length - 8) : ""} alt="Preview" className='w-[8rem] h-[8rem]  rounded-lg object-cover' />
                            )}
                            <div className='ml-1 mt-1'>
                              <span className='text-[#002147]'>Uploaded Image</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <input name='productName' onChange={handleEditedProductUpload} className='md:w-[25rem] w-full md:ml-[1.6rem] h-10  border-2 border-[#002147] rounded-lg px-5 py-1 mt-[6rem]' defaultValue={editingProduct.productName} />
                      <textarea name='productDescription' onChange={handleEditedProductUpload} className='md:w-[25rem] w-full md:ml-[1.6rem] h-[7rem]  border-2 border-[#002147] rounded-lg px-5 py-1 mt-5' defaultValue={editingProduct.productDescription}></textarea>
                      <input name='productPrice' onChange={handleEditedProductUpload} className='md:w-[25rem] w-full md:ml-[1.6rem] h-10  border-2 border-[#002147] rounded-lg px-5 py-1 mt-5' defaultValue={editingProduct.productPrice} />
                      <button onClick={updateEditedProduct} className='w-[10rem] md:ml-[1.6rem] h-10  border-2 border-[#002147] bg-[#002147] text-white rounded-lg px-5 py-1 mt-5'>{isLoading ? <ClipLoader /> : "Update"}</button>

                    </div>
                  </div>

                </div>
              </div>
            )
          }

          {
            commentField && (
              <div className='fixed top-0 left-0  w-full h-screen backdrop-brightness-50'>
                <div className="absolute md:top-[5rem] md:left-[30rem] w-full md:w-[500px] h-screen md:h-[600px] bg-white border-2 md:rounded-3xl shadow-2xl ">
                  <div className='w-full h-[550px] overflow-auto px-5'>
                    <div className='flex justify-between '>
                      <h1 className='text-[#002147] text-[1.5rem] md:text-[2rem] font-semibold text-center mt-4 md:mt-0   md:leading-10'>Comments</h1>
                      <button onClick={() => setCommentField((prev) => !prev)}><div className='text-[2.5rem] text-[#002147]'><IoIosClose /></div></button>
                    </div>
                    {
                      allComments ? (
                        allComments.map((data, index) => (
                          <>
                            <div key={index} >
                              <div className='flex mt-5'>
                                <div className='w-[2rem] border-2 border-[#E7E7E7] bg-[#E7E7E7] rounded-full  '>
                                  <img className='w-full h-8 rounded-full object-cover' src={data.userProfileImage ? data.userProfileImage.slice(0, data.userProfileImage.length - 8) : "/images/profileimage.png"} alt="profile" />
                                </div>
                                <div className='w-[22rem] min-h-9  border-2  bg-[#E7E7E7] rounded-full ml-2 px-5 py-1 '>
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
                  <div className=' flex justify-between mt-11 md:mt-0 px-5'>
                    <textarea name='productComment' onChange={handleComment} className='w-[22rem] h-9  border-2 border-[#002147] rounded-full px-5 py-1' placeholder='Enter Comment'></textarea>
                    <button onClick={submitComment} className='w-[5rem] h-9  border-2 border-[#002147] bg-[#002147] text-white rounded-full px-5'>{isLoading ? <ClipLoader /> : "Send"}</button>
                  </div>
                </div>
              </div>
            )
          }

          {adminButton === "dashboard" && (
            <div className={` ${productEditMode || commentField ? "hidden" : ""} ml-10 mr-10`}>
              <h1 className="text-[#002147]  mt-5  md:text-[2.5rem] text-[2rem] font-bold font-serif">DashBoard</h1>
              <div className='w-full flex mt-11'>
                <div className='w-[30rem] h-[15rem] bg-[#002147] border-3 border-[#FFB606] rounded-3xl '>
                  <h1 className='text-[#FFB606] text-[2rem] font-bold font-serif p-8 '>0</h1>
                  <p className='text-[#FFB606] text-[1.2rem] px-8 '>Total Number of Products</p>
                </div>
                <div className='w-[30rem] h-[15rem] bg-[#FFB606] border-3 border-[#002147] rounded-3xl ml-5 '>
                  <h1 className='text-[#002147] text-[2rem] font-bold font-serif p-8 '>0</h1>
                  <p className='text-[#002147] text-[1.2rem]  px-8 '>Total Number of Users</p>
                </div>
              </div>
              <div className='w-full flex mt-5'>
                <div className='w-[35rem] h-[15rem] bg-[#FFB606] border-3 border-[#002147] rounded-3xl  '>
                  <h1 className='text-[#002147] text-[2rem] font-bold font-serif p-8 '>0</h1>
                  <p className='text-[#002147] text-[1.2rem]  px-8 '>Total Number of Sales</p>
                </div>
              </div>
            </div>
          )}
          {adminButton === "myProducts" && (
            <div className={` ${productEditMode || commentField ? "hidden" : ""} ml-10 mr-10`}>
              <h1 className="text-[#002147]  mt-5  md:text-[2.5rem] text-[2rem] font-bold font-serif">My Products</h1>
              <div className='w-[12rem] h-10  bg-[#002147] text-white hover:bg-[#c8aa62] border-2 border-[#E7E7E7] text-center pt-1 rounded-[10px] md:mt-11 mt-5 mb-5 md:ml-[55rem] ml-[6.5rem] font-serif font-semibold'><button onClick={() => setAdminButton("addNewProduct")} >Add New Product</button></div>
              <DataTable
                columns={tableHeading}
                data={allProducts}
                progressPending={isLoading}
                pagination
                highlightOnHover
                pointerOnHover
                theme='default'
                customStyles={tableStyle}
                fixedHeaderScrollHeight="200px"
              />
            </div>
          )}

          {adminButton === "addNewProduct" && (
            <div className={` ${productEditMode || commentField ? "hidden" : ""} ml-10 mr-10`}>
              <h1 className="text-[#002147]  mt-5  md:text-[2.5rem] text-[1.5rem] font-bold font-serif">Add New Product</h1>


              <form className="w-full" onSubmit={handleSubmit}>
                <div className="md:w-[550px] w-full  md:mt-[4rem] mt-3 mb-[10rem] items-center  border-[#E7E7E7]">
                  <input name='productName' value={values.productName} onChange={handleChange} onBlur={handleBlur} className='md:w-[26rem] w-full h-10  border-b-2 border-[#E7E7E7] mt-11 px-5' type="text" placeholder='Enter Product Name' />
                  {errors.productName && touched.productName ? <p className=' text-red-500 px-5'>{errors.productName}</p> : null}
                  <textarea name='productDescription' value={values.productDescription} onChange={handleChange} onBlur={handleBlur} className='md:w-[26rem] w-full h-10 border-b-2 border-[#E7E7E7] mt-8 px-5' type="email" placeholder='Enter Product Discription' />
                  {errors.productDescription && touched.productDescription ? <p className=' text-red-500 px-5'>{errors.productDescription}</p> : null}

                  <div className='md:w-[26rem] w-full min-h-9  mt-8 '>
                    {imagePreview ? (
                      <div className={`flex  border-b-2 pb-2 border-[#E7E7E7] `}>
                        <img src={imagePreview} alt="Preview" className={`${styles2.thumbnailImg}`} />
                        <div className={styles2.thumbnailInfo}>
                          <span>Product Image</span>
                        </div>
                      </div>
                    ) : (
                      <div {...getRootProps()} className='dropzone md:w-[26rem] w-full  h-10 border-b-2 border-[#E7E7E7] cursor-pointer'>
                        <input {...getInputProps()} />
                        <p className=' ml-5 py-1 '>Upload Profile Photo</p>
                      </div>
                    )}
                  </div>

                  <div className='w-full flex  mt-8'>
                    <input name='productPrice' value={values.productPrice} onChange={handleChange} onBlur={handleBlur} className='md:w-[12.5rem] w-[8rem] h-10  border-b-2 border-[#E7E7E7]  px-5' type="number" placeholder='Enter Price' />
                    <select name='productCategory' value={values.productCategory} onChange={handleChange} onBlur={handleBlur} className='md:w-[12.5rem] w-[8rem] h-10 ml-[1rem] border-b-2 border-[#E7E7E7]  px-5' >
                      <option >Category</option>
                      <option value="mobileAccessories">Mobile and Accessories</option>
                      <option value="electronics">Electronics</option>
                      <option value="food">Food</option>
                      <option value="cloth">Cloth</option>
                      <option value="footWare">Footware</option>
                      <option value="stationary">Stationary</option>
                    </select>
                  </div>
                  <div className='flex ml-[4rem] mt-8'>
                    {errors.productPrice && touched.productPrice ? <p className=' text-red-500 px-5'>{errors.productPrice}</p> : null}
                    {errors.productCategory && touched.productCategory ? <p className='ml-[1rem] text-red-500 px-5'>{errors.productCategory}</p> : null}
                  </div>
                  <button type='submit' className='w-[13rem] h-10  bg-[#002147] text-white hover:bg-[#606264] border-2 border-[#002147] mt-8 mb-11 px-5 font-serif font-semibold' >Upload</button>
                </div>
              </form>
            </div>
          )}


          {adminButton === "myProfile" && (
            <div className={` ${productEditMode || commentField ? "hidden" : ""} md:ml-10 md:mr-10 px-5 md:px-0`}>
              <h1 className="text-[#002147]  mt-5  md:text-[2.5rem] text-[2rem] font-bold font-serif">My Profile</h1>


              <div className="  md:w-[500px] w-full  h-[600px] mt-[3rem] md:ml-[12rem] bg-white">
                <div className='w-full h-[530px] '>
                  <div className='mt-8 '>
                    <div className='w-[20rem] h-[5rem] text-[#002147] bg-white mt-5 md:px-5'>
                      <div {...getRootProps()} className={`dropzone  md:ml-[8.6rem] ml-[6rem] w-[8rem] h-[8rem] }  rounded-lg`}>
                        <input className='' {...getInputProps()} />
                        <div className={`flex-col  `}>
                          {editedUserImagePreview ? (
                            <img src={editedUserImagePreview} alt="Preview" className='w-[8rem] h-[8rem]  rounded-lg object-cover' />
                          ) : (
                            <img src={`${userData.profileImage ? userData.profileImage.slice(0, userData.profileImage.length - 8) : "/images/profileimage.png"}`} alt="Preview" className='w-[8rem] h-[8rem]  rounded-lg object-cover' />
                          )}
                          <div className='ml-1 mt-1'>
                            <span className='text-[#002147]'>Uploaded Image</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='w-full flex md:ml-[1.6rem] md:mt-[10rem] mt-[8rem]'>
                      <label htmlFor="userName" className='md:w-[10rem] w-[11rem]  pt-1 font-bold  '>Name : </label>
                      <input name='userName' onChange={handleUserUploadData} defaultValue={userData.name} type='text' className='md:w-[20rem] w-[11rem]  border-b-2   px-5  ' />
                    </div>
                    <div className='w-full flex md:ml-[1.6rem] mt-7'>
                      <label htmlFor="email" className='md:w-[10rem] w-[11rem]  pt-1 font-bold  '>Email : </label>
                      <input name='email' onChange={handleUserUploadData} defaultValue={userData.email} type='email' className='md:w-[20rem] w-[11rem]   border-b-2   px-5  ' />
                    </div>

                    <div className='w-full flex md:ml-[1.6rem] mt-7'>
                      {/* <label htmlFor="newPassword" className='md:w-[10rem] w-[11rem]  pt-1 font-bold  '>Change Password :</label> */}
                      <button onClick={() => setPasswordField(prev => !prev)} className='w-[11rem]  h-9  border-2 text-[#002147] rounded-lg px-5 py-1 '>Change Password</button>
                    </div>


                    <div className={`${passwordField ? "" : "hidden"} w-full flex-col mt-7`}>
                      <div className='w-full flex md:ml-[1.6rem] mt-7'>
                        <label htmlFor="oldPassword" className='md:w-[10rem] w-[11rem]  pt-1 font-bold  '>Old Password : </label>
                        <input name='oldPassword' onChange={handleUserUploadData} type='password' className='md:w-[20rem] w-[11rem]   border-b-2   px-5  ' />
                      </div>
                      <div className='w-full flex md:ml-[1.6rem] mt-7'>
                        <label htmlFor="NewPassword" className='md:w-[10rem] w-[11rem]  pt-1 font-bold  '>New Password : </label>
                        <input name='newPassword' onChange={handleUserUploadData} type='password' className='md:w-[20rem] w-[11rem]   border-b-2   px-5  ' />
                      </div>
                      <div className='w-full flex md:ml-[1.6rem] mt-7'>
                        <label htmlFor="confirmNewPassword" className='md:w-[10rem] w-[11rem]  pt-1 font-bold  '>Confirm New Password : </label>
                        <input name='confirmNewPassword' onChange={handleUserUploadData} type='password' className='md:w-[20rem] w-[11rem]   border-b-2   px-5  ' />
                      </div>
                    </div>

                    <button onClick={updateEditedUser} className='w-[10rem] md:ml-[1.6rem] h-9  border-2 border-[#002147] bg-[#002147] text-white rounded-lg px-5 py-1 md:mt-[7rem] mt-[3rem]'>{isLoading ? <ClipLoader /> : "Update Profile"}</button>

                  </div>
                </div>

              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  )
}
export default Admin
