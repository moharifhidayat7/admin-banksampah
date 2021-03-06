import React from "react";

export default function Tabel({ children }) {
  return (
    <div className='border rounded-lg overflow-hidden'>
    <table className="table-fixed ">
      <thead className='bg-gray-700 text-white'> 
        <tr>
          <th className="w-1/12">No</th>
          <th>Nama</th>
          <th >Nomer Hp</th>
          <th className=" w-1/2">Alamat</th>
          <th className="w-1/12 ">Ktp</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
    </div>
  );
}
