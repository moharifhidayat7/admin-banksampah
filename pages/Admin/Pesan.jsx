import React from "react";

export default function Pesan() {
  const fileGbr = (e) => {
    console.log(e);
  };
  const chooseFile = () => {
  
    console.log(  addEventListener.name)
  };
  return (
    <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mb-4 ">
      {/* Laporan Pengambilan Sampah */}
      <div className="md:col-span-2 bg-white rounded-md p-4 shadow-md">
        <h3 className="text-gray-700 font-bold">Pesan Pengambilan Sampah</h3>
        <hr />
        <div className="h-60 overflow-y-auto py-2">
     <div className='bg-green-50 p-1 rounded-md shadow-lg w-full'>d</div>
          
  
        </div>
      </div>
      <div className="bg-white rounded-md  shadow-md p-4">
        <h3 className="text-gray-700 font-bold">Riwayat Konfirmasi</h3>
        <hr />
      </div>
    </div>
  );
}
