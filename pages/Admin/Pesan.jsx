import React from "react";

export default function Pesan() {
  return (
    <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mb-4 ">
      {/* Laporan Pengambilan Sampah */}
      <div className="md:col-span-2 bg-white rounded-md p-4 shadow-md">
        <h3 className="text-gray-700 font-bold">Pesan Pengambilan Sampah</h3>
        <hr />
        <div className="max-h-60 overflow-y-auto">
          <p>Halo</p>
        </div>
      </div>
      <div className="bg-white rounded-md  shadow-md p-4">
        <h3 className="text-gray-700 font-bold">Riwayat Konfirmasi</h3>
        <hr />
      </div>
    </div>
  );
}
