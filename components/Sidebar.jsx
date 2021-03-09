export default function Sidebar({ children }) {
    return (
        <div className='bg-gray-800 w-56 fixed inset-y-0 overflow-x-hidden overflow-y-auto shadow-lg pt-20'>
            {children}
        </div>
    );
}
