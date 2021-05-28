import * as Icons from "heroicons-react";
import BhrLayout from "../../../../components/Layouts/BhrLayout";
import { useState, useEffect } from "react";

import { useForm, useFieldArray } from "react-hook-form";

function Keuangan() {
    const { register, handleSubmit, setValue, reset, errors } = useForm();
    return (
        <BhrLayout>
            <div className='w-full'>
                <div
                    className='bg-white rounded shadow-lg m-auto w-full'
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <form onSubmit={handleSubmit}>
                        <div className='border-b px-4 py-2 flex justify-between	'>
                            <h1 className='text-4xl inline-block'>
                                Tambah Data Keuangan
                            </h1>
                        </div>
                        <div className='p-5'>
                            <div>
                                <label>
                                    Nasabah{" "}
                                    <span className='text-red-500'>*</span>
                                </label>
                                <div className='hidden'>
                                    <input
                                        name='name'
                                        type='text'
                                        ref={register({ required: true })}
                                    />
                                </div>
                                <div className='mt-2'>
                                    <label>
                                        Jenis Transaksi{" "}
                                        <span className='text-red-500'>*</span>
                                    </label>
                                    <select
                                        name='transactionType'
                                        className={`w-full border px-4 py-1 ${
                                            errors.transactionType &&
                                            "border-red-500 border-2"
                                        }`}
                                        ref={register({ required: true })}
                                        defaultValue='personal'
                                    >
                                        <option value='debet'>Pemasukan</option>
                                        <option value='credit'>
                                            Pengeluaran
                                        </option>
                                    </select>
                                    {errors.transactionType && (
                                        <span className='text-xs text-red-500'>
                                            * Pilih salah satu!
                                        </span>
                                    )}
                                </div>
                                <div className='mt-2'>
                                    <label>
                                        Jumlah{" "}
                                        <span className='text-red-500'>*</span>
                                    </label>
                                    <input
                                        name='amount'
                                        type='number'
                                        className={`block border w-full px-4 py-1 ${
                                            errors.amount &&
                                            "border-red-500 border-2"
                                        }`}
                                        ref={register({ required: true })}
                                    />
                                    {errors.amount && (
                                        <span className='text-xs text-red-500'>
                                            * Jumlah harus di isi!
                                        </span>
                                    )}
                                </div>
                                <div className='mt-2'>
                                    <label>Keterangan</label>
                                    <textarea
                                        name='note'
                                        rows='5'
                                        className={`block border w-full px-4 py-1`}
                                        ref={register()}
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-end items-center w-full border-t p-5'>
                            <div>
                                <a
                                    href='#'
                                    className='px-3 bg-red-500 hover:bg-white shadow-md border-white rounded-md border-2 hover:border-red-500 hover:text-red-500 focus:outline-none p-1 text-white'
                                >
                                    Cancel
                                </a>

                                <button
                                    type='submit'
                                    className='px-3 bg-blue-500 hover:bg-white shadow-md border-white rounded-md border-2 hover:border-blue-500 hover:text-blue-500 focus:outline-none p-1 text-white'
                                >
                                    Tambah
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </BhrLayout>
    );
}

export default Keuangan;
