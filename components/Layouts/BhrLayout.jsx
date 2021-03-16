import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import * as Icons from "heroicons-react";
import { Menu, MenuGroup, MenuItem, SubMenu } from "../Menu";
import Head from "next/head";
import { useGlobalContext } from "../Contexts/GlobalContext";

export default function BhrLayout({ children }) {
   const [state, dispatch] = useGlobalContext();

   return (
      <>
         <Head>
            <title>Bank Sampah</title>
            <link
               rel="icon"
               href="/logo-icon.png"
               sizes="16x16"
               type="image/png"
            />
         </Head>
         <Navbar />
         <div className="flex">
            <Sidebar>
               <Menu>
                  <MenuGroup name="General">
                     <MenuItem
                        title="Dashboard"
                        route="/Bendahara"
                        showSub={false}
                        icon={
                           <Icons.Home className="inline-block mr-2 align-middle" />
                        }
                     ></MenuItem>
                     <MenuItem
                        title="Keuangan"
                        showSub={false}
                        icon={
                           <Icons.CurrencyDollar className="inline-block mr-2 align-middle" />
                        }
                        icon2={
                           <Icons.ArrowDown className='w-4'/>
                        }
                     >
                        <SubMenu
                           title="Pemasukan"
                           route="/Bendahara/Pemasukan"
                        />
                        <SubMenu
                           title="Pengeluaran"
                           route="/Bendahara/Pengeluaran"
                        />
                     </MenuItem>
                     <MenuItem
                        title="Nasabah"
                        showSub={false}
                        icon={
                           <Icons.UserGroup className="inline-block mr-2 align-middle" />
                        }
                        icon2={
                           <Icons.ArrowDown className='w-4'/>
                        }
                     >
                     <SubMenu title='Daftar Nasabah' route='/Bendahara/DaftarNasabah'/>
                     <SubMenu title='Detail Nasabah' route='/Bendahara/DetailNasabah'/>
                     </MenuItem>
                  </MenuGroup>
               </Menu>
            </Sidebar>

            <div
               className={
                  (state.showSidebar ? "" : "md:ml-64") +
                  " mt-24 mx-6 md:mr-6 w-full"
               }
            >
               {children}
            </div>
         </div>
      </>
   );
}
