import NavbarBendahara from "../../../components/Navbar/NavbarBendahara";
import CardGudang from "../../../components/CardGudang";
import * as Icon from "heroicons-react";
import {useForm} from "react-hook-form"


export default function Transaksi() {
   const { register, handleSubmit, setValue, reset, errors } = useForm();
   const onSubmit = async (data) => {
      console.log(data)
      await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/transfer`, {
         method: "POST",
         headers: {
             "Content-Type": "application/json",
         },
         body: JSON.stringify(data),
     }).then(async (res) => {
         alert("Transfer Berhasil");
         reset()
     });
   }

   return (
      <div>
         <NavbarBendahara />

         <div className="lg:grid lg:grid-cols-3 ">
            <div className="bg-white lg:pb-32 shadow-lg col-span-1 p-4 m-4 rounded-sm flex flex-col">
               <div className="flex justify-between">
                  <h3 className="flex flex-wrap text-gray-800 mb-4">
                     Transaksi Internal
                  </h3>
               </div>
               <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 ">
                  <div className="flex justify-between items-center">
                     <label htmlFor="">
                        Penerima <span className="text-red-500">*</span>
                     </label>
                     <select
                        name="to"
                        className="p-1 focus:outline-none w-1/2 border"
                        ref={register({required: true})}
                     >
                        <option value="Gudang">Admin Gudang</option>
                        <option value="Rumah Kreatif">Rumah Kretif</option>
                        <option value="Kompos">Kompos</option>
                     </select>
                  </div>
                  <div className="flex justify-between items-center">
                     <label htmlFor="">
                        Nominal <span className="text-red-500">*</span>
                     </label>
                     <input
                        type="number"
                        name="amount"
                        className="focus:outline-none w-1/2 p-1 border"
                        ref={register({required: true})}
                     />
                  </div>
                  <div className="flex justify-between items-center">
                     <label htmlFor="">Keterangan</label>
                     <textarea
                        name="note"
                        placeholder="Jika ada"
                        className="border w-1/2 focus:outline-none p-1"
                        ref={register()}
                     ></textarea>
                  </div>
                  <div className="flex justify-end ">
                     <button className="py-1 px-10 w-1/2  bg-blue-800 text-white ring ring-transparent hover:ring-blue-800 focus:outline-none hover:bg-white hover:text-blue-800">
                        Submit
                     </button>
                  </div>
               </form>
            </div>
            <div className="bg-white  shadow-lg  col-span-2 p-4 m-4  rounded-sm flex flex-col">
               <div className="flex justify-between">
                  <h3 className="flex flex-wrap text-gray-800 mb-4">
                     Transaksi Tarik & Tabung
                  </h3>
                  <a
                     href="http://localhost:3000/Client/Bendahara/Transaksi"
                     className="text-red-500 hidden lg:flex"
                  >
                     <Icon.Refresh />
                  </a>
               </div>
               <div className="lg:grid lg:grid-cols-3 lg:gap-2">
                  <CardGudang title="Informasi Nasabah">
                     <div className="p-2">
                        <div className="flex space-x-1">
                           <p className="font-bold">Rekening :</p>
                           <p> 1212388821</p>
                        </div>
                        <div className="flex space-x-1">
                           <p className="font-bold">Nama :</p>
                           <p>Mimi Peri</p>
                        </div>
                        <div className="flex space-x-1">
                           <p className="font-bold">NIK :</p>
                           <p>21727183</p>
                        </div>
                        <div className="flex space-x-1">
                           <p className="font-bold">Saldo :</p>
                           <p>Rp.124.323.333</p>
                        </div>
                        <div className="flex space-x-1">
                           <p className="font-bold">Alamat :</p>
                           <p>Banyuwangi</p>
                        </div>
                     </div>
                  </CardGudang>

                  <form
                     action=""
                     className="space-y-3 mt-4 lg:mt-0 lg:col-span-2"
                  >
                     <div className="flex justify-between items-center">
                        <label htmlFor="">
                           Cari Nasabah <span className="text-red-500">*</span>
                        </label>
                        <input
                           type="text"
                           name=""
                           id=""
                           className="focus:outline-none w-1/2 p-1 border"
                        />
                     </div>
                     <div className="flex justify-between items-center">
                        <label htmlFor="">
                           Transaksi <span className="text-red-500">*</span>
                        </label>
                        <select
                           name=""
                           id=""
                           className="p-1 focus:outline-none w-1/2 border"
                        >
                           <option value="Penarikan Tunai">
                              Penarikan Tunai
                           </option>
                           <option value="Tabung Tunai">Tabung Tunai</option>
                        </select>
                     </div>
                     <div className="flex justify-between items-center">
                        <label htmlFor="">
                           Nominal <span className="text-red-500">*</span>
                        </label>
                        <input
                           type="number"
                           name=""
                           id=""
                           className="focus:outline-none w-1/2 p-1 border"
                        />
                     </div>
                     <div className="flex justify-between items-center">
                        <label htmlFor="">Tanggal</label>
                        <input
                           type="date"
                           disabled
                           value="2021-10-15"
                           name=""
                           id=""
                           className="focus:outline-none w-1/2 p-1 bg-gray-200 border"
                        />
                     </div>
                     <div className="flex justify-between items-center">
                        <label htmlFor="">Keterangan</label>
                        <textarea
                           name=""
                           id=""
                           placeholder="Jika ada"
                           className="border w-1/2 focus:outline-none p-1"
                        ></textarea>
                     </div>
                     <div className="flex justify-end">
                        <button className="py-1 w-1/2 px-10 bg-blue-800 text-white ring ring-transparent hover:ring-blue-800 focus:outline-none hover:bg-white hover:text-blue-800">
                           Submit
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         </div>
       </div>
   );
}
