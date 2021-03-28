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

function Pemasukan() {
   const [tambahData, setData] = useState(true);
   return (
      <BhrLayout>
         <div className="p-2  mb-4 shadow-lg rounded-lg text-pink-200 font-light items-center w-12 bg-white">
            <img src="/logo/cash-deposit.svg" alt="nasabah" />
         </div>
         {/* Tambah Data */}
         <button
            className="px-2 focus:outline-none shadow-md  rounded-md font-bold py-0.5 ring-2 ring-white text-white bg-green-500 focus:ring-green-500 focus:bg-white focus:text-green-500 mb-2"
            onClick={() => setData(false)}
         >
            Tambah Data
         </button>
         <TambahData tambah={tambahData} />
         {/*  */}

         <Table>
            <TableHead>
               <TableCol>No</TableCol> <TableCol>Rekening</TableCol>
               <TableCol>Date</TableCol> <TableCol>Saldo</TableCol>
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
      </BhrLayout>
   );
}

export const TambahData = ({ tambah }) => {
   return (
      <PopUpComp pop={tambah}>
         Halo
         <div>Hai</div>
      </PopUpComp>
   );
};

export default Pemasukan;
