import { useState } from "react";

const InputComp = ({ nama, id, tipe, labels, acc }) => {
   return (
      <div className="flex justify-center">
         <div className='mb-2 w-80'>
            <label htmlFor={labels} className="text-gray-400">
               {labels}
            </label>
            <input
               className="p-2 bg-white  shadow-md rounded-md w-full "
               type={tipe}
               name={id}
               id={id}
               placeholder={nama}
               accept={acc}
            />
         </div>
      </div>
   );
};

const InputNumb = ({ labels, id, nama }) => {
   const [harga, setHarga] = useState("");
   const numOnly = (e) => {
      let re = /^[0-9\b]+$/;
      console.log(re.test(e.target.value));
      if (e.target.value === "" || re.test(e.target.value)) {
         setHarga(e.target.value);
      }
   };
   return (
      <div className="flex justify-center">
         <div className="mb-2 w-80">
            <label htmlFor={labels} className="text-gray-400">
               {labels}
            </label>
            <input
               className="p-2 bg-white  shadow-md rounded-md w-full"
               onChange={numOnly}
               name={nama}
               id={id}
               placeholder={nama}
               pattern="[0-9]*"
               value={harga}
            />
         </div>
      </div>
   );
};
const InputNumb2 = ({id,nama}) => {
   const [harga, setHarga] = useState("");
   const numOnly = (e) => {
      let re = /^[0-9\b]+$/;
      console.log(re.test(e.target.value));
      if (e.target.value === "" || re.test(e.target.value)) {
         setHarga(e.target.value);
      }
   };
   return (
      <div className='flex justify-center items-center'>
         <input 
         className='w-6 focus:outline-none'
               onChange={numOnly}
               name={nama}
               id={id}
               placeholder={nama}
               pattern="[0-9]*"
               value={harga}/>
               <label htmlFor={nama} className='text-gray-500'>Kg</label>
      </div>
   )
}


const InputRadio = ({ nama, labels, value, css }) => {
   return (
      <div className={`flex justify-center ${css}`}>
         <div className="w-80">
            <label htmlFor={labels} className="text-gray-400 block">
               {labels}
            </label>
            <div className="flex space-x-2">
               {value.map((value) => {
                  return (
                     <label htmlFor={value} key={value}>
                        <input
                           type="radio"
                           name={nama}
                           id={value}
                           value={value}
                        />
                        {value}
                     </label>
                  );
               })}
            </div>
         </div>
      </div>
   );
};

 const InputLabels = ({labels,children}) => {
   return (
      <div className="flex justify-center">
         <div className="mb-2">
            <label htmlFor={children} className="text-gray-400">
               {labels}
            </label>
           {children}
         </div>
      </div>
   )
}

const InputDrop = ({ id, value,labels }) => {
   return (
      <div className="flex justify-center">
         <div className="">
            <label htmlFor={id} className="text-gray-400">
               {labels}
            </label>
            <select className="block focus:outline-none" name={id} id={id}>
               {value.map((v, i) => {
                  return (
                     <option value={value} key={i}>
                        {v}
                     </option>
                  );
               })}
            </select>
         </div>
      </div>
   );
};

export { InputComp, InputRadio, InputNumb, InputDrop,InputNumb2};
