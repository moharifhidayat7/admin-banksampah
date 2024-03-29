import * as Icon from "heroicons-react";
import Link from "next/link";
import { signOut, useSession, getSession } from "next-auth/client";
export default function NavbarBendahara() {
  const [session, loading] = useSession();
  return (
    <div>
      <div className='top-0 w-full bg-blue-800 lg:bg-white'>
        <div className='flex px-4  lg:h-24 lg:px-24 justify-between items-center'>
          <div className='flex'>
            <h3 className='lg:mr-14 font-bold text-xl lg:text-4xl text-white lg:text-blue-800 mr-24 py-1'>
              BENDAHARA
            </h3>
            <div className='hidden lg:flex'>
              <Link href='/Client/Bendahara'>
                <a
                  role='button'
                  className='font-sans focus:outline-none focus:border-pink-500  text-xl border-b-2 border-transparent mr-10 hover:border-pink-500 transform hover:scale-105 py-1'
                >
                  Transaksi
                </a>
              </Link>
            </div>
          </div>
          <div className='lg:flex hidden lg:text-black space-x-10'>
            <p className='text-gray-800 text-sm mx-3'>
              {session ? session.user.name : ""}
            </p>
            <Link href='#'>
              <a
                role='button'
                onClick={() => {
                  signOut({ callbackUrl: "/login" });
                }}
              >
                Logout
              </a>
            </Link>
          </div>
        </div>

        <div className='lg:hidden overflow-y-auto shadow-lg flex w-full bg-white px-4 border-b-2'>
          <div className='border-l border-r'>
            <Link href='/Client/Bendahara'>
              <a
                role='button'
                className='py-0.5 px-4 focus:outline-none border-b-2 border-transparent  focus:border-pink-500 flex flex-col items-center'
              >
                <Icon.CurrencyDollar className='text-gray-700' />
                <span className='uppercase font-mono'>Transaksi</span>
              </a>
            </Link>
          </div>
          <div className='border-r'>
            <Link href='/Client/Bendahara/Pendaftaran'>
              <a
                role='button'
                className='py-0.5 px-4 focus:outline-none border-b-2 border-transparent focus:border-pink-500 flex flex-col items-center'
              >
                <Icon.Newspaper className='text-gray-700' />
                <span className='uppercase font-mono'>Pendaftaran</span>
              </a>
            </Link>
          </div>
          <div className='border-r'>
            <Link href='/Admin/Bendahara'>
              <a
                role='button'
                className='py-0.5 px-4 focus:outline-none border-b-2 border-transparent focus:border-pink-500 flex flex-col items-center'
              >
                <Icon.Eye className='text-gray-700' />
                <span className='uppercase font-mono'>Admin</span>
              </a>
            </Link>
          </div>
          <div className='border-r'>
            <button className='py-0.5 px-4 focus:outline-none border-b-2 border-transparent focus:border-pink-500 flex flex-col items-center'>
              <Icon.Logout className='text-gray-700' />
              <span className='uppercase font-mono'>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
