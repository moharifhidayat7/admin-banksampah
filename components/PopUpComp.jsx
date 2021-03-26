const PopUpComp = ({children,pop}) => {
   return (
      <div hidden={pop} className="absolute bg-opacity-50 z-20 bg-black inset-0">
         <div className="max-h-96 md:w-6/12 bg-blue-50 w-11/12 mt-32 mx-auto rounded-md p-2 overflow-y-auto">
           {children}
         </div>
      </div>
   );
};

export default PopUpComp;
