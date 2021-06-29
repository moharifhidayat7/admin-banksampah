import PenjualanLayout from "../../../components/Layouts/PenjualanLayout";
import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
export default function Kompos() {
  const { register, handleSubmit, setValue, reset, errors } = useForm();

  const [disabled, setDisabled] = useState(false);
  return (
    <PenjualanLayout>
      <div className="text-2xl mb-2">Jual Kompos Bank Sampah</div>
      <div className="grid grid-cols-2  w-1/2 gap-4">
            <div className="col-span-2 flex space-x-4">
               <div className="w-full">
                  <label>
                     Jenis Kompos
                     <span className="text-red-500">*</span>
                  </label>
                  <input
                     type="text"
                     name="jenisKompos"
                     className={`block border w-full rounded-md px-4 py-1 ${
                        errors.jenisKompos && "border-red-500 border-2"
                     }`}
                     disabled={disabled ? "disabled" : ""}
                     ref={register({ required: true })}
                  />
                  {errors.jenisKompos && (
                     <span className="text-xs text-red-500">
                        * Jenis kompos harus di isi!
                     </span>
                  )}
               </div>
               <div className="w-full">
                  <label>
                     Harga Kompos
                     <span className="text-red-500">*</span>
                  </label>
                  <input
                     type="text"
                     name="hargaKompos"
                     className={`block border w-full rounded-md px-4 py-1 ${
                        errors.hargaKompos && "border-red-500 border-2"
                     }`}
                     disabled={disabled ? "disabled" : ""}
                     ref={register({ required: true })}
                  />
                  {errors.hargaKompos && (
                     <span className="text-xs text-red-500">
                        * Harga kompos harus di isi!
                     </span>
                  )}
               </div>
            </div>
            <div className="col-span-2 flex space-x-4">
               <div className='w-full'>
                  <label>
                     Stok Kompos Yang di Miliki
                     <span className="text-red-500">*</span>
                  </label>
                  <input
                     type="text"
                     name="stokKompos"
                     className={`block border w-full rounded-md px-4 py-1 ${
                        errors.stokKompos && "border-red-500 border-2"
                     }`}
                     disabled={disabled ? "disabled" : ""}
                     ref={register({ required: true })}
                  />
                  {errors.stokKompos && (
                     <span className="text-xs text-red-500">
                        * Stok kompos harus di isi!
                     </span>
                  )}
               </div>
               <div>
                  <label>
                     Upload Gambar
                     <span className="text-red-500 ">*</span>
                  </label>
                  <input
                     type="file"
                     name="gambarKompos"
                     className={`block border w-full bg-white rounded-md px-4 py-1 ${
                        errors.gambarKompos && "border-red-500 border-2"
                     }`}
                     disabled={disabled ? "disabled" : ""}
                     ref={register({ required: true })}
                  />
                  {errors.gambarKompos && (
                     <span className="text-xs text-red-500">
                        * Gambar kompos harus di isi!
                     </span>
                  )}
               </div>
               <div>
                  <label>
                    Berat/Kg
                     <span className="text-red-500">*</span>
                  </label>
                  <input
                     type="text"
                     name="beratKompos"
                     className={`block border w-full rounded-md px-4 py-1 ${
                        errors.beratKompos && "border-red-500 border-2"
                     }`}
                     disabled={disabled ? "disabled" : ""}
                     ref={register({ required: true })}
                  />
                  {errors.beratKompos && (
                     <span className="text-xs text-red-500">
                        * Berat kompos harus di isi!
                     </span>
                  )}
               </div>
   
            </div>
            <div className="col-span-2">
               <label>Deskripsi</label>
               <textarea
                  className="form-textarea block border w-full rounded-md p-2"
                  name="deskripsiKompos"
                  ref={register({ required: true })}
                  placeholder="Jelaskan apa yang anda jual?"
               />
            </div>
            <button className="px-3 bg-blue-500 hover:bg-white shadow-md border-white rounded-md border-2 hover:border-blue-500 hover:text-blue-500 focus:outline-none p-1 text-white">Jual</button>
         </div>

    </PenjualanLayout>
  )
}
