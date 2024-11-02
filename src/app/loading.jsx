"use client"
import React from 'react';
import { TailSpin } from 'react-loader-spinner';

const Loading = () => {
    return (
        <div className="absolute inset-0 flex justify-center items-center bg-white z-50">
            <TailSpin
                visible={true}
                height="80"
                width="80"
                color="#002147"
                ariaLabel="tail-spin-loading"
                radius="9"
            />
        </div>
          
    );
}

export default Loading;