import { BellOutline } from "heroicons-react";
export default function Notification() {
    return (
        <div className='h-full w-20 flex items-center justify-center border-r border-l'>
            <div className='relative cursor-pointer text-gray-600'>
                <BellOutline />
                <div className='w-2 h-2 rounded-full bg-red-400 border border-white absolute inset-0 mt-1 mr-1 m-auto'></div>
            </div>
        </div>
    );
}
