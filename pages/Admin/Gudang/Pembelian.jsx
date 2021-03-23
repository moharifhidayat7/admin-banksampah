import React, { useState } from "react";
import AdminLayout from "../../../components/Layouts/AdminLayout";
import PopUpComp from "../../../components/PopUpComp";
import * as Icons from "heroicons-react";
import { Button } from "../../../components/Buttons";
import {
   InputComp,
   InputDrop,
   InputNumb2,
   InputRadio,
} from "../../../components/InputComp";
import Tabel from "../../../components/Tabel";
function Pembelian() {
   const [popUp, setpopUp] = useState(true);
   return (
      <AdminLayout>
         <div className="p-2  mb-4 shadow-lg rounded-lg text-pink-200 font-light items-center w-12 bg-white">
            <img src="/logo/shopping-bag.png" alt="nasabah" />
         </div>
         {/* Tabel Detail */}
         <Detailtransaksi setModal={setpopUp} />
         {/* PopUp Tambah Data */}
         <PopUpComp pop={popUp}>
            <p className="text-center text-xl mb-2">Formulir Pembelian</p>
            <form action="" className="">
               <div className="xl:flex  justify-between">
                  <InputComp tipe="text" nama="Nama Lengkap" id="namalengkap" />
                  <InputComp tipe="text" nama="Rekening" id="rekening" />
               </div>
               <div className="xl:flex justify-between">
                  <InputComp
                     tipe="date"
                     nama="date"
                     id="date"
                     labels="Tanggal Pembelian"
                  />
                  <InputComp
                     tipe="text"
                     nama="alamat"
                     id="alamat"
                     labels="Alamat"
                  />
               </div>
               <div
                  className="xl:flex
"
               >
                  <InputRadio
                     nama="pembayaran"
                     labels="Pembayaran"
                     value={["Tabung", "Cast"]}
                  />
               </div>
               <Tabel
                  tabhead={[
                     { judul: "No", sz: "w-1/12" },
                     { judul: "Type", sz: "" },
                     { judul: "Nama", sz: "" },
                     { judul: "Harga/Kg", sz: "" },
                     { judul: "QTY", sz: "w-1/12" },
                  ]}
               >
                  <tr>
                     <td className="text-center border-r">1</td>
                     <td className="text-center border-r">
                        <InputDrop
                           value={["Lain-Lain", "Kertasan"]}
                           id="tipesampah"
                        />
                     </td>
                     <td className="text-center border-r">
                        <InputDrop
                           value={["Lain-Lain", "Kardus"]}
                           id="namasampah"
                        />
                     </td>
                     <td className="text-center border-r">
                        <input
                           className="focus:outline-none"
                           value="Rp.2000"
                           readOnly
                        />
                     </td>
                     <td className="text-center border-r">
                        <InputNumb2 id="qty" nama="0" />
                     </td>
                  </tr>
               </Tabel>

               <div className="flex  justify-center space-x-6 mb-4">
                  <Icons.MinusCircle className="text-red-500 cursor-pointer" />
                  <Icons.PlusCircle className="text-green-500 cursor-pointer" />
               </div>

               <div className="flex justify-center mt-2">
                  <div className="w-52 flex justify-between">
                     <Button
                        color="red"
                        type="reset"
                        handleClick={() => setpopUp(true)}
                     >
                        Cancel
                     </Button>
                     <Button color="green" type="submit">
                        Submit
                     </Button>
                  </div>
               </div>
            </form>
         </PopUpComp>
         {/* end */}
      </AdminLayout>
   );
}

export default Pembelian;

const Detailtransaksi = ({ setModal }) => {
   return (
      <>
         <div className="flex justify-between mb-2">
            <Button
               color="green"
               type="button"
               handleClick={() => setModal(false)}
            >
               Tambah Data
            </Button>
         </div>

         <Tabel
            tabhead={[
               { judul: "No", sz: "w-1/12" },
               { judul: "Nama Nasabah", sz: "w-1/6" },
               { judul: "Rekening", sz: "w-1/6" },
               { judul: "Pembayaran", sz: "1/9" },
               { judul: "Date", sz: "w-1/6" },
               { judul: "Total", sz: "w-1/6" },
               { judul: "Export", sz: "" },
               { judul: "Aksi", sz: "" },
            ]}
         >
            <tr className="">
               <td className="border-r-2 text-center">1</td>
               <td className="border-r-2">Badrol</td>
               <td className="border-r-2">21921727</td>
               <td className="border-r-2">Cast</td>
               <td className="border-r-2">12-12-2012</td>
               <td className="border-r-2">Rp.160029</td>
               <td className="border-r-2">
                  <button className="inline-flex align-middle focus:outline-none focus:text-gray-500">
                     <Icons.DocumentDownload className="w-5 cursor-pointer" />
                     .xlsx
                  </button>
               </td>
               <td>
                  <div className="inline-flex space-x-2 align-middle">
                     <Icons.Pencil className="text-yellow-500 w-5 cursor-pointer" />
                     <Icons.Trash className="text-red-500 w-5 cursor-pointer" />
                  </div>
               </td>
            </tr>
         </Tabel>
      </>
   );
};
