import { useState } from "react";

import { BellOutline, XOutline } from "heroicons-react";

import Menu from "../Menu";
import Brand from "../Brand";
import SearchBox from "./SearchBox";

export default function MobileNav({ sidebar, toggleSidebar }) {
    return (
        <div
            className={`absolute w-full h-full z-40 lg:hidden ${
                sidebar ? "" : "hidden"
            }`}
            id='mobile-nav'
        >
            <div
                className='bg-gray-800 opacity-50 absolute h-full w-full lg:hidden'
                onClick={toggleSidebar}
            ></div>
            <div className='absolute z-40 sm:relative w-64 md:w-96 overflow-y-auto shadow pb-4 bg-gray-800 lg:hidden transition duration-150 ease-in-out h-full'>
                <div className='flex flex-col justify-between h-full w-full'>
                    <div>
                        <div className='flex items-center justify-between px-8'>
                            <div className='h-16 w-full flex items-center'>
                                <Brand type='text' />
                            </div>
                            <div
                                id='closeSideBar'
                                className='flex items-center justify-center h-10 w-10 ml-8'
                                onClick={toggleSidebar}
                            >
                                <XOutline className='text-white' />
                            </div>
                        </div>
                        <Menu />
                    </div>
                    <div className='w-full'>
                        <div className='flex justify-center mb-4 w-full px-6'>
                            <SearchBox />
                        </div>
                        <div className='border-t border-gray-300'>
                            <div className='w-full flex items-center justify-between px-6 pt-1'>
                                <div className='flex items-center'>
                                    {/* <img
                                        alt='profile-pic'
                                        src='https://tuk-cdn.s3.amazonaws.com/assets/components/boxed_layout/bl_1.png'
                                        className='w-8 h-8 rounded-md'
                                    /> */}
                                    <p className='md:text-xl text-white text-base leading-4 ml-2'>
                                        Jane Doe
                                    </p>
                                </div>
                                <ul className='flex'>
                                    <li className='cursor-pointer text-white pt-5 pb-3 pl-3'>
                                        <BellOutline />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
