import React, { useState } from "react";
import AdminLayout from "../../../components/Layouts/AdminLayout";
import PopUpComp from "../../../components/PopUpComp";
import * as Icons from "heroicons-react";
import {
   Table,
   TableHead,
   TableBody,
   TableRow,
   TableCell,
   TableCol,
} from "../../../components/Table";
import { useForm } from "react-hook-form";
import Tabel from "../../../components/Tabel";
function Pembelian() {
   const [popUp, setpopUp] = useState(true);
   const [exnota, setExnota] = useState(true);
   const { register, errors, handleSubmit } = useForm();
   const onSubmit = (data) => console.log(data);
   return (
      <AdminLayout>
         {/* Tabel Detail */}
         <Detailtransaksi setModal={setpopUp} setExnota={setExnota} />
         {/* ExportNota */}

         <ExportNota exnota={exnota} setExnota={setExnota} exnota={exnota} />
         {/* PopUp Tambah Data */}
         <PopUpComp pop={popUp}>
            <p className="text-center text-lg mb-2 font-bold">
               Formulir Pembelian
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
               <div className="mb-2 pr-1 lg:pr-0">
                  <div className="md:flex md:space-x-2">
                     <div className="mb-2 flex flex-col md:w-1/2">
                        <label htmlFor="rekening" className="uppercase">
                           Rekening
                        </label>
                        <input
                           name="rekening"
                           id="rekening"
                           placeholder="Input Rekening"
                           type="number"
                           className={`form-input rounded-lg ${
                              errors.rekening && `border-red-500`
                           }`}
                           min="0"
                           ref={register({ required: true, minLength: 5 })}
                        />
                        {errors.rekening && (
                           <p className="text-red-500 font-light text-sm">
                              Your input is required !
                           </p>
                        )}
                     </div>
                     <div className="mb-2 flex flex-col md:w-1/2">
                        <label htmlFor="nama" className="uppercase">
                           Nama
                        </label>
                        <input
                           name="nama"
                           id="nama"
                           placeholder="Input Nama"
                           type="text"
                           className={`form-input rounded-lg ${
                              errors.nama && `border-red-500`
                           }`}
                           ref={register({ required: true })}
                        />
                        {errors.nama && (
                           <p className="text-red-500 font-light text-sm">
                              Your input is required !
                           </p>
                        )}
                     </div>
                  </div>
                  <div className="md:flex md:space-x-2">
                     <div className="mb-2 flex flex-col md:w-1/2">
                        <label htmlFor="tanggal" className="uppercase">
                           Tanggal
                        </label>
                        <input
                           name="tanggal"
                           id="tanggal"
                           type="date"
                           className={`form-input rounded-lg ${
                              errors.tanggal && `border-red-500`
                           }`}
                           min="0"
                           ref={register({ required: true })}
                        />
                        {errors.tanggal && (
                           <p className="text-red-500 font-light text-sm">
                              Your input is required !
                           </p>
                        )}
                     </div>
                     <div className="mb-2 flex flex-col md:w-1/2">
                        <label htmlFor="alamat" className="uppercase">
                           Alamat
                        </label>
                        <input
                           name="alamat"
                           id="alamat"
                           placeholder="Input Alamat"
                           type="text"
                           className={`form-input rounded-lg ${
                              errors.alamat && `border-red-500`
                           }`}
                           ref={register({ required: true })}
                        />
                        {errors.alamat && (
                           <p className="text-red-500 font-light text-sm">
                              Your input is required !
                           </p>
                        )}
                     </div>
                  </div>
                  <div className="flex flex-col">
                     <p
                        className={`uppercase ${
                           errors.tipetransaksi && `text-red-500`
                        }`}
                     >
                        Type Transaksi
                        {errors.tipetransaksi && "*"}
                     </p>

                     <div className="flex items-center space-x-2">
                        <input
                           name="tipetransaksi"
                           value="Cash"
                           id="cash"
                           type="radio"
                           className="form-radio"
                           ref={register({ required: true })}
                        />
                        <label htmlFor="cash">Cash</label>
                     </div>
                     <div className="flex items-center space-x-2">
                        <input
                           name="tipetransaksi"
                           value="Tabungkan"
                           id="tabungkan"
                           type="radio"
                           className="form-radio"
                           ref={register({ required: true })}
                        />
                        <label htmlFor="tabungkan">Tabungkan</label>
                     </div>
                  </div>
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
                        <select
                           name="type"
                           id="type"
                           className="form-select w-full border-0 focus:ring-0"
                           ref={register({ required: true })}
                        >
                           <option value="Kertasan">Kertasan</option>
                        </select>
                     </td>
                     <td className="text-center border-r">
                        <select
                           name="barang"
                           id="barang"
                           className="form-select w-full border-0 focus:ring-0"
                           ref={register({ required: true })}
                        >
                           <option value="Kertasan">Kertasan</option>
                        </select>
                     </td>
                     <td className="text-center border-r">Rp.200000</td>
                     <td className="text-center border-r flex items-center">
                        <input
                           name="qty"
                           id="qty"
                           type="number"
                           placeholder="0"
                           className="form-input w-16 border-0 focus:ring-0"
                           ref={register({ required: true })}
                        />
                        Kg
                     </td>
                  </tr>
               </Tabel>

               <div className="flex  justify-center space-x-6 mb-4">
                  <Icons.MinusCircle className="text-red-500 cursor-pointer" />
                  <Icons.PlusCircle className="text-green-500 cursor-pointer" />
               </div>

               <div className="flex justify-center mt-2">
                  <div className="w-52 flex justify-between">
                     <button
                        className="bg-red-500 px-2 rounded-lg"
                        type="reset"
                        onClick={() => setpopUp(true)}
                     >
                        Cancel
                     </button>
                     <button
                        className="bg-green-500 px-2 rounded-lg"
                        type="submit"
                     >
                        Submit
                     </button>
                  </div>
               </div>
            </form>
         </PopUpComp>
         {/* end */}
      </AdminLayout>
   );
}

export default Pembelian;

const Detailtransaksi = ({ setModal, setExnota, exnota }) => {
   return (
      <>
         <h1 className="text-4xl mb-5">Pembelian</h1>
         <div className="mx-auto bg-white dark:bg-gray-800 dark:bg-gray-800 shadow rounded">
            <div className="flex flex-col lg:flex-row p-4 lg:p-8 justify-between items-start lg:items-stretch w-full">
               <div className="inline-flex bg-white overflow-hidden focus-within:text-gray-800 text-gray-300 focus-within:ring-black rounded-md ring-2">
                  <input
                     className="w-72 py-2 px-4 focus:outline-none bg-gray"
                     placeholder="Cari ?"
                     type="search"
                     name="carinasabah"
                     id="carinasabah"
                  />
                  <button
                     id="carinasabah"
                     className="items-center focus:outline-none flex p-1 "
                  >
                     <Icons.Search className="w-6" />
                  </button>
               </div>
               <div className="flex justify-between space-x-1">
                  <button
                     type="button"
                     className="px-4 focus:outline-none shadow-md bg-green-500 rounded-md font-bold py-2 ring-2 ring-white text-white hover:ring-green-500 hover:bg-white hover:text-green-500 focus:ring-green-500 focus:bg-white focus:text-green-500 "
                     onClick={() => setModal(false)}
                  >
                     Tambah Data
                  </button>
                  <button className="flex items-center shadow-md rounded-md overflow-hidden">
                     <Icons.DocumentText className="bg-yellow-300 h-full w-full" />
                     <p className="bg-white font-bold w-full h-full pr-2 items-center flex">
                        Export
                     </p>
                  </button>
               </div>
            </div>
            <div className="w-full overflow-x-scroll xl:overflow-x-hidden">
               <Table>
                  <TableHead>
                     <TableCol>No.</TableCol>
                     <TableCol>Tanggal</TableCol>
                     <TableCol>Tipe Transaksi</TableCol>
                     <TableCol>Nasabah</TableCol>
                     <TableCol>Rekening</TableCol>
                     <TableCol>Jumlah</TableCol>
                  </TableHead>

                  <TableBody>
                     <TableRow>
                        <TableCell>1.</TableCell>
                        <TableCell>12-12-1223</TableCell>
                        <TableCell>Cash</TableCell>
                        <TableCell>Muhaimin</TableCell>
                        <TableCell>123791</TableCell>
                        <TableCell>Rp.388833</TableCell>
                     </TableRow>
                  </TableBody>
               </Table>
            </div>
         </div>
      </>
   );
};
const ExportNota = ({ exnota, setExnota }) => {
   return (
      <PopUpComp pop={exnota}>
         <p className="text-center text-xl">Export Nota</p>
         <div className="flex justify-center">
            <table className="">
               <tbody>
                  <tr>
                     <td className="font-bold align-text-top">Nama</td>
                     <td className="align-text-top">:</td>
                     <td width={20} className="break-all align-text-top">
                        Ach Rizal
                     </td>
                     <td></td>
                     <td className="font-bold align-text-top">Rekening</td>
                     <td className="align-text-top">:</td>
                     <td className="align-text-top">1319819312</td>
                  </tr>
                  <tr>
                     <td className="font-bold align-text-top">Alamat</td>
                     <td className="align-text-top">:</td>
                     <td width={20} className="align-text-top">
                        Banyuwangi Kemiren 2999 jdqijii
                     </td>
                     <td width={12}></td>
                     <td className="font-bold align-text-top">Date</td>
                     <td className="align-text-top">:</td>
                     <td className="align-text-top">13 Feb 2021</td>
                  </tr>
                  <tr>
                     <td className="font-bold">Pembayaran</td>
                     <td>:</td>
                     <td>Cast</td>
                  </tr>
                  <tr className="font-bold">
                     <td colSpan={4}>Barang</td>
                     <td> Harga</td>
                  </tr>
                  <tr>
                     <td colSpan={4}>Minuman</td>
                     <td>Rp.20000</td>
                  </tr>
                  <tr>
                     <td colSpan={4} className="font-bold text-right">
                        Total
                     </td>
                     <td>Rp.2000</td>
                  </tr>
               </tbody>
            </table>
         </div>
         <div className="flex space-x-6">
            <button onClick={() => setExnota(true)}>Cancel</button>
            <button className="bg-yellow-500">Print</button>
         </div>
      </PopUpComp>
   );
};
