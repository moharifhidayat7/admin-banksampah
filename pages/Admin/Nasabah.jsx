import React from "react";
import Layout from "./React-components/Layout";
import Tabel from "./React-components/Tabel";

export default function Nasabah() {
  return (
    <Layout title="Nasabah">
      <div className="p-2  mb-4 shadow-lg rounded-lg text-pink-200 font-light items-center w-12 bg-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white shadow-lg rounded-md p-2">
          <div className="py-2 text-gray-500 md:text-lg text-base font-bold">
            Kelompok
          </div>
          <Tabel/>
        </div>
        <div className="bg-white shadow-xl rounded-md p-2">
          <div className="py-2 text-gray-500 md:text-lg text-base font-bold">
            Perorangan
          </div>
        </div>
      </div>
    </Layout>
  );
}
