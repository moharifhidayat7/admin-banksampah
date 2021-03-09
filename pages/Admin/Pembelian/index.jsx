import React, { useState } from "react";
import Belisampah from "./Belisampah";
import AdminLayout from "../../../components/Layouts/AdminLayout";
import Detailtransaksi from "./Detailtransaksi";
function Index() {
  const [modal, setModal] = useState(true);
  return (
    <AdminLayout>
      <div className="p-2  mb-4 shadow-lg rounded-lg text-pink-200 font-light items-center w-12 bg-white">
        <img src="/logo/shopping-bag.png" alt="nasabah" />
      </div>
      {/* PopUp Tambah Data */}
      <Belisampah modal={modal} setModal={setModal} />
      {/* Tabel Detail */}
      <Detailtransaksi setModal={setModal} />
    </AdminLayout>
  );
}

export default Index;
