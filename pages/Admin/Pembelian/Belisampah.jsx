import React from "react";
import Tabel from "../React-components/Tabel";

function Belisampah({ modal, setModal }) {
  return (
    <div
      className="absolute w-full h-full bg-opacity-50 bg-black z-10 inset-0 overflow-y-auto "
      hidden={modal}
    >
      <div className="md:w-6/12 w-11/12 mt-32 m-auto ">
        <div className="py-2  flex justify-center bg-blue-50 rounded-lg">
          <form className="w-full p-1 ">
            <div className="lg:flex justify-center lg:space-x-4">
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
            </div>

            <label className="font-mono flex ">
              Pembayaran :
              <span className="items-center flex">
                <input
                  className="mr-1"
                  type="radio"
                  name="pembayaran"
                  id="tabung"
                />
                Tabung
              </span>
              <span className="items-center flex">
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
                    { judul: "Type", sz: "w-1/5" },
                    { judul: "Nama", sz: "w-1/5" },
                    { judul: "Harga", sz: "w-1/5" },
                    { judul: "Kg", sz: "w-1/12" },
                  ]}
                >
                  <tr>
                    <td className="text-center border-r"></td>
                    <td className="text-center border-r"></td>
                    <td className="text-center border-r">
                      <input
                        value="Rp.2000"
                        readOnly
                        className="w-20 focus:outline-none bg-transparent "
                      />
                    </td>
                    <td className='flex items-center justify-center'>
                      <input
                        type="text"
                        maxLength={5}
                        className="bg-transparent w-full focus:outline-none "
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
    </div>
  );
}

export default Belisampah;
