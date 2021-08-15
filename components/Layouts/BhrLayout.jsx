import { useState } from "react";
import Sidebar from "../Sidebar";
import MobileNav from "../Navbar/MobileNavBhr";
import Navbar from "../Navbar/Navbar";
import MenuBhr from "@components/MenuBhr";
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
            <MenuBhr></MenuBhr>
          </div>
        </Sidebar>
        <MobileNav sidebar={sidebar} toggleSidebar={toggleSidebar} />
        <div className='w-full'>
          <Navbar
            toggleSidebar={toggleSidebar}
            clientLink='/Client/Bendahara'
          ></Navbar>
          <div className='mx-5 sm:ml-5 md:ml-5 lg:ml-72 mt-20'>
            <div className='pb-10 flex flex-col space-y-2'>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
