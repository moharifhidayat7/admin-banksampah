import * as Icons from "heroicons-react";
import Link from "next/link";

const SubMenu = ({ title, route }) => {
    return (
        <li>
            <Link href={route}>
                <a className='hover:text-white block'>
                    <div className='pl-12 py-2 pr-5 align-middle	inline-block'>
                        <Icons.ChevronRight className='inline-block mr-2 align-middle' />
                        <span className='inline-block align-middle'>
                            {title}
                        </span>
                    </div>
                </a>
            </Link>
        </li>
    );
};

const MenuItem = ({ children, title, Icon, route }) => {
    return (
        <li>
            <Link href={route}>
                <a className='hover:text-white block'>
                    <div className='pl-7 py-3 pr-5 align-middle	inline-block'>
                        <Icon
                            className='inline-block mr-2 align-middle'
                            size='2rem'
                        />
                        <span className='inline-block align-middle'>
                            {title ? title : "Menu Title"}
                        </span>
                    </div>
                </a>
            </Link>
            {children ? (
                <ul className='bg-gray-900 shadow-inner shadow-lg'>
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
            <li className='text-gray-500 px-5 py-2 font-bold'>
                {name ? name : "Group Name"}
            </li>
            {children}
        </>
    );
};

const Menu = ({ children }) => {
    return <ul className='text-gray-400 list-none'>{children}</ul>;
};

export { Menu, MenuGroup, MenuItem, SubMenu };
