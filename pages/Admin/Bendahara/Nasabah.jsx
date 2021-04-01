import { useState } from "react";
import * as Icons from "heroicons-react";
import BhrLayout from "../../../components/Layouts/BhrLayout";
import PopUpComp from "../../../components/PopUpComp";

import Tabel from "../../../components/Tabel";
import { useForm } from "react-hook-form";
function Nasabah() {
   const [popUp, setpopUp] = useState(true);
   const handleClick = () => {
      setpopUp(!popUp);
   };
   const { register, errors, handleSubmit } = useForm();

   const onSubmit = (data) => console.log(data);
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
         <h1 className="text-4xl mb-5">Nasabah</h1>
         <button
            type="button"
            className="px-2 focus:outline-none shadow-md bg-green-500 rounded-md font-bold py-1 ring-2 ring-white text-white hover:ring-green-500 hover:bg-white hover:text-green-500 focus:ring-green-500 focus:bg-white focus:text-green-500 "
            onClick={handleClick}
         >
            Daftar Nasabah +
         </button>
         {/* Pop Up */}
         <PopUpComp pop={popUp}>
            <p className="text-center text-lg mb-2 font-bold">
               Formulir Pendaftaran Nasabah
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
                           nama
                        </label>
                        <input
                           name="nama"
                           id="nama"
                           type="text"
                           placeholder="Input Nama"
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
                        <label htmlFor="alamat" className="uppercase">
                           alamat
                        </label>
                        <input
                           name="alamat"
                           id="alamat"
                           placeholder="Input Alamat"
                           type="text"
                           className={`form-input rounded-lg ${
                              errors.alamat && `border-red-500`
                           }`}
                           ref={register({ required: true, minLength: 5 })}
                        />
                        {errors.alamat && (
                           <p className="text-red-500 font-light text-sm">
                              Your input is required !
                           </p>
                        )}
                     </div>
                     <div className="mb-2 flex flex-col md:w-1/2">
                        <label htmlFor="nomorhp" className="uppercase">
                           Nomor Hp
                        </label>
                        <input
                           name="nomorhp"
                           id="nomorhp"
                           type="number"
                           className={`form-input rounded-lg ${
                              errors.nomorhp && `border-red-500`
                           }`}
                           placeholder="Nomor Hp Nasabah"
                           min="0"
                           ref={register({ required: true })}
                        />
                        {errors.nomorhp && (
                           <p className="text-red-500 font-light text-sm">
                              Your input is required !
                           </p>
                        )}
                     </div>
                  </div>
                  <div className="md:flex md:space-x-2">
                     <div className="mb-2 flex flex-col">
                        <label htmlFor="golongan" className={`uppercase`}>
                           Golongan
                        </label>
                        <select
                           name="golongan"
                           id="golongan"
                           className="form-select rounded-lg"
                           ref={register({ required: true })}
                        >
                           <option value="Kelompok">Kelompok</option>
                           <option value="Perorangan">Perorangan</option>
                        </select>
                     </div>
                     <div className="mb-2 flex flex-col">
                        <label htmlFor="gender" className="uppercase">
                           gender
                        </label>
                        <select
                           name="gender"
                           id="gender"
                           className="form-select rounded-lg"
                           ref={register({ required: true })}
                        >
                           <option value="Pria">Pria</option>
                           <option value="Wanita">Wanita</option>
                        </select>
                     </div>
                     <div className="mb-2 flex-col flex">
                        <label htmlFor="ktp" className="uppercase flex">
                           ktp <p className="lowercase text-sm">(Opsional)</p>
                        </label>
                        <input
                           type="file"
                           name="ktp"
                           id="ktp"
                           className="form-input w-full rounded-lg py-1"
                        />
                     </div>
                  </div>
               </div>
               {/* Buttons */}
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
