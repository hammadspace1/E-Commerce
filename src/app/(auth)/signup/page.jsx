"use client"
import { signUpSchema } from '@/components/signUpSchema';
import axios from 'axios';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useUser } from '@/app/Context/store';
import { ClipLoader } from 'react-spinners';
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: ""
};

function Signup() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordtype, setPasswordType] = useState('password')

  const { setUserData } = useUser();

  // const onDrop = (acceptedFiles) => {
  //   const file = acceptedFiles[0];
  //   const reader = new FileReader();

  //   reader.onload = () => {
  //     setFieldValue('profileImage', reader.result);
  //     setImagePreview(reader.result);
  //   };

  //   reader.readAsDataURL(file);
  // };

  // const { getRootProps, getInputProps } = useDropzone({
  //   onDrop,
  //   accept: 'image/*'
  // });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: signUpSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const response = await axios.post("http://localhost:3000/api/userSignup", values);
        toast.success(response.data.message);

        const userData = response.data.data;

        setUserData(userData);

        setIsLoading(false);

        router.push("/userVerification");

      } catch (error) {
        console.error(error);
        toast.error("Signup failed. Please try again.");
      }
    }
  });

  const passwordToggle = () => {
    setShowPassword(prev => !prev);

    if (showPassword) {
      setPasswordType("password")
    }else{
      setPasswordType("text")
    }
  }

  return (
    <div>
      <form className={`w-full`} onSubmit={handleSubmit}>
        <div className="md:w-[550px] w-full md:ml-[465px] mt-[4rem] mb-[20rem] items-center md:border-2 md:shadow-2xl border-[#E7E7E7] md:rounded-[30px] px-5 md:px-0">
          <h1 className="text-[#002147] text-center md:mt-5 mt-2 md:text-[3rem] text-[2rem] font-bold font-serif">Registration</h1>

          <input name='name' value={values.name} onChange={handleChange} onBlur={handleBlur}
            className='md:w-[26rem] w-full h-9 md:ml-[4rem] border-2 border-[#E7E7E7] rounded-[20px] mt-11 px-5'
            type="text" placeholder='Enter Full Name' />
          {errors.name && touched.name ? <p className='md:ml-[4rem] text-red-500 px-5'>{errors.name}</p> : null}

          <input name='email' value={values.email} onChange={handleChange} onBlur={handleBlur}
            className='md:w-[26rem] w-full h-9 md:ml-[4rem] border-2 border-[#E7E7E7] rounded-[20px] mt-11 px-5'
            type="email" placeholder='Enter Email' />
          {errors.email && touched.email ? <p className='md:ml-[4rem] text-red-500 px-5'>{errors.email}</p> : null}

          {/* <div className='w-[26rem] min-h-9 mt-11'>
            {imagePreview ? (
              <div className={`flex ml-[4rem] ${styles.thumbnailPreview}`}>
                <img src={imagePreview} alt="Preview" className={`${styles.thumbnailImg}`} />
                <div className={styles.thumbnailInfo}>
                  <span>Profile Photo</span>
                </div>
              </div>
            ) : (
              <div {...getRootProps()} className='dropzone w-[26rem] ml-[4rem] h-9 border-2 border-[#E7E7E7] rounded-[20px] cursor-pointer'>
                <input {...getInputProps()} />
                <p className='ml-5 py-1'>Upload Profile Photo</p>
              </div>
            )}
          </div> */}

          {/* <input name='password' value={values.password} onChange={handleChange} onBlur={handleBlur}
            className='md:w-[26rem] w-full h-9 md:ml-[4rem] border-2 border-[#E7E7E7] rounded-[20px] mt-11 px-5'
            type="password" placeholder='Enter Password' /> */}
          <div className=''>
            <input name='password' value={values.password} onChange={handleChange} onBlur={handleBlur}
              className='md:w-[26rem] w-full h-9 md:ml-[4rem] border-2 border-[#E7E7E7] rounded-[20px] mt-11 px-5'
              type={passwordtype} placeholder='Enter Password' />
            <button type='button' onClick={passwordToggle} className='relative md:top-[0.33rem] top-[-31px] md:right-11 right-[-18.2rem] text-[1.5rem] '>{showPassword ? <FaRegEye /> : <FaRegEyeSlash /> }</button>
          </div>
          {errors.password && touched.password ? <p className='md:ml-[4rem] text-red-500 px-5'>{errors.password}</p> : null}

          <input name='confirmPassword' value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur}
            className='md:w-[26rem] w-full h-9 md:ml-[4rem] border-2 border-[#E7E7E7] rounded-[20px] mt-3 md:mt-11 px-5'
            type="password" placeholder='Confirm Password' />
          {errors.confirmPassword && touched.confirmPassword ? <p className='md:ml-[4rem] text-red-500 px-5'>{errors.confirmPassword}</p> : null}

          <div className='flex md:justify-between md:px-[4rem]'>
            <button type='submit'
              className={`md:w-[13rem] w-[9rem] h-9  bg-[#002147] text-white hover:bg-[#606264] border-2 border-[#E7E7E7] rounded-[20px] mt-11 mb-11 px-5 font-serif font-semibold`}>
              {isLoading ? <ClipLoader color='white' /> : "Continue"}
            </button>
            <Link href='/login' className='underline text-[#002147] mt-[48px] ml-[4rem] md:ml-0 font-bold'>Already have an Account?</Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Signup;
