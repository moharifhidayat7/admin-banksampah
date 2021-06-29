import { useState } from "react";
import { signOut, useSession, getSession } from "next-auth/client";
import { UserOutline, LogoutOutline } from "heroicons-react";

export default function LoggedIn() {
    const [session, loading] = useSession();
    const [dropdown, setDropdown] = useState(false);

    const toggleDropdown = () => {
        setDropdown(!dropdown);
    };

    return (
        <div
            className='flex items-center relative cursor-pointer'
            onClick={toggleDropdown}
        >
            <div className='rounded-full'>
                <ul
                    className={`p-2 w-40 border-r bg-white absolute rounded right-0 shadow mt-10 sm:mt-10 ${
                        dropdown ? "" : "hidden"
                    }`}
                >
                    {/* <li className='flex w-full justify-between text-gray-600 hover:text-indigo-700 cursor-pointer items-center'>
                        <div className='flex items-center'>
                            <UserOutline size='1rem' />
                            <span className='text-sm ml-2'>My Profile</span>
                        </div>
                    </li> */}
                    <li
                        onClick={() => {
                            signOut({ callbackUrl: "/login" });
                        }}
                        className='flex w-full justify-between text-gray-600 hover:text-indigo-700 cursor-pointer items-center mt-2'
                    >
                        <div className='flex items-center'>
                            <LogoutOutline size='1rem' />
                            <span className='text-sm ml-2'>Sign out</span>
                        </div>
                    </li>
                </ul>
                {/* <div className='relative'>
                    <img
                        className='rounded-full h-10 w-10 object-cover'
                        src='https://tuk-cdn.s3.amazonaws.com/assets/components/sidebar_layout/sl_1.png'
                        alt='avatar'
                    />
                    <div className='w-2 h-2 rounded-full bg-green-400 border border-white absolute inset-0 mb-0 mr-0 m-auto'></div>
                </div> */}
            </div>
            <p className='text-gray-800 text-sm mx-3'>
                {session ? session.user.name : ""}
            </p>
            <div className='cursor-pointer text-gray-600'>
                <svg
                    aria-haspopup='true'
                    xmlns='http://www.w3.org/2000/svg'
                    className='icon icon-tabler icon-tabler-chevron-down'
                    width='20'
                    height='20'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    fill='none'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                >
                    <path stroke='none' d='M0 0h24v24H0z' />
                    <polyline points='6 9 12 15 18 9' />
                </svg>
            </div>
        </div>
    );
}
