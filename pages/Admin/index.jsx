import AdminLayout from "../../components/Layouts/AdminLayout";
import Head from "next/head";
import Card from "./Card";
import { useState } from "react";
const defaultState = ["tolong", "iya", "todal",'hao','saya','kau'];
const Dashboard = () => {
  const [state, setState] = useState(defaultState);
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
          <div className='ml-2 overflow-y-scroll h-52'>
          <div className="border-l-4 py-2  px-4 pl-10 border-blue-600">
            Tolong Dijemput Ya
          </div>
          {state.map((v, k) => {
            return (
              <div
                key={k}
                className={`border-l-4 px-4 py-2 pl-10   ${k%2===0?`border-blue-600`:`border-yellow-600`}`}
              >
                {v}
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
