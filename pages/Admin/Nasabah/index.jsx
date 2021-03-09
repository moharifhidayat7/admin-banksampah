import React from "react";
import AdminLayout from "../../../components/Layouts/AdminLayout";
import Kelompok from "./Kelompok";
import Perorangan from "./Perorangan";

function index() {
  return (
    <AdminLayout>
      <div className="p-2  mb-4 shadow-lg rounded-lg text-pink-200 font-light items-center w-12 bg-white">
        <img src="/logo/team.svg" alt="nasabah" />
      </div>
      <div className="grid lg:grid-cols-2 gap-4 mb-4">
        <Perorangan />
        <Kelompok />
      </div>
    </AdminLayout>
  );
}

export default index;
