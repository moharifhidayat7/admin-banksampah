import Head from "next/head";
export default function ClientLayout({ children }) {
   return (
      <div className="flex items-center justify-center h-screen">
         <Head>
            <title>Bank Sampah</title>
         </Head>
         <div className="w-1/2">
            <div className="bg-white rounded shadow p-5 mb-5 flex justify-between">
               <div className="flex space-x-4">
                  <p className="uppercase font-medium flex items-center">Menu</p>
                  <button className="uppercase font-medium px-2 py-2 ring-2 ring-black focus:outline-none">
                     Halaman Utama
                  </button>
                  <button className="uppercase font-medium px-2 py-2 ring-2 ring-black focus:outline-none">
                   Transaksi
                  </button>
               </div>
               <div className="uppercase font-medium flex items-center">Login</div>
            </div>
            <div className="h-80 block bg-white rounded shadow p-5">
               {children}
            </div>
         </div>
      </div>
   );
}
