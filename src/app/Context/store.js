"use client"

import { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState([]);
    const [cart, setCart] = useState([]);

    return (
        <UserContext.Provider value={{ userData, setUserData, cart, setCart }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};









// 'use client';

// import { jwtDecode } from "jwt-decode";
// import { createContext, useContext, useState, useEffect } from "react";

// const GlobalContext = createContext({
//   userTokenId: '',
// });

// export const GlobalContextProvider = ({ children }) => {
//   const [userTokenId, setUserTokenId] = useState('');

//   useEffect(() => {
//     const token = document.cookie
//       // const testtoken = document.cookie;
//       // console.log(" this is test cookie Part: ", testtoken)

//     if (token) {
//       try {
//         const decoded = jwtDecode(token);
//         const userId = decoded.id;
//         setUserTokenId(userId);
//       } catch (error) {
//         console.error('Token decoding error:', error);
//         setUserTokenId('');
//       }
//     }
//   }, []);

//   return (
//     <GlobalContext.Provider value={{ userTokenId, setUserTokenId }}>
//       {children}
//     </GlobalContext.Provider>
//   );
// };

// export const useGlobalContext = () => useContext(GlobalContext);
