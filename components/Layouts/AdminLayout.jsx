import { useState } from "react";

import Sidebar from "../Sidebar";
import MobileNav from "../Navbar/MobileNav";
import Navbar from "../Navbar/Navbar";

export default function AdminLayout({ children }) {
    const [sidebar, setSidebar] = useState(false);

    const toggleSidebar = () => {
        setSidebar(!sidebar);
    };

    return (
        <div className='w-full h-full'>
            <div className='flex flex-no-wrap'>
                <Sidebar></Sidebar>
                <MobileNav sidebar={sidebar} toggleSidebar={toggleSidebar} />
                <div className='w-full'>
                    <Navbar toggleSidebar={toggleSidebar}></Navbar>
                    <div className='container mx-auto py-10 h-64 md:w-11/12 lg:w-5/6 sm:w-11/12 w-11/12 px-6'>
                        <div className='w-full h-full rounded'>{children}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
