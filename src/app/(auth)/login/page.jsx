"use client"
import { useUser } from '@/app/Context/store';
import { loginSchema } from '@/components/loginSchema';
import axios from 'axios';
import { useFormik } from 'formik';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

const initialValues = {
  email: "",
  password: ""
}

function Login() {

  const router = useRouter()

  const { setUserData } = useUser();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordtype, setPasswordType] = useState('password')

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const response = await axios.post("http://localhost:3000/api/userLogin", values);
        setIsLoading(false);

        const userData = response.data.data;

        setUserData(userData);

        if (response.data.data.isVerified) {
          if (response.data.data.isAdmin) {
            toast.success(response.data.message)
            router.push("/adminDashboard")
          } else {
            toast.success(response.data.message)
            router.push("/userDashboard")
          }

        } else {
          router.push("/userVerification")
        }


      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    }
  });

  const passwordToggle = () => {
    setShowPassword(prev => !prev);

    if (showPassword) {
      setPasswordType("password")
    } else {
      setPasswordType("text")
    }
  }


  return (

    <form className="w-full" onSubmit={handleSubmit}>
      <div className="md:w-[550px] w-full md:ml-[465px] mt-[4rem] mb-[20rem] items-center md:border-2 md:shadow-2xl border-[#E7E7E7] md:rounded-[30px] px-5 md:px-0">
        <h1 className="text-[#002147] text-center md:mt-5 mt-2 md:text-[3rem] text-[2rem] font-bold font-serif">Login</h1>
        <input name='email' value={values.email} onChange={handleChange} onBlur={handleBlur} className='md:w-[26rem] w-full h-9 md:ml-[4rem] border-2 border-[#E7E7E7] rounded-[20px] mt-11 px-5' type="email" placeholder='Enter Email' />
        {errors.email && touched.email ? <p className='md:ml-[4rem] text-red-500 px-5'>{errors.email}</p> : null}
        <div className=''>
          <input name='password' value={values.password} onChange={handleChange} onBlur={handleBlur}
            className='md:w-[26rem] w-full h-9 md:ml-[4rem] border-2 border-[#E7E7E7] rounded-[20px] mt-11 px-5'
            type={passwordtype} placeholder='Enter Password' />
          <button type='button' onClick={passwordToggle} className='relative md:top-[0.33rem] top-[-31px] md:right-11 right-[-18.2rem] text-[1.5rem] '>{showPassword ? <FaRegEye /> : <FaRegEyeSlash />}</button>
        </div>
        {errors.password && touched.password ? <p className='md:ml-[4rem] text-red-500 px-5'>{errors.password}</p> : null}
        <div className='flex justify-between md:px-[5rem] md:mt-[3rem] mt-0'>
          <button type='submit' className='md:w-[13rem] w-[9rem] h-9  bg-[#002147] text-white hover:bg-[#606264] border-2 border-[#E7E7E7] rounded-[20px] mt-11 mb-11 px-5 font-serif font-semibold' >
            {isLoading ? <ClipLoader color='white' /> : "Login"}
          </button>
          <Link href='/signup' className='underline text-[#002147] mt-[48px] font-bold '>Create Account</Link>
        </div>
      </div>
    </form>
  )
}

export default Login
