import React from "react";
import Tabel from "../../../components/Tabel";
function DetailSampah() {
  return (
    <div className="md:col-span-2">
      <p className="py-2 text-gray-700 font-bold">Detail Sampah</p>
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
  );
}

export default DetailSampah;
