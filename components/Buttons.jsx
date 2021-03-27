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
const ButtonIcons = ({ icon, children ,onChange,onClick}) => {
   return (
      <button onClick={onClick} onChange={onChange} className="inline-flex shadow-md rounded-md overflow-hidden">
         <div className="bg-yellow-300 h-full w-full  flex items-center">{icon} </div>
         <p className="bg-white font-bold w-full h-full pr-2 flex items-center">{children}</p>
      </button>
   );
};

export { Button, ButtonIcons };
