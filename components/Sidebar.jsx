import Menu from "./Menu";
import Brand from "./Brand";

export default function Sidebar({ children }) {
    return (
        <div className='absolute lg:relative w-64 h-screen shadow bg-gray-800 hidden lg:block'>
            <div className='h-16 w-full flex items-center px-5 relative'>
                <Brand />
            </div>
            <Menu />
        </div>
    );
}
