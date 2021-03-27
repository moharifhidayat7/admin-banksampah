import * as Icons from "heroicons-react";
import BhrLayout from "../../../components/Layouts/BhrLayout";
import Tabel from "../../../components/Tabel";
import PopUpComp from "../../../components/PopUpComp";
import { useState } from "react";

function Pemasukan() {
   const [tambahData, setData] = useState(true);
   return (
      <BhrLayout>
         <div className="p-2  mb-4 shadow-lg rounded-lg text-pink-200 font-light items-center w-12 bg-white">
            <img src="/logo/cash-deposit.svg" alt="nasabah" />
         </div>
         {/* Tambah Data */}
         <button onClick={() => setData(false)}>Hai</button>
         <TambahData tambah={tambahData} />
         {/*  */}
         <Tabel
            tabhead={[
               { judul: "No", sz: "w-1/12" },
               { judul: "Rekening", sz: "w-2/6" },
               { judul: "Date", sz: "w-1/6" },
               { judul: "Saldo", sz: "" },
               { judul: "Rincian", sz: "w-1/2" },
               { judul: "Aksi", sz: "" },
            ]}
         >
            <tr>
               <td className="border-r text-center">1.</td>
               <td className="border-r">1193819</td>
               <td className="border-r">1-02-2021</td>
               <td className="border-r">Rp.12392000</td>
               <td className="border-r">Pengambilan Sampah</td>
               <td className="">
                  <div className="inline-flex space-x-2 align-middle">
                     <Icons.CreditCard className="text-green-500 cursor-pointer" />
                     <Icons.Pencil className="text-yellow-500 cursor-pointer" />
                     <Icons.Trash className="text-red-500 cursor-pointer" />
                  </div>
               </td>
            </tr>
         </Tabel>
      </BhrLayout>
   );
}

export const TambahData = ({tambah}) => {
   return (
      <PopUpComp pop={tambah}>
         Halo
         <div>Hai</div>
      </PopUpComp>
   );
};

export default Pemasukan;
