import React from 'react'
import Tabel from "../React-components/Tabel";
function Detailtransaksi({setModal}) {
    return (
        <div className="">
        <div className="flex justify-between mb-2">
          <p className="py-2 text-gray-700 font-bold">Data Pembelian</p>
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
            { judul: "Nama Nasabah", sz: "1/5" },
            { judul: "Tgl Pengambilan", sz: "1/5" },
            { judul: "Total", sz: "1/5" },
            { judul: "Aksi", sz: "1/5" },
          ]}
        >
          <tr className="text-center border-b">
            <td>1</td>
            <td>Badrol</td>
            <td>12-12-2012</td>
            <td>Rp.160029</td>
            <td className="items-center flex justify-evenly">
            <img
              className="w-4 cursor-pointer"
              src="/logo/edit.png"
              alt="edit"
            />
            <img
              className="w-5 cursor-pointer"
              src="/logo/delete.png"
              alt="delete"
            />
          </td>
          </tr>
         
        </Tabel>
      </div>
    )
}

export default Detailtransaksi
