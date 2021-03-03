import React from 'react'

export default function Sidebar(props) {
    return (
        <div hidden={props.sidebr} className='left-0 absolute  shadow-lg w-52 bg-white h-full '>
        <div className="pt-16 ml-10 mr-4">
 <h3 className=' font-bold text-blue-700'>
 MENU
 </h3>
 <div className='p-1.5 px-2 rounded-md hover:bg-green-100 flex justify-between items-center cursor-pointer'>
     <p className='font-light'>Dashboard</p>
     <div className='w-4 text-gray-300'>
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z" />
</svg>
     </div>
 </div>
        </div>
        </div>
    )
}
