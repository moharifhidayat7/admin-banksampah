import React from "react";
import AdminLayout from "../../../components/Layouts/AdminLayout";
import Tabel from "../../../components/Tabel";
import * as Icons from "heroicons-react";

function index() {
   return (
      <AdminLayout>
         <div className="p-2  mb-4 shadow-lg rounded-lg text-pink-200 font-light items-center w-12 bg-white">
            <img src="/logo/team.svg" alt="nasabah" />
         </div>
         <div className="mt-4">
            <div className="flex mb-2 justify-between">
               <div className="inline-flex bg-white overflow-hidden shadow-md focus-within:text-gray-800 text-gray-300 focus-within:ring-black rounded-md ring-2 ring-transparent">
                  <input
                     className="w-72 p-1 px-2 focus:outline-none"
                     placeholder="Cari ?"
                     type="search"
                     name="carinasabah"
                     id="carinasabah"
                  />
                  <button
                     id="carinasabah"
                     className="items-center focus:outline-none flex p-1 "
                  >
                     <Icons.Search className="w-6" />
                  </button>
               </div>
               <div className="bg-white inline-flex overflow-hidden shadow-md focus-within:text-gray-800 text-gray-500 focus-within:ring-black rounded-md ring-2 ring-transparent">
                  <button className="focus:outline-none flex items-center p-2">
                     <Icons.Filter className="w-6" />
                  </button>
                  <select
                     className="focus:outline-none  w-52"
                     name="filter"
                     id="filter"
                  >
                     <option value="Default">Default</option>
                     <option value="Kelompok">Kelompok</option>
                     <option value="Perorangan">Perorangan</option>
                  </select>
               </div>
            </div>
            <Tabel
               tabhead={[
                  { judul: "No", sz: "w-1/12" },
                  { judul: "No Rekening", sz: "w-1/6" },
                  { judul: "Nama", sz: "w-1/6" },
                  { judul: "Gender", sz: "" },
                  { judul: "No Hp", sz: "" },
                  { judul: "Golongan", sz: "" },
                  { judul: "Alamat", sz: "w-1/3" },
               ]}
            >
               <tr>
                  <td className="border-r border-gray-700 text-center">1.</td>
                  <td className="border-r border-gray-700">128313912398</td>
                  <td className="border-r border-gray-700">Juminten</td>
                  <td className="border-r border-gray-700">Pria</td>
                  <td className="border-r border-gray-700">018239718237</td>
                  <td className="border-r border-gray-700">Kelompok</td>
                  <td className="border-r border-gray-700">Banyuwangi</td>
               </tr>
            </Tabel>
         </div>
      </AdminLayout>
   );
}

export default index;
