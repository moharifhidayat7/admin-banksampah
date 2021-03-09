import React from 'react'
import Tabel from "../React-components/Tabel";
function Detailtransaksi({setModal}) {
    return (
        <div className="">
        <div className="flex justify-between">
          <p className="py-2 text-gray-700 font-bold">Detail Sampah</p>
          <button
            className="bg-green-500 hover:bg-white shadow-md border-white rounded-md border-2 hover:border-green-500 hover:text-green-500 focus:outline-none px-8 text-white font-bold"
            onClick={() => setModal(false)}
          >
            Tambah Data
          </button>
        </div>
        <Tabel
          tabhead={[
            { judul: "No", sz: "1/12" },
            { judul: "Nama Sampah", sz: "" },
            { judul: "Type", sz: "1/5" },
            { judul: "Harga", sz: "1/5" },
            { judul: "Aksi", sz: "1/5" },
          ]}
        >
          <tr className="text-center border-b">
            <td>1</td>
            <td>Kardus</td>
            <td>Kertasan</td>
            <td>Rp.1600</td>
            <td>Edit||Hapus</td>
          </tr>
          <tr className="text-center">
            <td>2</td>
            <td>Kardus</td>
            <td>Kertasan</td>
            <td>Rp.1600</td>
            <td>Edit||Hapus</td>
          </tr>
        </Tabel>
      </div>
    )
}

export default Detailtransaksi
