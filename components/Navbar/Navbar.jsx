import SearchBox from "./SearchBox";
import LoggedIn from "./LoggedIn";
import Notification from "./Notification";

export default function Navbar({ toggleSidebar }) {
    return (
        <nav className='h-16 flex items-center lg:items-stretch justify-end lg:justify-between bg-white shadow z-10 pl-64 w-full fixed'>
            <div className='hidden lg:flex pr-6 w-full'>
                <div className='w-1/2 h-full hidden lg:flex items-center pl-6 pr-24'>
                    <SearchBox />
                </div>
                <div className='w-1/2 hidden lg:flex'>
                    <div className='w-full flex items-center pl-8 justify-end'>
                        <Notification />
                        <LoggedIn />
                    </div>
                </div>
            </div>
            <div
                className='text-gray-600 mr-8 visible lg:hidden relative'
                onClick={toggleSidebar}
                id='menu'
            >
                <svg
                    aria-label='Main Menu'
                    aria-haspopup='true'
                    xmlns='http://www.w3.org/2000/svg'
                    className='icon icon-tabler icon-tabler-menu cursor-pointer'
                    width='30'
                    height='30'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    fill='none'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                >
                    <path stroke='none' d='M0 0h24v24H0z' />
                    <line x1='4' y1='8' x2='20' y2='8' />
                    <line x1='4' y1='16' x2='20' y2='16' />
                </svg>
            </div>
        </nav>
    );
}
