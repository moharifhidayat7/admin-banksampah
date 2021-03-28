import { useState } from "react";
import { useRouter } from "next/router";

import Link from "next/link";

const List = ({ children }) => {
    return (
        <ul aria-orientation='vertical' className='bg-gray-800 rounded py-6'>
            {children}
        </ul>
    );
};

const Item = ({ children, title, route, icon }) => {
    const router = useRouter();

    const [dropdown, setDropdown] = useState(false);

    const toggleDropdown = () => {
        setDropdown(!dropdown);
    };

    const listClass =
        router.pathname === route
            ? "text-white pb-2 pt-3 bg-gray-900"
            : "text-gray-600 py-2 hover:text-white";

    return (
        <li
            className={`${listClass} text-sm leading-3 tracking-normal focus:text-indigo-700 focus:outline-none`}
            onClick={toggleDropdown}
        >
            <Link href={route}>
                <a className='w-full h-full'>
                    <div className='flex items-center pl-6 py-2'>
                        {icon}
                        <span className='ml-2'>{title}</span>
                    </div>
                </a>
            </Link>

            {children && (
                <ul className={`pt-1 ${dropdown ? "" : "hidden"}`}>
                    {children}
                </ul>
            )}
        </li>
    );
};

Item.defaultProps = {
    title: "List Title",
    route: "#",
};

const SubItem = ({ title, route }) => {
    const router = useRouter();

    const listClass = "";

    return (
        <li className='text-gray-600 hover:text-white text-xs leading-3 tracking-normal mb-1 flex items-center ml-2'>
            <Link href={route}>
                <a className='pl-8 py-2 w-full'>{title}</a>
            </Link>
        </li>
    );
};

SubItem.defaultProps = {
    title: "Sub List Title",
    route: "#sub",
};

export { List, Item, SubItem };