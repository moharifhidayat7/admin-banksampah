const InputComp = ({ nama, id, tipe, labels,acc }) => {
   return (
      <div className="flex justify-center">
         <div className="mb-2 w-80">
            <label htmlFor={labels} className="text-gray-400">
               {labels}
            </label>
            <input
               className="p-2  shadow-md rounded-md w-full"
               type={tipe}
               name={nama}
               id={id}
               placeholder={nama}
               accept={acc}
            />
         </div>
      </div>
   );
};
const InputRadio = ({ nama, labels, value }) => {
   return (
      <div className="flex justify-center">
         <div className="w-80">
            <label htmlFor={labels} className="text-gray-400 block">
               {labels}
            </label>
            <div className="flex space-x-2">
               {value.map((value) => {
                  return (
                     <label htmlFor={value} key={value}>
                        <input type="radio" name={nama} id={value} value={value} />
                        {value}
                     </label>
                  );
               })}
            </div>
         </div>
      </div>
   );
};

export { InputComp, InputRadio };
