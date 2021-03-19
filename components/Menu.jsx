import Link from "next/link";
import * as Icons from "heroicons-react";
import { useState } from "react";
import { useRouter } from "next/router";

const SubMenu = ({ title, route }) => {
   const router = useRouter();
   const active = router.pathname === route ? "text-white" : "";

   return (
      <li>
         <Link href={route}>
            <a className={active + " hover:text-white block"}>
               <div className="pl-12 py-2 pr-5 align-middle inline-block">
                  <Icons.ChevronRight
                     className="inline-block mr-2 align-middle"
                     size="1rem"
                  />
                  <span className="inline-block align-middle">{title}</span>
               </div>
            </a>
         </Link>
      </li>
   );
};

const MenuItem = ({ children, title, icon, route, icon2 }) => {
   const router = useRouter();
   const active = router.pathname === route ? "text-white" : "";

   const toggleSub = () => {
      setShowSub(!showSub);
   };

   const [showSub, setShowSub] = useState(false);

   return (
      <li>
         <Link href={route ? route : "#"}>
            <a
               className={active + " hover:text-white block"}
               onClick={toggleSub}
            >
               <div className="pl-7 py-3 pr-5 align-middle	inline-block">
                  {icon}
                  <span className="inline-block align-middle">
                     {title ? title : "Menu Title"}
                  </span>
                  <div
                     className={`duration-300 transform inline-block  ml-4 transition align-middle ${
                        showSub ? `rotate-0` : ` -rotate-180`
                     }`}
                  >
                     {icon2}
                  </div>
               </div>
            </a>
         </Link>
         {children ? (
            <ul
               className={
                  "bg-gray-900 shadow-inner shadow-lg" +
                  (showSub ? "" : "h-0 overflow-hidden hidden")
               }
            >
               {children}
            </ul>
         ) : (
            ""
         )}
      </li>
   );
};

const MenuGroup = ({ children, name }) => {
   return (
      <>
         <li className="text-gray-500 px-5 py-2 font-bold">
            {name ? name : "Group Name"}
         </li>
         {children}
      </>
   );
};

const Menu = ({ children }) => {
   return <ul className="text-gray-400 list-none pb-4">{children}</ul>;
};

export { Menu, MenuGroup, MenuItem, SubMenu };
