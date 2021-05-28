import { useState } from "react";
import Head from "next/head";
import Sidebar from "../Sidebar";
import MobileNav from "../Navbar/MobileNav";
import Navbar from "../Navbar/Navbar";
import { List, Item, SubItem } from "../List";
import * as Icons from "heroicons-react";

export default function AdminLayout({ children }) {
   const [sidebar, setSidebar] = useState(false);

   const toggleSidebar = () => {
      setSidebar(!sidebar);
   };

   return (
      <div className="w-full h-full">
         <Head>
            <title>Bank Sampah</title>
         </Head>
         <div className="flex flex-no-wrap">
            <Sidebar>
               <List>
                  <Item
                     route="/Admin/PenjualanProduk"
                     icon={<Icons.HomeOutline size="1rem" />}
                     title="Dashboard"
                  />
                  <Item
                     icon={<Icons.ArrowCircleDown size="1rem" />}
                     title="Produk"
                  >
                     <SubItem
                        route="/Admin/PenjualanProduk/Kerajinan"
                        title="Penjualan Kerajinan"
                     />
                     <SubItem
                        route="/Admin/PenjualanProduk/Kompos"
                        title="Penjualan Kompos"
                     />
                  </Item>
                  <Item
                     route="/Admin/PenjualanProduk/Transaksi"
                     icon={<Icons.Collection size="1rem" />}
                     title="Etalase Produk"
                  />
                  <Item
                     icon={<Icons.Cash size="1rem" />}
                     title="Detail Transaksi"
                  />

                
               </List>
            </Sidebar>
            <MobileNav sidebar={sidebar} toggleSidebar={toggleSidebar} />
            <div className="w-full">
               <Navbar toggleSidebar={toggleSidebar}></Navbar>
               <div className="ml-5 sm:ml-5 md:ml-5 lg:ml-72 mr-5 py-24 h-64">
                  <div className="w-full h-full rounded">{children}</div>
               </div>
            </div>
         </div>
      </div>
   );
}
