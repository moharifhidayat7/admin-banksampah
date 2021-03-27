import { useState } from "react";
import * as Icons from "heroicons-react";
import BhrLayout from "../../../components/Layouts/BhrLayout";
import PopUpComp from "../../../components/PopUpComp";
import { InputComp, InputNumb, InputRadio } from "../../../components/InputComp";
import Tabel from "../../../components/Tabel";
function Nasabah() {
   const [popUp, setpopUp] = useState(true);
   const handleClick = () => {
      setpopUp(!popUp);
   };
   const [dftrNasabah, setNasabah] = useState([
      {
         rekening: "11118101",
         nama: "ANDI",
         nohp: "08217317",
         jk: "Pria",
         alamat: "Kemiren Banyuwangi",
         golongan: "Kelompok",
      },
      {
         rekening: "37187113",
         nama: "Yuyun Suminten",
         nohp: "085234104446",
         jk: "Wanita",
         alamat: "Glagah Banyuwangi",
         golongan: "Perorangan",
      },
   ]);
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
               <InputNumb nama="Nomor Seluler" id="nomerseluler" />
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
         <div className="mt-4">
            {/* Filter & Search */}
            <div className="flex mb-2 justify-between">
               <div className="inline-flex bg-white overflow-hidden shadow-md focus-within:text-gray-800 text-gray-300 focus-within:ring-black rounded-md ring-2 ring-transparent">
                  <input
                     className="md:w-72 w-20  md:p-1 px-2 focus:outline-none"
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
               <div className="md:space-x-2 flex">
                  <div className="bg-white inline-flex overflow-hidden shadow-md focus-within:text-gray-800 text-gray-500 focus-within:ring-black rounded-md ring-2 ring-transparent">
                     <button className="focus:outline-none flex items-center p-2">
                        <Icons.Filter className="w-6" />
                     </button>
                     <select
                        className="focus:outline-none w-20 md:w-52"
                        name="filter"
                        id="filter"
                     >
                        <option value="Default">Default</option>
                        <option value="Kelompok">Kelompok</option>
                        <option value="Perorangan">Perorangan</option>
                     </select>
                  </div>

                  <button className="flex items-center shadow-md rounded-md overflow-hidden">
                     <Icons.DocumentText className="bg-yellow-300 h-full w-full" />
                     <p className="bg-white font-bold w-full h-full pr-2 items-center flex">
                        Export
                     </p>
                  </button>
               </div>
            </div>
            {/* Table */}
            <Tabel
               tabhead={[
                  { judul: "No", sz: "w-1/12" },
                  { judul: "Rekening", sz: "w-1/6" },
                  { judul: "Nama", sz: "w-1/6" },
                  { judul: "Gender", sz: "" },
                  { judul: "No Hp", sz: "" },
                  { judul: "Alamat", sz: "w-1/2" },
                  { judul: "Golongan", sz: "" },
                  { judul: "Aksi", sz: "" },
               ]}
            >
               {dftrNasabah.map((value, i) => {
                  return (
                     <tr key={i}>
                        <td className="border-r border-gray-700 text-center">
                           {i + 1}
                        </td>
                        <td className="border-r border-gray-700">
                           {value.rekening}
                        </td>
                        <td className="border-r border-gray-700">
                           {value.nama}
                        </td>
                        <td className="border-r border-gray-700">{value.jk}</td>
                        <td className="border-r border-gray-700">
                           {value.nohp}
                        </td>
                        <td className="border-r border-gray-700">
                           {value.alamat}
                        </td>
                        <td className="border-r border-gray-700">
                           {value.golongan}
                        </td>
                        <td className="">
                           <div className="inline-flex space-x-2 align-middle">
                              <Icons.CreditCard className="text-green-500 cursor-pointer" />
                              <Icons.Pencil className="text-yellow-500 cursor-pointer" />
                              <Icons.Trash className="text-red-500 cursor-pointer" />
                           </div>
                        </td>
                     </tr>
                  );
               })}
            </Tabel>
         </div>
      </BhrLayout>
   );
}

export default Nasabah;
