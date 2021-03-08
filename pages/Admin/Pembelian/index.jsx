import React, { useState } from "react";
import Belisampah from "./Belisampah";
import Layout from "../React-components/Layout";
import Detailtransaksi from "./Detailtransaksi";
function Index() {
  const [modal, setModal] = useState(true);
  return (
    <Layout title="Pembelian">
      <div className="p-2  mb-4 shadow-lg rounded-lg text-pink-200 font-light items-center w-12 bg-white">
        <img src="/logo/shopping-bag.png" alt="nasabah" />
      </div>
      {/* PopUp Tambah Data */}
      <Belisampah modal={modal} setModal={setModal} />
      {/* Tabel Detail */}
      <Detailtransaksi setModal={setModal} />
    </Layout>
  );
}

export default Index;
