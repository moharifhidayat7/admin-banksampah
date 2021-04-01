import * as Icons from "heroicons-react";
import BhrLayout from "../../../components/Layouts/BhrLayout";
import PopUpComp from "../../../components/PopUpComp";
import { useState } from "react";
import {
   Table,
   TableHead,
   TableBody,
   TableRow,
   TableCell,
   TableCol,
} from "../../../components/Table";
import { useForm } from "react-hook-form";

const Pengeluaran = () => {
   const [tambahData, setTambahData] = useState(true);
   return (
      <BhrLayout>
      <h1 className="text-4xl mb-5">Pengeluaran</h1>
      {/* Tambah Data */}
      <button
         className="px-2 focus:outline-none shadow-md  rounded-md font-bold py-1 ring-2 ring-white text-white bg-green-500 focus:ring-green-500 focus:bg-white focus:text-green-500 mb-2"
         onClick={() => setTambahData(false)}
      >
         Tambah Data
      </button>
      <TambahData tambah={tambahData} setTambahData={setTambahData} />
      {/*  */}
      {/* Table Detail */}
      <Table>
            <TableHead>
               <TableCol>No.</TableCol>
               <TableCol>Rekening</TableCol>
               <TableCol>Tanggal</TableCol>
               <TableCol>Pengeluaran</TableCol>
               <TableCol>Rincian</TableCol>
               <TableCol>Aksi</TableCol>
            </TableHead>

            <TableBody>
               <TableRow>
                  <TableCell>1.</TableCell>
                  <TableCell>123913892</TableCell>
                  <TableCell>12-12-1203</TableCell>
                  <TableCell>Rp.1293819</TableCell>
                  <TableCell>Pengambilan</TableCell>
                  <TableCell>
                
                     <div className="inline-flex space-x-2 align-middle">
                        <Icons.CreditCard className="text-green-500 cursor-pointer" />
                        <Icons.Pencil className="text-yellow-500 cursor-pointer" />
                        <Icons.Trash className="text-red-500 cursor-pointer" />
                     </div>
                  </TableCell>
               </TableRow>
            </TableBody>
         </Table>
      {/*  */}
   </BhrLayout>
   );
};

export default Pengeluaran;

const TambahData = ({ tambah, setTambahData }) => {
   const { register, errors, handleSubmit } = useForm();

   const onSubmit = (data) => console.log(data);

   return (
      <PopUpComp pop={tambah}>
         <p className="text-center text-lg mb-2 font-bold">Pengeluaran</p>
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
                        ref={register({ required: true })}
                     />
                     {errors.tanggal && (
                        <p className="text-red-500 font-light text-sm">
                           Your input is required !
                        </p>
                     )}
                  </div>
               </div>
               <div className="md:flex md:space-x-2">
                  <div className="mb-2 flex flex-col md:w-1/2">
                     <label htmlFor="rincian" className="uppercase">
                        Rincian
                     </label>
                     <input
                        name="rincian"
                        id="rincian"
                        placeholder="Input Rincian"
                        type="text"
                        className={`form-input rounded-lg ${
                           errors.rincian && `border-red-500`
                        }`}
                        ref={register({ required: true, minLength: 5 })}
                     />
                     {errors.rincian && (
                        <p className="text-red-500 font-light text-sm">
                           Your input is required !
                        </p>
                     )}
                  </div>
                  <div className="mb-2 flex flex-col md:w-1/2">
                     <label htmlFor="pengeluaran" className="uppercase">
                       pengeluaran
                     </label>
                     <input
                        name="pengeluaran"
                        id="pengeluaran"
                        type="number"
                        className={`form-input rounded-lg ${
                           errors.pengeluaran && `border-red-500`
                        }`}
                        placeholder="Rp.999"
                        min="0"
                        ref={register({ required: true })}
                     />
                     {errors.pengeluaran && (
                        <p className="text-red-500 font-light text-sm">
                           Your input is required !
                        </p>
                     )}
                  </div>
               </div>
            </div>
            <div className="flex justify-center mt-2">
               <div className="w-52 flex justify-between">
                  <button
                     className="bg-red-500 px-2 rounded-lg"
                     type="reset"
                     onClick={() => setTambahData(true)}
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
   );
};