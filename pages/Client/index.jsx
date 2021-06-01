export default function Index() {
   return (
      <div className="w-screen h-screen bg-gradient-to-tl from-blue-300 to-blue-100">
         <div className="fixed top-0  w-full h-16 flex justify-between px-28">
            {/* Logo */}
            <div className="flex items-center">
               <h3 className=" text-blue-400  text-xl font-serif uppercase">
                  Merdeka Belajar
               </h3>
            </div>

            {/* Menu */}
            <div className="flex items-center   space-x-4">
               <button className="hover:text-blue-700 focus:outline-none text-sm uppercase font-medium">
                  Beli Sampah
               </button>
               <button className="hover:text-blue-700 focus:outline-none text-sm uppercase font-medium">
                  Penjualan Sampah
               </button>
               <button className="hover:text-blue-700 focus:outline-none text-sm uppercase font-medium">
                  Pembelian Produk
               </button>
            </div>
            <div className="items-center flex">
               <button className="bg-white font-medium px-4 text-blue-300 py-1 rounded-xl ring-2 ring-blue-300  hover:bg-blue-300 hover:ring-white hover:text-white transition duration-500">
                  Login
               </button>
            </div>
         </div>
         <div className="flex pt-32 justify-center">
            <div className="text-2xl text-gray-600 w-1/2 font-bold text-center">
               Mari Menjaga Lingkungan Kita Dengan Menjual Sampah Ke Bank Sampah
               <br /> #SampahJadiRupiah
            </div>
         </div>
         <div className="mt-4 flex justify-center">
            <button className="bg-blue-800 px-4 focus:outline-none py-2 text-white font-medium rounded-xl">
               Daftarkan Diri
            </button>
         </div>
         <div className="left-0 absolute z-0 bottom-0 w-1/2">
            <img
               className="w-screen h- object-fill"
               src="/Logo/clip-shopping.png"
               alt=""
            />
         </div>
      </div>
   );
}
