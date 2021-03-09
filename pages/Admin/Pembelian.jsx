import React, { useState } from "react";
import Modals from "./Modals";
import Layout from "./React-components/Layout";
import Typesampah from "./React-components/Typesampah";

import Tabel from "./Tabel";
function Pembelian() {
  const [modal, setModal] = useState(true);
  return (
    <Layout title="Pembelian">
      <div className="p-2  mb-4 shadow-lg rounded-lg text-pink-200 font-light items-center w-12 bg-white">
        <img src="/logo/shopping-bag.png" alt="nasabah" />
      </div>
      <Modals modal={modal} setModal={setModal}>
        <div className="">
          <p className="py-2 text-gray-700 text-center font-bold">
            Beli Sampah
          </p>
          <div className="pb-2 flex justify-center">
            <form className="w-full p-1">
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
                        <Typesampah />
                      </td>
                      <td></td>
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
                  <div className="flex justify-center">
                    <button
                      className="block h-5 w-5 rounded-full bg-red-500"
                      disabled
                    >
                      -
                    </button>
                    <button
                      className="h-5 w-5 rounded-full bg-green-500"
                      disabled
                    >
                      +
                    </button>
                  </div>
                </div>
              </label>

              <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Submit
              </button>
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => setModal(true)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </Modals>

      <div className="">
        <div className="flex justify-between">
          <p className="py-2 text-gray-700 font-bold">Detail Sampah</p>
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
