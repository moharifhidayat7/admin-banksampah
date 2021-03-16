import React from 'react'
import Tabel from "../../../components/Tabel";
function Perorangan() {
    return (
        <div>
        <p className="py-2 text-gray-700 font-bold">Perorangan</p>
        <Tabel
          tabhead={[
            { judul: "No", sz: "w-1/12" },
            { judul: "Nama", sz: "" },
            { judul: "No Hp", sz: "" },
            { judul: "Alamat", sz: "w-1/2" },
            { judul: "Ktp", sz: "" },
          ]}
        >
          <tr>
            <td className="border-r border-gray-700 text-center">1.</td>
            <td className="border-r border-gray-700">Indiana</td>
            <td className="border-r border-gray-700">082227344311</td>
            <td className="border-r border-gray-700">
              Lorem ipsum dolor sit amet
            </td>
            <td>
              <div className="flex justify-center ">
                <img className="w-8" src="/logo/employee.svg" alt="detail" />
              </div>
            </td>
          </tr>
        </Tabel>
      </div>
    )
}

export default Perorangan
