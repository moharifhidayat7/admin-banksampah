import Link from "next/link";
import { signOut, useSession, getSession } from "next-auth/client";
export default function NavbarProduk({ productCategory }) {
  const [session, loading] = useSession();
  return (
    <div id='home' className='top-0 relative mb-4 w-full'>
      <div className='top-0 w-full bg-blue-800 lg:bg-white'>
        <div className='flex px-4  lg:h-24 lg:px-24 justify-between items-center '>
          <div className='flex items-center space-x-4'>
            <h3 className='font-thin lg:mr-14 font-bold text-xl lg:text-4xl text-white lg:text-blue-800 mr-24 py-1'>
              PENJUALAN
            </h3>
            <div className='lg:hidden flex'>Cari</div>
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
      </div>
    </div>
  );
}
