import { useState } from "react";
import Head from "next/head";
import Sidebar from "../Sidebar";
import MobileNav from "../Navbar/MobileNavPenjualan";
import Navbar from "../Navbar/Navbar";
import { List, Item, SubItem, ItemGroup } from "../List";
import * as Icons from "heroicons-react";
import Menu from "../MenuPenjualan";
export default function AdminLayout({ children }) {
  const [sidebar, setSidebar] = useState(false);

  const toggleSidebar = () => {
    setSidebar(!sidebar);
  };

  return (
    <div className='w-full h-full'>
      <div className='flex flex-no-wrap'>
        <Sidebar>
          <div className='h-full overflow-y-auto'>
            <Menu></Menu>
          </div>
        </Sidebar>
        <MobileNav sidebar={sidebar} toggleSidebar={toggleSidebar} />
        <div className='w-full'>
          <Navbar
            toggleSidebar={toggleSidebar}
            clientLink='/Client/Kasir'
          ></Navbar>
          <div className='ml-5 sm:ml-5 md:ml-5 lg:ml-72 mr-5 py-24 h-64'>
            <div className='w-full h-full rounded'>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
