import * as Icons from "heroicons-react";
import Link from "next/link";
import { useGlobalContext } from "../components/Contexts/GlobalContext";

export default function Navbar() {
    const [state, dispatch] = useGlobalContext();

    return (
        <div className='flex sm:justify-between bg-gray-800 w-full h-20 md:h-auto fixed top-0 inset-x-0 md:px-8 shadow-lg z-10'>
            <div className='md:flex-1 flex-initial'>
                <Link href='/'>
                    <a>
                        <div className='h-full md:inline-block md:w-150 md:bg-logo-text bg-logo-icon bg-center bg-w-60px md:bg-w-150px bg-no-repeat'>
                            <div className='block h-full w-icon-60 mx-6'></div>
                        </div>
                    </a>
                </Link>
                <button
                    className='hidden md:inline-block focus:outline-none align-top h-full ml-4 px-2'
                    onClick={() => {
                        dispatch("toggleSidebar");
                    }}
                >
                    <Icons.Menu
                        className='text-white inline-block h-full'
                        size='2rem'
                    />
                </button>
            </div>
            <div className='flex-1 flex-grow'>
                <input
                    type='search'
                    className='bg-gray-900 h-full w-full text-white p-4'
                    placeholder='Cari Nasabah, Rekening, Transaksi, dll.'
                />
            </div>
            <div className='md:flex-1 flex-initial md:text-right'>
                <div className='hidden md:block h-full bg-red-500 text-white w-min p-4 float-right'>
                    Username
                </div>
                <button
                    className='md:hidden inline-block h-full px-8 cursor-pointer hover:bg-gray-700'
                    onClick={() => {
                        dispatch("toggleSidebar");
                    }}
                >
                    <Icons.Menu
                        className='text-white inline-block h-full'
                        size='2rem'
                    />
                </button>
            </div>
        </div>
    );
}
