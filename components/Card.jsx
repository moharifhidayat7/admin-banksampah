const Card = ({ img, title, stok, deskripsi, harga,berat }) => {
   return (
      <div className="w-64 bg-white rounded-lg overflow-hidden  shadow-xl">
         <img className="h-40 w-full object-cover" src={img} alt={img} />

         <div className="px-4 py-2 ">
            <h1 className="text-gray-900 font-bold text-lg uppercase h-8">
             {title} {berat}
            </h1>
            <p className="text-gray-600 font-bold text-sm mt-1">
               Stok Tersisa : {stok}
            </p>
            <p className="text-gray-600 text-sm mt-1 h-8"> {deskripsi}</p>
         </div>

         <div className="flex items-center justify-between px-4 py-2 bg-gray-900">
            <h1 className="text-gray-200 font-bold">Rp.{harga}</h1>
            <button className="px-3 py-1 bg-gray-200 text-sm text-gray-900 font-semibold rounded">
               Tambahkan
            </button>
         </div>
      </div>
   );
};

export default Card;
