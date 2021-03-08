import React from "react";
import Layout from "../React-components/Layout";
import DetailSampah from "./DetailSampah";
import TambahDataSampah from "./TambahDataSampah";

function index() {
  return (
    <Layout title="Sampah">
      <div className="p-2  mb-4 shadow-lg rounded-lg text-pink-200 font-light items-center w-12 bg-white">
        <img src="/logo/recycling.png" alt="sampah" />
      </div>
      <div className="grid  md:grid-cols-3 gap-2 lg:gap-8">
        <DetailSampah />
        <TambahDataSampah />
      </div>
    </Layout>
  );
}

export default index;
