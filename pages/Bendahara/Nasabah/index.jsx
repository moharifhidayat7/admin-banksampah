import { useState } from "react";
import BhrLayout from "../../../components/Layouts/BhrLayout";
import PopUpComp from "../../../components/PopUpComp";
import { InputComp, InputRadio } from "./InputComp";
import Kelompok from "./Kelompok";
import Perorangan from "./Perorangan";
function index() {
   const [popUp, setpopUp] = useState(true);
   const handleClick = () => {
      setpopUp(!popUp);
   };
   return (
      <BhrLayout>
         <div className="p-2  mb-4 shadow-lg rounded-lg text-pink-200 font-light items-center w-12 bg-white">
            <img src="/logo/create.png" alt="create" />
         </div>
         <button
            type="button"
            className="px-2 focus:outline-none shadow-md bg-green-500 rounded-md font-bold py-1 ring-2 ring-white text-white hover:ring-green-500 hover:bg-white hover:text-green-500 focus:ring-green-500 focus:bg-white focus:text-green-500 "
            onClick={handleClick}
         >
            Daftar Nasabah +
         </button>
         {/* Pop Up */}
         <PopUpComp pop={popUp}>
            <p className="text-center text-xl mb-2">
               Formulir Pendaftaran Nasabah
            </p>
            <form action="" className="">
               <InputComp tipe="text" nama="Nama Lengkap" id="namalengkap" />
               <InputComp tipe="text" nama="Alamat" id="alamat" />
               <InputComp tipe="text" nama="Nomor Seluler" id="nomerseluler" />
               <InputComp tipe="text" nama="Rekening" id="rekening" />
               <InputComp
                  tipe="date"
                  nama="Tanggal Lahir"
                  id="tanggalLahir"
                  labels="Tanggal Lahir"
               />
               <InputRadio
                  nama="jk"
                  labels="Jenis Kelamin"
                  value={["Pria", "Wanita"]}
               />
               <InputRadio
                  nama="golongan"
                  labels="Golongan"
                  value={["Perorangan", "Kelompok"]}
               />
               <InputComp
                  tipe="file"
                  nama="tambahGambar"
                  id="tambahGambar"
                  labels="Upload KTP (Opsional)"
                  acc="image/*"
               />
               <div className="flex justify-center ">
                  <div className="w-52 flex justify-between">
                     <button
                        type="reset"
                        className="bg-red-500 m-auto px-1"
                        onClick={() => setpopUp(true)}
                     >
                        Cancel
                     </button>
                     <button type="submit" className="bg-green-500 m-auto px-1">
                        Submit
                     </button>
                  </div>
               </div>
            </form>
         </PopUpComp>

         {/* end */}
         <div className="grid lg:grid-cols-2 gap-4 mb-4">
            <Perorangan />
            <Kelompok />
         </div>
      </BhrLayout>
   );
}

export default index;
