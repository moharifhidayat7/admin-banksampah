import React from "react";

const Button = ({
   handleClick,
   type,
   children,
   disable,
   color,
   css,
   onChange,
}) => {
   return (
      <button
         disabled={disable != null ? true : false}
         type={type}
         className={`px-2 focus:outline-none shadow-md bg-${color}-500 rounded-md font-bold py-0.5 ring-2 ring-white text-white   focus:ring-${color}-500 focus:bg-white focus:text-${color}-500 ${
            disable != null
               ? `cursor-not-allowed cursor-red-500 opacity-50`
               : ``
         } ${css}`}
         onChange={onChange}
         onClick={handleClick}
      >
         {children}
      </button>
   );
};
export { Button };
