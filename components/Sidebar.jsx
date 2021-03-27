import Brand from "./Brand";

export default function Sidebar({ children }) {
    return (
        <div className='w-64 z-20 h-screen fixed shadow bg-gray-800 hidden lg:block'>
            <div className='h-16 w-full flex items-center px-5 relative'>
                <Brand />
            </div>
            {children}
        </div>
    );
}
