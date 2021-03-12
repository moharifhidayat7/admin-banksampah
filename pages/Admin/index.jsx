import AdminLayout from "../../components/Layouts/AdminLayout";
import Head from "next/head";
import Card from "./Card";
import { useState } from "react";

const Dashboard = () => {
   const [state, setState] = useState([
      {
         cek: false,
         text: "All good",
      },
      {
         cek: true,
         text: "All good ASSSS",
      },
   ]);
  
   return (
      <AdminLayout>
         <Head>
            <title>Dashboard</title>
         </Head>
         <div className="md:flex md:space-x-8 md:pl-20 lg:pl-0 space-y-20 md:space-y-0  pb-4 justify-center">
            <Card
               gambar="/logo/cash-deposit.svg"
               warna="bg-green-200"
               alt="tabungan"
               judul="Tabungan"
               total="Rp. 200000"
               lebar="w-80"
            />
            <Card
               gambar="/logo/team.svg"
               warna="bg-blue-200"
               alt="Nasabah"
               judul="Nasabah"
               total="Rp. 37189"
               lebar="w-80"
            />
            <Card
               gambar="/logo/money-transaction.svg"
               warna="bg-red-200"
               alt="Kontan"
               judul="Kontan"
               total="Rp. 7189"
               lebar="w-80"
            />
         </div>
         <div className="flex justify-center">
            <div className="md:w-6/12 w-80 bg-white shadow-lg ">
               <div className="py-2 px-4 text-gray-700 text-xl border-b">
                  Laporan Penjemputan Sampah
               </div>
               <div className="ml-2 overflow-y-scroll h-52">
                  {state.map((v, k) => {
                     return (
                        <div
                           key={k}
                           className={`border-l-4 px-4 py-2 pl-10 flex justify-between  ${
                              k % 2 === 0
                                 ? `border-blue-600`
                                 : `border-yellow-600`
                           }`}
                        >
                           {v.text}

                           {v.cek === false ? (
                              <button className="bg-red-500 focus:outline-none border-2 text-white px-2 hover:bg-green-500 rounded">
                               ✔
                              </button>
                           ) : (
                              <button disabled className="bg-green-500 border-2 text-white px-2  rounded">
                            ❌
                              </button>
                           )}
                        </div>
                     );
                  })}
               </div>
            </div>
         </div>
      </AdminLayout>
   );
};

export default Dashboard;
