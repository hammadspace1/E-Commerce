"use client";

import { usePathname, useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import { FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useUser } from '@/app/Context/store';
import { jwtDecode } from 'jwt-decode';
import { ClipLoader } from 'react-spinners';
import { IoMenuOutline } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";

function Navbar() {
    const pathName = usePathname();

    const [userButton, setUserButton] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [menuButton, setMenuButton] = useState(false);

    const { userData, setUserData, cart } = useUser();

    const router = useRouter();


    useEffect(() => {
        const fetchUserData = async () => {
            const token = document.cookie
            if (token) {
                const decoded = jwtDecode(token);
                const userId = decoded.id;
                try {
                    setIsLoading(true);
                    const response = await axios.post("http://localhost:3000/api/getUser", { userId });
                    setUserData(response.data.data);
                    setIsLoading(false);

                } catch (error) {
                    console.log(error)
                }
            } else {
                setUserData("")
            }
        }
        fetchUserData();

    }, [])

    const userLogout = async () => {
        try {
            setIsLoading(true)
            const response = await axios.post("http://localhost:3000/api/userLogout");
            setUserData("");
            setIsLoading(false)
            toast.success(response.data.message);
            setUserButton(false);
            router.push("/");
        } catch (error) {
            console.error(error);
            toast.error("Logout failed. Please try again.");
        }
    };

    return (
        <div className={`fixed top-0 z-50 w-full flex-col ${pathName === "/signup" || pathName === "/userVerification" || pathName === "/login" || pathName === "/adminDashboard" || pathName === "/userDashboard" ? "hidden" : ""}`}>
            <div className="w-full flex justify-between items-center bg-[#002147] md:px-[8rem] px-4 py-4 md:py-2">
                <div className="md:w-[14rem] w-[8rem] bg-[#FFB606] text-[#002147] md:text-[1.4rem] text-[1rem] font-serif font-semibold text-center md:py-3 py-1 rounded-lg shadow-lg">
                    E-Commerce
                </div>

                <div className='flex '>
                    <div className='flex mr-5 md:hidden'>
                        <div className='text-[#FFB606] text-[1.4rem] mt-1'><Link href='/cart'><FaCartShopping /></Link></div>
                        <div className={`relative top-4 right-1 ${cart.length === 0 ? "hidden" : ""} w-4 h-4 text-center font-bold text-[0.7rem] bg-[#FFB606] rounded-full`}>{cart.length}</div>
                    </div>
                    <button className="md:hidden text-white text-[2rem] " onClick={() => setMenuButton((prev) => !prev)}>
                        {menuButton ? <IoCloseOutline /> : <IoMenuOutline />}
                    </button>
                </div>

                <div className='hidden md:block'>
                    <ul className="flex mt-3 space-x-8">
                        {['/', '/products', '/aboutUs', '/contactUs'].map((item) => (
                            <li key={item} className="flex cursor-pointer font-serif">
                                <Link href={item}>
                                    <div className={`text-[1.1rem] text-[#FFB606] hover:border-b-2 hover:border-[#FFB606] transition duration-300 ${pathName === item ? 'border-b-2 border-[#FFB606]' : ''}`}>
                                        {item === '/' ? 'Home' : item.charAt(1).toUpperCase() + item.slice(2)}
                                    </div>
                                </Link>
                            </li>
                        ))}
                        <li>
                            {userData ? (
                                <div className='flex'>
                                    <div className='flex'>
                                        <div className='text-[#FFB606] text-[1.5rem] mt-1'><Link href='/cart'><FaCartShopping /></Link></div>
                                        <div className={`relative top-4 right-1 ${cart.length === 0 ? "hidden" : ""} w-4 h-4 text-center font-bold text-[0.7rem] bg-[#FFB606] rounded-full`}>{cart.length}</div>
                                    </div>

                                    <button onClick={() => setUserButton(prev => !prev)} className='flex items-center'>
                                        <img className="w-8 h-8 rounded-full border-2 brightness-125 object-cover border-[#FFB606] ml-5" src={userData.profileImage ? userData.profileImage.slice(0, userData.profileImage.length - 8) : "/images/profileimage.png"} alt='profileImage' />
                                        <span className="text-[1rem] flex text-[#FFB606] ml-2 rounded-2xl">{isLoading ? <ClipLoader color='white' /> : userData.name}<div className='mt-1'>{userButton ? <IoIosArrowUp /> : <IoIosArrowDown />}</div></span>
                                    </button>
                                </div>
                            ) : (
                                <div className='flex space-x-2 ml-2 mt-[-5px]'>
                                    <Link className="flex items-center text-[1rem] text-[#FFB606] border-2 border-[#FFB606] rounded-2xl py-1 px-3 hover:bg-[#FFB606] hover:text-[#002147] transition duration-300" href='/login'>Login</Link>
                                    <Link className="flex items-center text-[1rem] text-[#FFB606] border-2 border-[#FFB606] rounded-2xl py-1 px-3 hover:bg-[#FFB606] hover:text-[#002147] transition duration-300" href='/signup'>SignUp</Link>
                                </div>
                            )}
                        </li>
                        {userData && (
                            <div className={`absolute ${!userButton ? "hidden" : ""} right-0 z-10 mt-9 w-48 origin-top-right rounded-md bg-white shadow-lg`}>
                                <Link onClick={() => setUserButton(false)} href={userData.isAdmin ? "/adminDashboard" : "/userDashboard"} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 " role="menuitem">Dashboard</Link>
                                <button onClick={userLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Logout</button>
                            </div>
                        )}
                    </ul>
                </div>
            </div>

            {/* mobile screen */}

            <div className={`md:hidden ${menuButton ? "block" : "hidden"} absolute top-[3.45rem] z-50 w-full h-screen text-center bg-[#002147]  leading-[3.5rem] pt-[1rem] pb-6`}>
                <ul className='text-white mt-4 flex flex-col space-y-4'>
                    <li onClick={() => setMenuButton((prev) => !prev)} className={`text-[1.3rem] font-serif text-white ${pathName === "/" ? 'border-b-4 w-[6rem] ml-[8.5rem] border-[#FFB606]' : ''}`}>
                        <Link href='/'>Home</Link>
                    </li>
                    <li onClick={() => setMenuButton((prev) => !prev)} className={`text-[1.3rem] font-serif text-white ${pathName === "/products" ? 'border-b-4 w-[6rem] ml-[8.8rem] border-[#FFB606]' : ''}`}>
                        <Link href='/products'>Products</Link>
                    </li>
                    <li onClick={() => setMenuButton((prev) => !prev)} className={`text-[1.3rem] font-serif text-white ${pathName === "/aboutUs" ? 'border-b-4 w-[6rem] ml-[8.8rem] border-[#FFB606]' : ''}`}>
                        <Link href='/aboutUs'>About Us</Link>
                    </li>
                    <li onClick={() => setMenuButton((prev) => !prev)} className={`text-[1.3rem] font-serif text-white ${pathName === "/contactUs" ? 'border-b-4 w-[7rem] ml-[8rem] border-[#FFB606]' : ''}`}>
                        <Link href='/contactUs'>Contact Us</Link>
                    </li>
                    {
                        userData ? (
                            <ul>
                                <li onClick={() => setMenuButton((prev) => !prev)} className={`text-[1.3rem] font-serif text-white ${pathName === '/adminDashboard' ? 'border-b-4 w-[6rem] border-[#FFB606]' : ''}`}>
                                    <Link href={userData.isAdmin ? "/adminDashboard" : "/userDashboard"}>Dashboard</Link>
                                </li>
                                <li onClick={() => setMenuButton((prev) => !prev)} className={`text-[1.3rem] mt-4 font-serif text-white ${pathName === '/logout' ? 'border-b-4 w-[6rem] border-[#FFB606]' : ''}`}>
                                    <button onClick={userLogout}>Logout</button>
                                </li>
                            </ul>
                        ) : (
                            <ul>
                                <li onClick={() => setMenuButton((prev) => !prev)} className={`text-[1.3rem]  font-serif text-white ${pathName === '/login' ? 'border-b-4 w-[6rem] border-[#FFB606]' : ''}`}>
                                    <Link href='/login'>Login</Link>
                                </li>
                                <li onClick={() => setMenuButton((prev) => !prev)} className={`text-[1.3rem] mt-4 font-serif text-white ${pathName === '/signup' ? 'border-b-4 w-[6rem] border-[#FFB606]' : ''}`}>
                                    <Link href='/signup'>SignUp</Link>
                                </li>
                            </ul>
                        )
                    }

                </ul>
            </div>
        </div>
    );



    // return (
    //     <div className={`w-full flex-col ${pathName === "/signup" || pathName === "/userVerification" || pathName === "/login" ? "hidden" : "" || pathName === "/adminDashboard" ? "hidden" : ""}`}>
    //         <div className="w-full flex justify-between bg-[#002147] md:px-[8rem]">
    //             <div className="md:w-[14rem] w-[8rem] bg-[#FFB606] text-[#002147] md:text-[1.4rem] text-[1rem] font-serif font-semibold md:py-5 py-3 md:px-8 px-2">
    //                 E-Commerce
    //             </div>
    //             <button className={`md:hidden  text-white text-[2rem] mr-5 md:mr-0`} onClick={() => setMenuButton((prev) => !prev)}>{menuButton ? <IoCloseOutline /> : <IoMenuOutline />}</button>

    //             <div className='hidden md:block'>
    //                 <ul className="text-white flex mt-5">
    //                     <li className="flex text-[1rem] ml-[2rem] cursor-pointer font-serif">
    //                         <div className={`text-[1.1rem] mr-[0.7rem] text-[#FFB606] mt-2 ${pathName === '/' ? 'border-b-2 border-[#FFB606]' : ''}`}>
    //                             <Link href='/'>Home</Link>
    //                         </div>
    //                     </li>
    //                     <li className="flex text-[1rem] ml-[2rem] cursor-pointer font-serif">
    //                         <div className={`text-[1.1rem] mr-[0.7rem] text-[#FFB606] mt-2 ${pathName === '/products' ? 'border-b-2 border-[#FFB606]' : ''}`}>
    //                             <Link href='/products'>Products</Link>
    //                         </div>
    //                     </li>
    //                     <li className="flex text-[1rem] ml-[2rem] cursor-pointer font-serif">
    //                         <div className={`text-[1.1rem] mr-[0.7rem] text-[#FFB606] mt-2 ${pathName === '/aboutUs' ? 'border-b-2 border-[#FFB606]' : ''}`}>
    //                             <Link href='/aboutUs'>About Us</Link>
    //                         </div>
    //                     </li>
    //                     <li className="flex text-[1rem] ml-[2rem] cursor-pointer font-serif">
    //                         <div className={`text-[1.1rem] mr-[0.7rem] text-[#FFB606] mt-2 ${pathName === '/contactUs' ? 'border-b-2 border-[#FFB606]' : ''}`}>
    //                             <Link href='/contactUs'>Contact Us</Link>
    //                         </div>
    //                     </li>
    //                     <li>
    //                         {userData ? (
    //                             <button onClick={() => setUserButton(prev => !prev)} className='flex'>
    //                                 <div className="flex text-[2rem] text-[#FFB606] ml-[5rem]"><FaUserCircle /></div>
    //                                 <div className="flex text-[1rem] px-2 py-1 text-[#FFB606] ml-1 rounded-2xl">{isLoading ? <ClipLoader color='white' /> : userData && userData.name
    //                                     ? (userData.name.split(" ")[0] ? userData.name.split(" ")[0].toUpperCase() : userData.name.toUpperCase())
    //                                     : userData.name}</div>
    //                             </button>
    //                         ) : (
    //                             <div className='flex'>
    //                                 <Link className="flex text-[1rem] text-[#FFB606] border-2 border-[#FFB606] rounded-2xl py-1 px-2 active:bg-[#FFB606] active:text-[#002147] hover:bg-[#FFB606] hover:text-[#002147] ml-[2rem] font-serif" href='/login'>Login</Link>
    //                                 <Link className="flex text-[1rem] text-[#FFB606] border-2 border-[#FFB606] rounded-2xl py-1 px-2 active:bg-[#FFB606] active:text-[#002147] hover:bg-[#FFB606] hover:text-[#002147] ml-[1rem] font-serif" href='/signup'>SignUp</Link>
    //                             </div>
    //                         )}
    //                     </li>
    //                     {userData && (
    //                         <div className={`absolute ${!userButton ? "hidden" : ""} right-0 z-10 mt-9 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`} role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
    //                             <Link onClick={() => setUserButton(false)} href="/adminDashboard" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1">Dashboard</Link>
    //                             <button onClick={userLogout} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1">Logout</button>
    //                         </div>
    //                     )}
    //                 </ul>
    //             </div>
    //         </div>
    //         <div className={`md:hidden ${menuButton ? "block" : "hidden"} absolute z-50 w-[8rem] bg-[#002147] mt-2 rounded-[20px] px-3  ml-[15.4rem]`}>
    //             <ul className='text-white mt-4  flex flex-col'>
    //                 <li onClick={() => setMenuButton((prev) => !prev)} className={`text-[1.3rem] font-semibold font-serif  text-[#FFB606]  mt-4 ${pathName === '/' ? 'border-b-4 w-[5rem] border-[#002147]' : ''}`}><Link href='/'>Home</Link></li>
    //                 <li onClick={() => setMenuButton((prev) => !prev)} className={`text-[1.3rem] font-semibold font-serif  text-[#FFB606]  mt-4 ${pathName === '/products' ? 'border-b-4 w-[6rem] border-[#002147]' : ''}`}><Link href='/products'>Products</Link></li>
    //                 <li onClick={() => setMenuButton((prev) => !prev)} className={`text-[1.3rem] font-semibold font-serif  text-[#FFB606]  mt-4 ${pathName === '/aboutUs' ? 'border-b-4 w-[6rem] border-[#002147]' : ''}`}><Link href='/aboutUs'>AboutUs</Link></li>
    //                 <li onClick={() => setMenuButton((prev) => !prev)} className={`text-[1.3rem] font-semibold font-serif  text-[#FFB606]  mt-4 ${pathName === '/contactUs' ? 'border-b-4 w-[6.8rem] border-[#002147]' : ''}`}><Link href='/contactUs'>ContactUs</Link></li>
    //                 <li onClick={() => setMenuButton((prev) => !prev)} className={`text-[1.3rem] font-semibold font-serif  text-[#FFB606]  mt-4 ${pathName === '/login' ? 'border-b-4 w-[5rem] border-[#002147]' : ''}`}><Link href='/login'>Login</Link></li>
    //                 <li onClick={() => setMenuButton((prev) => !prev)} className={`text-[1.3rem] font-semibold font-serif  text-[#FFB606]  mt-4 ${pathName === '/signup' ? 'border-b-4 w-[5rem] border-[#002147]' : ''}`}><Link href='/signup'>SignUp</Link></li>
    //             </ul>
    //         </div>
    //     </div>
    // );
}

export default Navbar;



// "use client";

// import { usePathname, useRouter } from 'next/navigation';
// import axios from 'axios';
// import Link from 'next/link';
// import { FaUserCircle } from "react-icons/fa";
// import { useEffect, useState } from 'react';
// import toast from 'react-hot-toast';
// import { useUser } from '@/app/Context/store';
// import { jwtDecode } from 'jwt-decode';
// import { ClipLoader } from 'react-spinners';

// function Navbar() {
//     const pathName = usePathname();
//     const [userButton, setUserButton] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
//     const { userData, setUserData } = useUser();
//     const router = useRouter();

//     useEffect(() => {
//         const fetchUserData = async () => {
//             const token = document.cookie;
//             if (token) {
//                 const decoded = jwtDecode(token);
//                 const userId = decoded.id;
//                 try {
//                     setIsLoading(true);
//                     const response = await axios.post("http://localhost:3000/api/getUser", { userId });
//                     setUserData(response.data.data);
//                     setIsLoading(false);
//                 } catch (error) {
//                     console.log(error);
//                 }
//             } else {
//                 setUserData("");
//             }
//         };
//         fetchUserData();
//     }, []);

//     const userLogout = async () => {
//         try {
//             setIsLoading(true);
//             const response = await axios.post("http://localhost:3000/api/userLogout");
//             setUserData("");
//             setIsLoading(false);
//             toast.success(response.data.message);
//             setUserButton(false);
//             router.push("/");
//         } catch (error) {
//             console.error(error);
//             toast.error("Logout failed. Please try again.");
//         }
//     };

//     return (
//         <div className={`w-full flex-col ${pathName === "/signup" || pathName === "/userVerification" || pathName === "/login" || pathName === "/adminDashboard" ? "hidden" : ""}`}>
//             <div className="w-full flex justify-between items-center bg-[#002147] px-4 md:px-16">
//                 <div className="bg-[#FFB606] text-[#002147] text-xl font-serif font-semibold py-5 px-4">
//                     E-Commerce
//                 </div>
//                 <div className="relative">
//                     <ul className="text-white flex flex-col md:flex-row mt-5">
//                         {['/', '/products', '/aboutUs', '/contactUs'].map((path, index) => (
//                             <li key={index} className="flex text-lg ml-2 cursor-pointer font-serif">
//                                 <div className={`text-lg mr-2 text-[#FFB606] mt-2 ${pathName === path ? 'border-b-2 border-[#FFB606]' : ''}`}>
//                                     <Link href={path}>{path === '/' ? 'Home' : path.replace('/', '').charAt(0).toUpperCase() + path.slice(2)}</Link>
//                                 </div>
//                             </li>
//                         ))}
//                         <li>
//                             {userData ? (
//                                 <button onClick={() => setUserButton(prev => !prev)} className='flex items-center'>
//                                     <div className="text-2xl text-[#FFB606] ml-5"><FaUserCircle /></div>
//                                     <div className="text-lg px-2 py-1 text-[#FFB606] ml-1 rounded-2xl">
//                                         {isLoading ? <ClipLoader color='white' /> : userData.name?.split(" ")[0].toUpperCase()}
//                                     </div>
//                                 </button>
//                             ) : (
//                                 <div className='flex'>
//                                     <Link className="flex text-lg text-[#FFB606] border-2 border-[#FFB606] rounded-2xl py-1 px-2 ml-2 font-serif" href='/login'>Login</Link>
//                                     <Link className="flex text-lg text-[#FFB606] border-2 border-[#FFB606] rounded-2xl py-1 px-2 ml-2 font-serif" href='/signup'>SignUp</Link>
//                                 </div>
//                             )}
//                         </li>
//                         {userData && (
//                             <div className={`absolute ${!userButton ? "hidden" : ""} right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}>
//                                 <Link onClick={() => setUserButton(false)} href="/adminDashboard" className="block px-4 py-2 text-sm text-gray-700">Dashboard</Link>
//                                 <button onClick={userLogout} className="block px-4 py-2 text-sm text-gray-700">Logout</button>
//                             </div>
//                         )}
//                     </ul>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Navbar;

