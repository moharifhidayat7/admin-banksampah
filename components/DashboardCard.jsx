import { PlusOutline } from "heroicons-react";

export default function DashboardCard({
    icon,
    title,
    value,
    borderColor,
    textColor,
}) {
    return (
        <div
            className={`bg-white rounded p-4 flex items-center shadow-md border-t-8 ${borderColor}`}
        >
            <div className='w-8 mx-4 hidden sm:hidden lg:block'>{icon}</div>
            <div>
                <div>
                    <small>{title}</small>
                </div>
                <span className={`text-xl font-bold ${textColor}`}>
                    {value}
                </span>
            </div>
            {/* <div className='flex-grow'>
                <PlusOutline
                    className='float-right text-green-500'
                    size='3rem'
                />
            </div> */}
        </div>
    );
}
