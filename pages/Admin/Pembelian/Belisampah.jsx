import React from "react";
import Tabel from "../React-components/Tabel";

function Belisampah({ modal, setModal }) {
  return (
    <div>
      <div className="fixed z-10 inset-0 overflow-y-auto " hidden={modal}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div
            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="bg-blue-50">
              <p className="py-2 text-gray-700 text-center font-bold">
                Beli Sampah
              </p>
              <div className="pb-2 flex justify-center bg-blue-50">
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
                          <td></td>
                          <td></td>
                          <td>
                            <input
                              value="Rp.2000"
                              readOnly
                              className="w-20 focus:outline-none bg-transparent "
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="w-10 bg-transparent focus:outline-none "
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
        </div>
      </div>
    </div>
  );
}

export default Belisampah;
