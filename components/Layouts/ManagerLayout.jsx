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
        <div className='w-full h-full'>
            <Head>
                <title>Bank Sampah</title>
            </Head>
            <div className='flex flex-no-wrap'>
                <Sidebar>
                    <List>
                        <Item
                            route='/Admin/Manager'
                            icon={<Icons.HomeOutline size='1rem' />}
                            title='Dashboard'
                        />
                        <Item
                            route='/Admin/Manager/User'
                            icon={<Icons.User size='1rem' />}
                            title='User'
                        />
                    </List>
                </Sidebar>
                <MobileNav sidebar={sidebar} toggleSidebar={toggleSidebar} />
                <div className='w-full'>
                    <Navbar
                        toggleSidebar={toggleSidebar}
                        clientLink='#'
                    ></Navbar>
                    <div className='ml-5 sm:ml-5 md:ml-5 lg:ml-72 mr-5 py-24 h-64'>
                        <div className='w-full h-full rounded'>{children}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
