import * as Icons from "heroicons-react";

export default function Navbar() {
    return (
        <div className='flex bg-gray-800 w-full fixed top-0 inset-x-0 px-8 shadow-lg z-50'>
            <div className='flex-1 self-center'>
                <img
                    src='/logo.png'
                    alt='logo'
                    width='150'
                    className='inline-block mr-10'
                />
                {/* <Icons.Menu
                    className='text-white inline-block cursor-pointer bg-gray-900 hover:bg-gray-700'
                    size='2rem'
                /> */}
            </div>
            <div className='flex-1'>
                <input
                    type='text'
                    className='bg-gray-900 h-full w-full text-white p-4'
                    placeholder='Cari Nasabah, Rekening, Transaksi, dll.'
                />
            </div>
            <div className='flex-1 text-right'>
                <div className='bg-red-500 text-white w-min p-4 float-right'>
                    Username
                </div>
            </div>
        </div>
    );
}
