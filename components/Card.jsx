import { ItemDescription } from "semantic-ui-react";

const Card = ({ img, data, keranjang, setKeranjang, formatRp }) => {
   const addKeranjang = (item) => {
      const find = keranjang.filter((ker) => ker._id == item._id);

      if (find.length > 0) {
         const newItems = keranjang.map((ker) => {
            if (ker._id == item._id) {
               ker.qty += 1;
            }
            return ker;
         });

         setKeranjang(newItems);
      } else {
         setKeranjang([...keranjang, { ...item, qty: 1 }]);
      }
   };

   return (
      <div className="w-full bg-white overflow-hidden z-0 shadow-xl hover:shadow transform hover:scale-105">
         <img className="h-40 w-full object-cover" src={img} alt={img} />

         <div className="py-1 px-3">
            <h1 className="font-medium uppercase h-8">{data.name}</h1>
            <p className="text-gray-600 text-sm">Stok : {data.stock}</p>
            <p className="text-blue-800 text-sm mt-1 h-8">
               {formatRp(data.price)}
            </p>
         </div>

         <div className="flex items-center justify-between px-4 pb-2">
             <button  className="px-3 py-1 bg-red-500">-</button>
             <input className='lg:w-10 xl:24 text-center focus:outline-none' placeholder='0' type="number" name="" id="" />
            <button
               onClick={(e) => {
                  e.preventDefault();
                  addKeranjang(data);
               }}
               className="px-3 py-1 bg-green-500"
            >
               +
            </button>
         </div>
      </div>
   );
};

export default Card;
