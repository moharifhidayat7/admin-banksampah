import React, { useState } from "react";

export default function Settings(props) {
  const [opti, setOpti] = useState(true);

  return (
    <div className="text-left">

      <div
        className="w-7 text-green-700 ml-4 flex items-center rounded-full cursor-pointer"
        
      >
        <img src="/logo/notif.png" alt="notif"/>
       <img onClick={() => setOpti(!opti)} src="/logo/settings.png" alt="pengaturan"/>
      </div>
      
      <div
        hidden={opti}
        className=" absolute ri mt-3 w-36 right-0 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
      >
        <div
          className="py-1"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
          >
            Account settings
          </a>
          <form method="POST" action="#">
            <button
              type="submit"
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
              role="menuitem"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
