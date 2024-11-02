"use client"

import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <div className="mt-16 flex-col">
      <img
          className="md:w-96 w-52  absolute top-[7rem] z-0 md:left-[7rem] left-[2rem] "
          src='https://cdn.pixabay.com/photo/2016/02/06/13/31/e-commerce-1182903_640.png'
          // src="images/homeText.png"
          alt="E-Commerce Background"
        />
        <img
          className="w-full h-screen object-cover "
          src="https://images.pexels.com/photos/6214478/pexels-photo-6214478.jpeg?auto=compress&cs=tinysrgb&w=600"
          // src="images/homeMain.jpg"
          alt="E-Commerce Background"
        />
        
        {/* <h1 className="relative top-[-20%] left-[5%] text-[2rem] md:text-[4rem] text-white font-serif font-bold ">
          WellCome to 
        </h1> */}
        {/* <h1 className="absolute top-[20%] left-[5%] text-[2rem] md:text-[4rem] text-white font-serif font-bold">
          E-Commerce
        </h1>
        <h1 className="absolute top-[20%] left-[5%] text-[2rem] md:text-[4rem] text-white font-serif font-bold">
          Store
        </h1> */}
        {/* <Link
          href='/products'
          className="absolute top-[40%] left-[5%] w-[80%] md:w-[400px] text-[1.5rem] md:text-[2rem] bg-[#FFB606] p-2 rounded-lg text-white font-serif font-bold flex items-center justify-center"
        >
          View Products
        </Link> */}
      </div>
      <div className="w-full  py-10 bg-[#002147] text-white">
        <h1 className="text-center md:text-[3rem] text-[2rem] text-[#FFB606] font-bold font-serif mb-[10rem]">Shop by Categories</h1>
        <div className=' border-t-2 border-[#ded7c3] py-10 md:mx-[10rem] mx-5'></div>
        <Link href='/products' className=' cursor-pointer hover:opacity-80'>
          <div className='px-5'>
            <h2 className="text-left md:text-[2.5rem] text-[1.8] text-[#FFB606] font-bold font-serif md:ml-[9rem] mb-5">See All Our Products </h2>
            <div className="flex flex-wrap  md:my-[5rem] my-[2rem] md:px-[10rem]">
              <div className='flex-col md:w-[15rem] w-[9rem] md:h-[20rem] h-[8rem]  '>
                <img className='w-full md:h-[320px] h-[12rem] bg-cover rounded-2xl border-2 border-[#FFB606] ' src='https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=600' layout='responsive' />
                <div className='w-full flex justify-between px-3'>
                  <h1 className='hidden md:block text-[1.3rem] text-left'>Stationary</h1>
                  <h1 className=' hidden md:block text-[1rem] mt-1 text-left'>Price: from 400</h1>
                </div>
              </div>
              <div className='flex-col md:w-[15rem] w-[9rem] md:h-[20rem] h-[8rem] md:ml-7 ml-11  '>
                <img className='w-full md:h-[320px] h-[12rem] bg-cover rounded-2xl border-2 border-[#FFB606] ' src='https://images.pexels.com/photos/887751/pexels-photo-887751.jpeg?auto=compress&cs=tinysrgb&w=600' layout='responsive' />
                <div className='w-full flex justify-between px-3'>
                  <h1 className='hidden md:block text-[1.3rem] text-left'>Phones</h1>
                  <h1 className=' hidden md:block text-[1rem] mt-1 text-left'>Price: from 33245</h1>
                </div>
              </div>
              <div className='flex-col md:w-[15rem] w-[9rem] md:h-[20rem] h-[8rem] md:ml-7 md:mt-0 mt-[5rem]  '>
                <img className='w-full md:h-[320px] h-[12rem] bg-cover rounded-2xl border-2 border-[#FFB606]  ' src='https://images.pexels.com/photos/125779/pexels-photo-125779.jpeg?auto=compress&cs=tinysrgb&w=600' layout='responsive' />
                <div className='w-full flex justify-between px-3'>
                  <h1 className='hidden md:block text-[1.3rem] text-left'>Watches</h1>
                  <h1 className=' hidden md:block text-[1rem] mt-1 text-left'>Price: from 3185</h1>
                </div>
              </div>
              <div className='flex-col md:w-[15rem] w-[9rem] md:h-[20rem] h-[8rem] md:ml-7 ml-11 md:mt-0 mt-[5rem]  '>
                <img className='w-full md:h-[320px] h-[12rem] bg-cover rounded-2xl border-2 border-[#FFB606]' src='https://images.pexels.com/photos/209439/pexels-photo-209439.jpeg?auto=compress&cs=tinysrgb&w=600' layout='responsive' />
                <div className='w-full flex justify-between px-3'>
                  <h1 className='hidden md:block text-[1.3rem] text-left'>Apples</h1>
                  <h1 className='hidden md:block text-[1rem] mt-1 text-left'>Price: 345</h1>
                </div>
              </div>
            </div>
          </div>
        </Link>
        <div className='border-t-2 border-[#ded7c3] py-10 md:mx-[10rem]  mx-5 mt-[7rem] md:mt-0'></div>
        <botton className=' cursor-pointer hover:opacity-80'>
          <div className='px-5'>
            <h2 className="text-left md:text-[2.5rem] text-[1.8] text-[#FFB606] font-bold font-serif md:ml-[9rem] mb-5">Fruit Market </h2>
            <div className="flex flex-wrap  md:my-[5rem] my-[2rem] md:px-[10rem]">
              <div className='flex-col md:w-[15rem] w-[9rem] md:h-[20rem] h-[8rem]  '>
                <img className='w-full md:h-[320px] h-[12rem] bg-cover rounded-2xl border-2 border-[#FFB606] ' src='https://images.pexels.com/photos/209439/pexels-photo-209439.jpeg?auto=compress&cs=tinysrgb&w=600' layout='responsive' />
                <div className='w-full flex justify-between px-3'>
                  <h1 className='hidden md:block text-[1.3rem] text-left'>Apple</h1>
                  <h1 className='hidden md:block text-[1rem] mt-1 text-left'>Price: 545</h1>
                </div>
              </div>
              <div className='flex-col md:w-[15rem] w-[9rem] md:h-[20rem] h-[8rem] md:ml-7 ml-11  '>
                <img className='w-full md:h-[320px] h-[12rem] bg-cover rounded-2xl border-2 border-[#FFB606] ' src='https://images.pexels.com/photos/207085/pexels-photo-207085.jpeg?auto=compress&cs=tinysrgb&w=600' layout='responsive' />
                <div className='w-full flex justify-between px-3'>
                  <h1 className='hidden md:block text-[1.3rem] text-left'>Oranges</h1>
                  <h1 className='hidden md:block text-[1rem] mt-1 text-left'>Price: 245</h1>
                </div>
              </div>
              <div className='flex-col md:w-[15rem] w-[9rem] md:h-[20rem] h-[8rem] md:ml-7 md:mt-0 mt-[5rem]  '>
                <img className='w-full md:h-[320px] h-[12rem] bg-cover rounded-2xl border-2 border-[#FFB606]  ' src='https://media.istockphoto.com/id/1400057530/photo/bananas-isolated.jpg?b=1&s=612x612&w=0&k=20&c=l_PYva9aG-82rWFI_HQ8jzArXRYiciq2cVvX12Sj-QU=' layout='responsive' />
                <div className='w-full flex justify-between px-3'>
                  <h1 className='hidden md:block text-[1.3rem] text-left'>Bananas</h1>
                  <h1 className='hidden md:block text-[1rem] mt-1 text-left'>Price: 185</h1>
                </div>
              </div>
              <div className='flex-col md:w-[15rem] w-[9rem] md:h-[20rem] h-[8rem] md:ml-7 ml-11 md:mt-0 mt-[5rem]  '>
                <img className='w-full md:h-[320px] h-[12rem] bg-cover rounded-2xl border-2 border-[#FFB606] ' src='https://images.pexels.com/photos/2996250/pexels-photo-2996250.jpeg?auto=compress&cs=tinysrgb&w=600' layout='responsive' />
                <div className='w-full flex justify-between px-3'>
                  <h1 className='hidden md:block text-[1.3rem] text-left'>Pomegranate</h1>
                  <h1 className='hidden md:block text-[1rem] mt-1 text-left'>Price: 345</h1>
                </div>
              </div>

            </div>
          </div>
        </botton>
        <div className='border-t-2 border-[#ded7c3] py-10 md:mx-[10rem] mx-5 mt-[7rem] md:mt-0'></div>
        <botton className=' cursor-pointer hover:opacity-80'>
          <div className='px-5'>
            <h2 className="text-left md:text-[2.5rem] text-[1.8] text-[#FFB606] font-bold font-serif md:ml-[9rem] mb-5">Books and Stationary </h2>
            <div className="flex flex-wrap  md:my-[5rem] my-[2rem] md:px-[10rem]">
              <div className='flex-col md:w-[15rem] w-[9rem] md:h-[20rem] h-[8rem]  '>
                <img className='w-full md:h-[320px] h-[12rem] bg-cover rounded-2xl border-2 border-[#FFB606] ' src='https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=600' layout='responsive' />
                <div className='w-full flex justify-between px-3'>
                  <h1 className='hidden md:block text-[1.3rem] text-left'>Bag</h1>
                  <h1 className='hidden md:block text-[1rem] mt-1 text-left'>Price: 2000</h1>
                </div>
              </div>
              <div className='flex-col md:w-[15rem] w-[9rem] md:h-[20rem] h-[8rem] md:ml-7 ml-11  '>
                <img className='w-full md:h-[320px] h-[12rem] bg-cover rounded-2xl border-2 border-[#FFB606] ' src='https://images.pexels.com/photos/372748/pexels-photo-372748.jpeg?auto=compress&cs=tinysrgb&w=600' layout='responsive' />
                <div className='w-full flex justify-between px-3'>
                  <h1 className='hidden md:block text-[1.3rem] text-left'>Pen</h1>
                  <h1 className='hidden md:block text-[1rem] mt-1 text-left'>Price: 245</h1>
                </div>
              </div>
              <div className='flex-col md:w-[15rem] w-[9rem] md:h-[20rem] h-[8rem] md:ml-7 md:mt-0 mt-[5rem]  '>
                <img className='w-full md:h-[320px] h-[12rem] bg-cover rounded-2xl border-2 border-[#FFB606] ' src='https://images.pexels.com/photos/7718680/pexels-photo-7718680.jpeg?auto=compress&cs=tinysrgb&w=600' layout='responsive' />
                <div className='w-full flex justify-between px-3'>
                  <h1 className='hidden md:block text-[1.3rem] text-left'>Ruler</h1>
                  <h1 className='hidden md:block text-[1rem] mt-1 text-left'>Price: 50</h1>
                </div>
              </div>
              <div className='flex-col md:w-[15rem] w-[9rem] md:h-[20rem] h-[8rem] md:ml-7 ml-11 md:mt-0 mt-[5rem]  '>
                <img className='w-full md:h-[320px] h-[12rem] bg-cover rounded-2xl border-2 border-[#FFB606] ' src='https://images.pexels.com/photos/159752/pencil-office-design-creative-159752.jpeg?auto=compress&cs=tinysrgb&w=600' layout='responsive' />
                <div className='w-full flex justify-between px-3'>
                  <h1 className='hidden md:block text-[1.3rem] text-left'>Pencil</h1>
                  <h1 className='hidden md:block text-[1rem] mt-1 text-left'>Price: 50</h1>
                </div>
              </div>

            </div>
          </div>
        </botton>
        <div className='border-t-2 border-[#ded7c3] py-10 md:mx-[10rem] mx-5 mt-[7rem] md:mt-0'></div>
        <botton className=' cursor-pointer hover:opacity-80'>
          <div className='px-5'>
            <h2 className="text-left md:text-[2.5rem] text-[1.8] text-[#FFB606] font-bold font-serif md:ml-[9rem] mb-5">Mobile and Accessories </h2>
            <div className="flex flex-wrap  md:my-[5rem] my-[2rem] md:px-[10rem]">
              <div className='flex-col md:w-[15rem] w-[9rem] md:h-[20rem] h-[8rem]  '>
                <img className='w-full md:h-[320px] h-[12rem] bg-cover rounded-2xl border-2 border-[#FFB606] ' src='https://images.pexels.com/photos/4097207/pexels-photo-4097207.jpeg?auto=compress&cs=tinysrgb&w=600' layout='responsive' />
                <div className='w-full flex justify-between px-3'>
                  <h1 className='hidden md:block text-[1.3rem] text-left'>Charger</h1>
                  <h1 className='hidden md:block text-[1rem] mt-1 text-left'>Price: 545</h1>
                </div>
              </div>
              <div className='flex-col md:w-[15rem] w-[9rem] md:h-[20rem] h-[8rem] md:ml-7 ml-11  '>
                <img className='w-full md:h-[320px] h-[12rem] bg-cover rounded-2xl border-2 border-[#FFB606]' src='https://images.pexels.com/photos/3945667/pexels-photo-3945667.jpeg?auto=compress&cs=tinysrgb&w=600' layout='responsive' />
                <div className='w-full flex justify-between px-3'>
                  <h1 className='hidden md:block text-[1.3rem] text-left'>HeadPhones</h1>
                  <h1 className='hidden md:block text-[1rem] mt-1 text-left'>Price: 1245</h1>
                </div>
              </div>
              <div className='flex-col md:w-[15rem] w-[9rem] md:h-[20rem] h-[8rem] md:ml-7 md:mt-0 mt-[5rem]  '>
                <img className='w-full md:h-[320px] h-[12rem] bg-cover rounded-2xl border-2 border-[#FFB606]' src='https://images.pexels.com/photos/887751/pexels-photo-887751.jpeg?auto=compress&cs=tinysrgb&w=600' layout='responsive' />
                <div className='w-full flex justify-between px-3'>
                  <h1 className='hidden md:block text-[1.3rem] text-left'>iPhone</h1>
                  <h1 className='hidden md:block text-[1rem] mt-1 text-left'>Price: 23185</h1>
                </div>
              </div>
              <div className='flex-col md:w-[15rem] w-[9rem] md:h-[20rem] h-[8rem] md:ml-7 ml-11 md:mt-0 mt-[5rem] '>
                <img className='w-full md:h-[320px] h-[12rem] bg-cover rounded-2xl border-2 border-[#FFB606]' src='https://images.pexels.com/photos/4812315/pexels-photo-4812315.jpeg?auto=compress&cs=tinysrgb&w=600' layout='responsive' />
                <div className='w-full flex justify-between px-3'>
                  <h1 className='hidden md:block text-[1.3rem] text-left'>Power Bank</h1>
                  <h1 className='hidden md:block text-[1rem] mt-1 text-left'>Price: 1345</h1>
                </div>
              </div>

            </div>
          </div>
        </botton>
        <div className='border-t-2 border-[#ded7c3] py-10 md:mx-[10rem] mx-5 mt-[7rem] md:mt-0'></div>
        <botton className=' cursor-pointer hover:opacity-80'>
          <div className='px-5'>
            <h2 className="text-left md:text-[2.5rem] text-[1.8] text-[#FFB606] font-bold font-serif md:ml-[9rem] mb-5"> Watches </h2>
            <div className="flex flex-wrap  md:my-[5rem] my-[2rem] md:px-[10rem]">
              <div className='flex-col md:w-[15rem] w-[9rem] md:h-[20rem] h-[8rem]  '>
                <img className='w-full md:h-[320px] h-[12rem] bg-cover rounded-2xl border-2 border-[#FFB606]' src='https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=600' layout='responsive' />
                <div className='w-full flex justify-between px-3'>
                  <h1 className='hidden md:block text-[1.3rem] text-left'>Fernando Arcos</h1>
                  <h1 className=' hidden md:block text-[1rem] mt-1 text-left'>Price: 1545</h1>
                </div>
              </div>
              <div className='flex-col md:w-[15rem] w-[9rem] md:h-[20rem] h-[8rem] md:ml-7 ml-11  '>
                <img className='w-full md:h-[320px] h-[12rem] bg-cover rounded-2xl border-2 border-[#FFB606]' src='https://images.pexels.com/photos/125779/pexels-photo-125779.jpeg?auto=compress&cs=tinysrgb&w=600' layout='responsive' />
                <div className='w-full flex justify-between px-3'>
                  <h1 className='hidden md:block text-[1.3rem] text-left'>Royal</h1>
                  <h1 className='hidden md:block text-[1rem] mt-1 text-left'>Price: 2245</h1>
                </div>
              </div>
              <div className='flex-col md:w-[15rem] w-[9rem] md:h-[20rem] h-[8rem] md:ml-7 md:mt-0 mt-[5rem]  '>
                <img className='w-full md:h-[320px] h-[12rem] bg-cover rounded-2xl border-2 border-[#FFB606] ' src='https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg?auto=compress&cs=tinysrgb&w=600' layout='responsive' />
                <div className='w-full flex justify-between px-3'>
                  <h1 className='hidden md:block text-[1.3rem] text-left'>Rado</h1>
                  <h1 className='hidden md:block text-[1rem] mt-1 text-left'>Price: 23185</h1>
                </div>
              </div>
              <div className='flex-col md:w-[15rem] w-[9rem] md:h-[20rem] h-[8rem] md:ml-7 ml-11 md:mt-0 mt-[5rem]  '>
                <img className='w-full md:h-[320px] h-[12rem] bg-cover rounded-2xl border-2 border-[#FFB606]' src='https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&w=600' layout='responsive' />
                <div className='w-full flex justify-between px-3'>
                  <h1 className='hidden md:block text-[1.3rem] text-left'>Casio</h1>
                  <h1 className='hidden md:block text-[1rem] mt-1 text-left'>Price: 3345</h1>
                </div>
              </div>

            </div>
          </div>
        </botton>
      </div>






    </div>
  );
}