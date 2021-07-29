import * as Icons from "heroicons-react";
import { useRouter } from "next/router";

export default function ContentBox({ children, title }) {
  const router = useRouter();
  return (
    <div>
      <div className='bg-white rounded-md shadow-md border-gray-300 w-full'>
        <div className='py-2 px-4 border-b flex justify-between items-center'>
          <h3 className='text-lg font-medium'>{title}</h3>
          <button
            type='button'
            onClick={() => {
              router.back();
            }}
            className='px-3 py-1 focus:outline-none shadow-md bg-gray-500 rounded ring-2 ring-white text-white hover:ring-gray-500 hover:bg-white hover:text-gray-500 focus:ring-gray-500 focus:bg-white focus:text-gray-500'
          >
            <Icons.ArrowLeft
              size='1rem'
              className='inline-block align-middle mr-2'
            />
            <span className='align-middle'>Kembali</span>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
ContentBox.Body = ({ children, className = "" }) => {
  return <div className={`m-auto py-2 px-4 ${className}`}>{children}</div>;
};
ContentBox.Footer = ({ children, className = "" }) => {
  return (
    <div className='py-2 px-4 border-t'>
      <div className={className}>{children}</div>
    </div>
  );
};
