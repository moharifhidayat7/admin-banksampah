import React from "react";

export default function Tabel() {
  return (
    <table className="border-collapse border table-fixed">
      <thead>
        <tr>
          <th className="border-2  w-1/12">No</th>
          <th className="border-2 w-1/4">Nama</th>
          <th className="border-2">Nomer Hp</th>
          <th className="border-2 w-1/2">Alamat</th>
          <th className="border-2  w-1/12">Detail</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border-2 text-center">1</td>
          <td className="border-2">Indiana</td>
          <td className="border-2">082227344311</td>
          <td className="border-2">Banyuwangi</td>
          <td className="border-2 items-center">
          
              <img  className="w-10 inline-flex  justify-center" src="/employee.svg" alt="detail" />
            
          </td>
        </tr>
      </tbody>
    </table>
  );
}
