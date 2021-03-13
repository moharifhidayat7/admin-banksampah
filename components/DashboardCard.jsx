import { PlusOutline } from "heroicons-react";

export default function DashboardCard({ icon, title, value, borderColor }) {
    return (
        <div
            className={`flex-1 m-3 bg-white rounded p-5 flex items-center shadow-md border-t-8 ${borderColor}`}
        >
            <div className='w-14'>{icon}</div>
            <div className='ml-4'>
                <h3>{title}</h3>
                <span className='text-2xl font-bold text-green-500'>
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
