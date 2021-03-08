import React from "react";
import Layout from "./React-components/Layout";
import Tabel from "./Tabel";
function Pembelian() {
  return (
    <Layout title="Pembelian">
      <div className="p-2  mb-4 shadow-lg rounded-lg text-pink-200 font-light items-center w-12 bg-white">
        <img src="/logo/shopping-bag.png" alt="nasabah" />
      </div>

      <div className="">
        <p className="py-2 text-gray-700 text-center font-bold">Beli Sampah</p>
        <div className=" flex justify-center">
          <form className="">
            <label className="font-mono">
              Nama :
              <input
                className="block bg-white focus:outline-none px-2 py-1 focus:bg-white mb-2 rounded-md w-full focus:ring-blue-300 focus:ring-2 shadow-md"
                placeholder="Input Nama"
              />
            </label>

            <label className="font-mono">
              Alamat :
              <input
                className="block bg-white focus:outline-none px-2 py-1 focus:bg-white mb-2 rounded-md w-full focus:ring-blue-300 focus:ring-2 shadow-md"
                placeholder="Input Nama"
              />
            </label>
            <label className="font-mono">
              Nomer Rekening :
              <input
                pattern="[0-9]*"
                className="block appearance-none bg-white focus:outline-none px-2 py-1 focus:bg-white mb-2 rounded-md w-full focus:ring-blue-300 focus:ring-2 shadow-md"
                placeholder="Nomer Rekening"
              />
            </label>
            <label className="font-mono">
              Pembayaran :
              <span className="block items-center flex">
                <input
                  className="mr-1"
                  type="radio"
                  name="pembayaran"
                  id="tabung"
                />
                Tabung
              </span>
              <span className="block items-center flex">
                <input
                  className="mr-1"
                  type="radio"
                  name="pembayaran"
                  id="cast"
                />
                Cash
              </span>
            </label>

            <label className="font-mono">
              Sampah :
              <div className="items-center">
                <Tabel
                  tabhead={[
                    { judul: "Type", sz: "1/5" },
                    { judul: "Nama", sz: "1/5" },
                    { judul: "Harga", sz: "1/5" },
                    { judul: "Kg", sz: "1/5" },
                  ]}
                >
                  <tr>
                    <td>
                      <select name="type-sampah" className="focus:outline-none">
                        <option value="Lain-lain">Lain-Lain</option>
                        <option value="Kertas">Kertas</option>
                        <option value="Plastik">Plastik</option>
                        <option value="Alumunium">Alumunium</option>
                        <option value="Beling/Kaca">Beling / Kaca</option>
                        <option value="Tembaga">Tembaga</option>
                        <option value="Kuningan">Kuningan</option>
                        <option value="ACCU/Aki">ACCU / Aki</option>
                      </select>
                    </td>
                    <td>
                      <select
                        name="type-sampah"
                        className="focus:outline-none w-28"
                      >
                        <option value="Lain-lain">Lain-Lain</option>
                        <option value="Kertas">Kertas</option>
                        <option value="Plastik">Plastik</option>
                        <option value="Alumunium">Alumunium</option>
                        <option value="Beling/Kaca">Beling / Kaca</option>
                        <option value="Tembaga">Tembaga</option>
                        <option value="Kuningan">Kuningan</option>
                        <option value="ACCU/Aki">ACCU / Aki</option>
                      </select>
                    </td>
                    <td>
                      <input
                        value="Rp.2000"
                        readOnly
                        className="w-20 focus:outline-none bg-transparent text-center"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="w-10 bg-transparent focus:outline-none text-center"
                        placeholder="kg"
                      />
                    </td>
                  </tr>
                </Tabel>
             <div className='flex justify-center'>
             <button className='block h-5 w-5 rounded-full bg-red-500' disabled>-</button>
              <button className='h-5 w-5 rounded-full bg-green-500' disabled>+</button>
             </div>
             
              </div>
            </label>
            <button
              type="button"
              className="block mt-2 bg-green-500 hover:bg-white shadow-md border-white rounded-md border-2 hover:border-green-500 hover:text-green-500 focus:outline-none px-8 py-1 text-white font-bold"
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
    </Layout>
  );
}

export default Pembelian;
