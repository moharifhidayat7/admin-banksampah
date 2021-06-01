import ClientLayout from "../../../components/Layouts/ClientLayout";
export default function index() {
   return (
      <ClientLayout>
         <div className="grid grid-cols-3 gap-8">
            <div className="col-span-2">
               <h3 className="uppercase font-medium mb-3">Content</h3>
               <div className="grid grid-cols-2 gap-4">
                  <div className="flex justify-center">
                     <button className="px-10 py-8 bg-yellow-500 uppercase font-medium shadow-2xl rounded-lg focus:outline-none">
                        Total Pembelian
                     </button>
                  </div>
                  <div className="flex justify-center">
                     <button className="px-10 focus:outline-none py-8 bg-red-500 uppercase font-medium shadow-2xl rounded-lg">
                        Transaksi Pembelian
                     </button>
                  </div>
               </div>
            </div>
            <div className="">
               <h3 className="uppercase font-medium mb-3">Aksi</h3>
               <div className="space-y-4">
                  <button className="px-2 block w-full py-3 bg-green-500 uppercase font-medium shadow-2xl rounded-lg focus:outline-none">
                     Pembelian Sampah
                  </button>
                  <button className="px-2 focus:outline-none block w-full py-3 bg-green-500 uppercase font-medium shadow-2xl rounded-lg">
                     Penjualan Sampah
                  </button>
               </div>
            </div>
         </div>
      </ClientLayout>
   );
}
