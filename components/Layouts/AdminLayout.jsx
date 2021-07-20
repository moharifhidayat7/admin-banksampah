import { useState } from "react";
import Head from "next/head";
import Sidebar from "../Sidebar";
import MobileNav from "../Navbar/MobileNav";
import Navbar from "../Navbar/Navbar";
import Menu from "../Menu";

export default function AdminLayout({ children }) {
  const [sidebar, setSidebar] = useState(false);

  const toggleSidebar = () => {
    setSidebar(!sidebar);
  };

  return (
    <div className='w-full h-full'>
      <Head>
        <title>Bank Sampah</title>
      </Head>
      <div className='flex flex-no-wrap'>
        <Sidebar>
          <Menu></Menu>
        </Sidebar>
        <MobileNav sidebar={sidebar} toggleSidebar={toggleSidebar} />
        <div className='w-full'>
          <Navbar
            toggleSidebar={toggleSidebar}
            clientLink='/Client/Gudang'
          ></Navbar>
          <div className='mx-5 sm:ml-5 md:ml-5 lg:ml-72 mt-24'>
            <div className='pb-10 flex flex-col space-y-2'>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
