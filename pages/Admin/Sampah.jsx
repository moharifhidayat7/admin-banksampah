import React, { useState } from "react";
import Layout from "./React-components/Layout";
import Tabel from "./Tabel";

export default function Sampah() {
  const [harga, setHarga] = useState("");
  const handleSubmit = () => {
    console.log("Hello Dunia");
  };
  const numOnly = (e) => {
    let re = /^[0-9\b]+$/;
    console.log(re.test(e.target.value));
    if (e.target.value === "" || re.test(e.target.value)) {
      setHarga(e.target.value);
    }
  };
  return (
    <Layout title="Detail Sampah">
      <div className="p-2  mb-4 shadow-lg rounded-lg text-pink-200 font-light items-center w-12 bg-white">
        <img src="/logo/recycling.png" alt="sampah" />
      </div>
      <div className="grid  md:grid-cols-3 gap-2 lg:gap-8">
        <div>
          <p className="py-2 text-gray-700 text-center font-bold">
            Tambah Data Sampah
          </p>
          <div className=" flex justify-center">
            <form className="w-full">
              <label className="font-mono">Nama Sampah :</label>
              <input
                className="block bg-white focus:outline-none px-2 py-1 focus:bg-white mb-2 rounded-md w-full focus:ring-blue-300 focus:ring-2 shadow-md"
                placeholder="Input Nama"
              />
              <label className="font-mono">Harga :</label>
              <input
                onChange={numOnly}
                value={harga}
                pattern="[0-9]*"
                className="block appearance-none bg-white focus:outline-none px-2 py-1 focus:bg-white mb-2 rounded-md w-full focus:ring-blue-300 focus:ring-2 shadow-md"
                placeholder="Input Harga"
              />
              <label className="font-mono">Type:</label>
              <select className="mb-2 bg-white shadow-md px-2 focus:outline-none  w-32">
                <option>Lain-Lain</option>
                <option>Kertas</option>
                <option>Plastik</option>
                <option>Alumunium</option>
                <option>Beling / Kaca</option>
                <option>Tembaga</option>
                <option>Kuningan</option>
                <option>ACCU / Aki</option>
              </select>
              <button
                type="submit"
                onClick={handleSubmit}
                className="block bg-green-500 hover:bg-white shadow-md border-white rounded-md border-2 hover:border-green-500 hover:text-green-500 focus:outline-none px-8 py-1 text-white font-bold"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
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
      </div>
    </Layout>
  );
}
