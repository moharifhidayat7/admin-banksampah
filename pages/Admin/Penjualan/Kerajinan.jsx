import PenjualanLayout from "../../../components/Layouts/PenjualanLayout";
import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
function Kerajinan() {
    const { register, handleSubmit, setValue, reset, errors } = useForm();

    const [disabled, setDisabled] = useState(false);
    return (
        <PenjualanLayout>
            <div className='text-2xl mb-2'>
                Jual Produk Kerajinan Bank Sampah
            </div>
            <div className='grid grid-cols-2  w-1/2 gap-4'>
                <div className='col-span-2 flex space-x-4'>
                    <div>
                        <label>
                            Nama Produk
                            <span className='text-red-500'>*</span>
                        </label>
                        <input
                            type='text'
                            name='namaProduk'
                            className={`block border w-full rounded-md px-4 py-1 ${
                                errors.namaProduk && "border-red-500 border-2"
                            }`}
                            disabled={disabled ? "disabled" : ""}
                            ref={register({ required: true })}
                        />
                        {errors.namaProduk && (
                            <span className='text-xs text-red-500'>
                                * Nama produk harus di isi!
                            </span>
                        )}
                    </div>
                    <div>
                        <label>
                            Harga Produk
                            <span className='text-red-500'>*</span>
                        </label>
                        <input
                            type='text'
                            name='hargaProduk'
                            className={`block border w-full rounded-md px-4 py-1 ${
                                errors.hargaProduk && "border-red-500 border-2"
                            }`}
                            disabled={disabled ? "disabled" : ""}
                            ref={register({ required: true })}
                        />
                        {errors.hargaProduk && (
                            <span className='text-xs text-red-500'>
                                * Harga produk harus di isi!
                            </span>
                        )}
                    </div>
                </div>
                <div className='col-span-2 flex space-x-4'>
                    <div>
                        <label>
                            Stok Produk Yang di Miliki
                            <span className='text-red-500'>*</span>
                        </label>
                        <input
                            type='text'
                            name='stokProduk'
                            className={`block border w-full rounded-md px-4 py-1 ${
                                errors.stokProduk && "border-red-500 border-2"
                            }`}
                            disabled={disabled ? "disabled" : ""}
                            ref={register({ required: true })}
                        />
                        {errors.stokProduk && (
                            <span className='text-xs text-red-500'>
                                * Stok produk harus di isi!
                            </span>
                        )}
                    </div>
                    <div>
                        <label>
                            Upload Gambar
                            <span className='text-red-500 '>*</span>
                        </label>
                        <input
                            type='file'
                            name='gambarProduk'
                            className={`block border w-full bg-white rounded-md px-4 py-1 ${
                                errors.gambarProduk && "border-red-500 border-2"
                            }`}
                            disabled={disabled ? "disabled" : ""}
                            ref={register({ required: true })}
                        />
                        {errors.gambarProduk && (
                            <span className='text-xs text-red-500'>
                                * Gambar produk harus di isi!
                            </span>
                        )}
                    </div>
                </div>
                <div className='col-span-2'>
                    <label>Deskripsi</label>
                    <textarea
                        className='form-textarea block border w-full rounded-md p-2'
                        name='deskripsiProduk'
                        ref={register({ required: true })}
                        placeholder='Produk seperti apa yang anda jual?'
                    />
                </div>
                <button className='px-3 bg-blue-500 hover:bg-white shadow-md border-white rounded-md border-2 hover:border-blue-500 hover:text-blue-500 focus:outline-none p-1 text-white'>
                    Jual
                </button>
            </div>
        </PenjualanLayout>
    );
}

export default Kerajinan;
