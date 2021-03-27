import { useState } from "react";

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
            <div className='flex flex-no-wrap'>
                <Sidebar>
                    <List>
                        <Item
                            route='/Admin/Bendahara'
                            icon={<Icons.HomeOutline size='1rem' />}
                            title='Dashboard'
                        />
                        <Item
                            route='/Admin/Bendahara/Nasabah'
                            icon={<Icons.UserGroup size='1rem' />}
                            title='Nasabah'
                        />
                        <Item
                            icon={<Icons.Cash size='1rem' />}
                            title='Keuangan'
                        >
                            <SubItem
                                route='/Admin/Bendahara/Pengeluaran'
                                title='Pengeluaran'
                            ></SubItem>
                            <SubItem
                                route='/Admin/Bendahara/Pemasukan'
                                title='Pemasukan'
                            ></SubItem>
                        </Item>
                    </List>
                </Sidebar>
                <MobileNav sidebar={sidebar} toggleSidebar={toggleSidebar} />
                <div className='w-full'>
                    <Navbar toggleSidebar={toggleSidebar}></Navbar>
                    <div className='ml-5 sm:ml-5 md:ml-5 lg:ml-72 mr-5 py-24 h-64'>
                        <div className='w-full h-full rounded'>{children}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
