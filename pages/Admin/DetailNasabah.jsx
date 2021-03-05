import React from "react";

export default function Tabel({ children }) {
  return (
    <div className='border rounded-lg overflow-hidden'>
    <table className="table-fixed ">
      <thead>
        <tr>
          <th className="border-r border-b w-1/12">No</th>
          <th className="border-r border-b w-1/4">Nama</th>
          <th className="border-r border-b">Nomer Hp</th>
          <th className="border-r border-b w-1/2">Alamat</th>
          <th className="w-1/12 border-b">Detail</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
    </div>
  );
}
