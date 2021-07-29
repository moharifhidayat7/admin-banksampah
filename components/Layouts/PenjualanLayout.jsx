import { useState } from "react";
import Head from "next/head";
import Sidebar from "../Sidebar";
import MobileNav from "../Navbar/MobileNav";
import Navbar from "../Navbar/Navbar";
import { List, Item, SubItem, ItemGroup } from "../List";
import * as Icons from "heroicons-react";

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
            <List>
              <Item
                route='/Admin/Penjualan'
                icon={<Icons.HomeOutline size='1rem' />}
                title='Dashboard'
              />
              <ItemGroup title='DATA'>
                <Item
                  route='/Admin/Penjualan/Produk'
                  icon={<Icons.ClipboardList size='1rem' />}
                  title='Produk'
                >
                  <SubItem
                    route='/Admin/Penjualan/Produk'
                    title='Data Produk'
                  />
                  <SubItem
                    route='/Admin/Penjualan/Produk/Kategori'
                    title='Kategori'
                  />
                </Item>
              </ItemGroup>
              <ItemGroup title='TRANSAKSI'>
                <Item
                  route='/Admin/Penjualan/Stok'
                  icon={<Icons.ClipboardList size='1rem' />}
                  title='Stok In/Out'
                ></Item>
              </ItemGroup>
              <ItemGroup title='LAPORAN'>
                <Item
                  route='/Admin/Penjualan/Pesanan'
                  icon={<Icons.ShoppingCart size='1rem' />}
                  title='Transaksi Penjualan'
                />
//                 <Item
//                   route='/Admin/Penjualan/RekapPenjualan'
//                   icon={<Icons.DocumentReport size='1rem' />}
//                   title='Rekap Penjualan Produk'
//                 />
              </ItemGroup>
            </List>
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
