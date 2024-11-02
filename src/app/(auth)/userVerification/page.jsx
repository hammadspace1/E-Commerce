"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { ClipLoader } from 'react-spinners';
import { useUser } from '@/app/Context/store';

function UserVerification() {
    const [verificationData, setVerificationData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [token, setToken] = useState('');

    const { userData } = useUser();
    const router = useRouter();

    const handleVerify = (e) => {
        setVerificationData({
            ...verificationData,
            [e.target.name]: e.target.value,
            userId: userData._id
        });
    };

    useEffect(() => {
        const getToken = async () => {
            const cookieToken = document.cookie
            .split("; ")
            .find(cookie => cookie.startsWith("token="))
            ?.split("=")[1];
        setToken(cookieToken);
        }

        getToken();
        
    }, []);

    const verifyUser = async () => {
        if (verificationData.verificationCode !== undefined) {
            setIsLoading(true);
            try {
                const response = await axios.post("http://localhost:3000/api/verifyUser", verificationData);
                toast.success(response.data.message);
                if (response.data.data) {
                    if (token) {
                        router.push("/adminDashboard");
                    } else {
                        router.push("/login");
                    }
                }
            } catch (error) {
                toast.error("Verification failed. Please try again.");
            } finally {
                setIsLoading(false);
            }
        } else {
            toast.error("Enter the Code");
        }
    };

    return (
        <div className="w-full">
            <div className="md:w-[550px] w-full md:ml-[465px] mt-[4rem] mb-[20rem] items-center md:border-2 md:shadow-2xl border-[#E7E7E7] md:rounded-[30px] px-5 md:px-0">
                <h1 className="text-[#002147] text-center md:mt-5 mt-2 md:text-[3rem] text-[2rem] font-bold font-serif">Verification</h1>
                <input
                    name='verificationCode'
                    onChange={handleVerify}
                    className='md:w-[26rem] w-full h-9 md:ml-[4rem] border-2 border-[#E7E7E7] rounded-[20px] mt-11 px-5'
                    type="text"
                    placeholder='Enter Verification Code'
                />
                <div className='flex justify-between md:px-[4rem]'>
                    <button
                        onClick={verifyUser}
                        className='w-[13rem] h-9 bg-[#002147] text-white hover:bg-[#606264] border-2 border-[#E7E7E7] rounded-[20px] mt-11 mb-11 px-5 font-serif font-semibold'
                    >
                        {isLoading ? <ClipLoader color='white' /> : "Verify"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UserVerification;
