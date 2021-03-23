import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import * as Icons from "heroicons-react";
import { Menu, MenuGroup, MenuItem, SubMenu } from "../Menu";
import Head from "next/head";
import { useGlobalContext } from "../Contexts/GlobalContext";

export default function AdminLayout({ children }) {
    const [state, dispatch] = useGlobalContext();

    return (
        <>
            <Head>
                <title>Bank Sampah</title>
                <link
                    rel='icon'
                    href='/logo-icon.png'
                    sizes='16x16'
                    type='image/png'
                />
            </Head>
            <Navbar />
            <div className='flex'>
                <Sidebar>
                    <Menu>
                        <MenuGroup name='General'>
                            <MenuItem
                                title='Dashboard'
                                route='/Admin/Gudang'
                                showSub={false}
                                icon={
                                    <Icons.Home className='inline-block mr-2 align-middle' />
                                }
                            ></MenuItem>
                            <MenuItem
                                route='/Admin/Gudang/Pembelian'
                                title='Pembelian'
                                showSub={false}
                                icon={
                                    <Icons.CurrencyDollar className='inline-block mr-2 align-middle' />
                                }
                            ></MenuItem>
                            <MenuItem
                                route='/Admin/Gudang/Nasabah'
                                title='Nasabah'
                                showSub={false}
                                icon={
                                    <Icons.UserGroup className='inline-block mr-2 align-middle' />
                                }
                            ></MenuItem>
                            <MenuItem
                                route='/Admin/Gudang/Sampah'
                                title='Sampah'
                                showSub={false}
                                icon={
                                    <Icons.Trash className='inline-block mr-2 align-middle' />
                                }
                            ></MenuItem>
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
