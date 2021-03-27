import { SearchOutline } from "heroicons-react";

export default function SearchBox() {
    return (
        <div className='relative w-full'>
            <div className='text-gray-500 absolute ml-4 inset-0 m-auto w-4 h-4'>
                <SearchOutline size='1rem' />
            </div>
            <input
                className='border border-gray-100 focus:outline-none focus:border-indigo-700 rounded w-full text-sm text-gray-500 bg-gray-100 pl-12 py-2'
                type='text'
                placeholder='Search'
            />
        </div>
    );
}
