import React from 'react'
import BhrLayout from '../../../components/Layouts/BhrLayout'
import Tabel from '../../../components/Tabel'

function index() {
  return (
    <BhrLayout>
       <div className="p-2  mb-4 shadow-lg rounded-lg text-pink-200 font-light items-center w-12 bg-white">
        <img src="/logo/cash-deposit.svg" alt="nasabah" />
      </div>
    <Tabel tabhead={[
          { judul: "No", sz: "1/12" },
          { judul: "Nama Sampah", sz: "" },
          { judul: "Type", sz: "1/5" },
          { judul: "Harga", sz: "1/5" },
          { judul: "Aksi", sz: "1/5" },
        ]}></Tabel>
    </BhrLayout>
  )
}

export default index
