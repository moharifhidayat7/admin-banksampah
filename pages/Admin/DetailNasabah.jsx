import React from "react";

export default function Tabel({ children }) {
  return (
    <div className='border border-gray-700 rounded-lg overflow-hidden shadow-lg'>
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
      <tbody className='bg-white'>{children}</tbody>
    </table>
    </div>
  );
}
