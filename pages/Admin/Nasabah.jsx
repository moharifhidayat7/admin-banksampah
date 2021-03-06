import React from "react";
import Pesan from "./Pesan";
import Layout from "./React-components/Layout";
import DetailNasabah from "./DetailNasabah";

export default function Nasabah() {
  return (
    <Layout title="Nasabah">
      <div className="p-2  mb-4 shadow-lg rounded-lg text-pink-200 font-light items-center w-12 bg-white">
        <img src="/logo/team.svg" alt="nasabah"/>
      </div>
      {/* Pesan Dan Konfirmasi */}
      <Pesan />
      {/* Detail Nasabah */}
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <p className="py-2 text-gray-700 font-bold">Kelompok</p>
          <DetailNasabah>
            <tr>
              <td className="border-r border-gray-700 text-center">1</td>
              <td className="border-r border-gray-700">Indiana</td>
              <td className="border-r border-gray-700">082227344311</td>
              <td className="border-r border-gray-700">Banyuwangi</td>
              <td className="">
                <div className="flex justify-center">
                  <img className="w-8" src="/employee.svg" alt="detail" />
                </div>
              </td>
            </tr>
          </DetailNasabah>
        </div>
        <div>
          <p className="py-2 text-gray-700 font-bold">Perorangan</p>
          <DetailNasabah>
            <tr>
              <td className="border-r border-gray-700 text-center">1.</td>
              <td className="border-r border-gray-700">Indiana</td>
              <td className="border-r border-gray-700">082227344311</td>
              <td className="border-r border-gray-700">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia, nesciunt.</td>
              <td >
                <div className="flex justify-center ">
                  <img className="w-8" src="/employee.svg" alt="detail" />
                </div>
              </td>
            </tr>
            
          </DetailNasabah>
        </div>
      </div>
    </Layout>
  );
}
