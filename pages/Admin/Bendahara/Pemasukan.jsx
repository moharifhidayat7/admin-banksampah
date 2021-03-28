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

function Pemasukan() {
   const [tambahData, setTambahData] = useState(true);
   return (
      <BhrLayout>
         <h1 className="text-4xl mb-5">Pemasukan</h1>
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
               <TableCol>No</TableCol> <TableCol>Rekening</TableCol>
               <TableCol>Date</TableCol> <TableCol>Pemasukan</TableCol>
               <TableCol>Rincian</TableCol> <TableCol>Aksi</TableCol>
            </TableHead>
            <TableBody>
               <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>91392389</TableCell>
                  <TableCell>15-20-2000</TableCell>
                  <TableCell>Rp.204020</TableCell>
                  <TableCell>Penjemputan Sampah</TableCell>
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
}

const TambahData = ({ tambah, setTambahData }) => {
   const { register, handleSubmit } = useForm();
   const onSubmit = (data) => console.log(data);
   return (
      <PopUpComp pop={tambah}>
         <form onSubmit={handleSubmit(onSubmit)}>
            <input name="firstName" ref={register} />
            <select name="gender" ref={register}>
               <option value="female">female</option>
               <option value="male">male</option>
               <option value="other">other</option>
            </select>
            <input type="submit" />
         </form>
         <button
            type="reset"
            className="bg-red-500"
            onClick={() => setTambahData(true)}
         >
            Cancel
         </button>
      </PopUpComp>
   );
};

export default Pemasukan;
