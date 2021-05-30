import * as Icons from "heroicons-react";
import AdminLayout from "../../../../components/Layouts/AdminLayout";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useForm, useFieldArray } from "react-hook-form";

function Penjualan() {
    const router = useRouter();
    const { register, handleSubmit, setValue, reset, errors } = useForm();

    const onSubmit = async (data) => {
        await fetch("http://localhost:3000/api/sampahSale", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...data, transactionType: "penjualan" }),
        }).then(async (res) => {
            reset();
            router.push("/Admin/Gudang/Transaksi");
        });
    };
    return (
        <AdminLayout>
            <div className='w-full'>
                <div className='bg-white rounded shadow-lg m-auto md:w-2/5 sm:w-10/12 w-full'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='border-b px-4 py-2 flex justify-between	'>
                            <h3 className='font-semibold text-lg'>
                                Tambah Penjualan Sampah
                            </h3>
                        </div>
                        <div className='p-5'>
                            <div className='grid gap-4'>
                                <div>
                                    <label>
                                        Pembeli{" "}
                                        <span className='text-red-500'>*</span>
                                    </label>
                                    <input
                                        name='pembeli'
                                        type='number'
                                        className={`block border w-full px-4 py-1 ${
                                            errors.pembeli &&
                                            "border-red-500 border-2"
                                        }`}
                                        ref={register({ required: true })}
                                    />
                                    {errors.pembeli && (
                                        <span className='text-xs text-red-500'>
                                            * Jumlah harus di isi!
                                        </span>
                                    )}
                                </div>
                                <div>
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

                                <div>
                                    <label>
                                        Tanggal{" "}
                                        <span className='text-red-500'>*</span>
                                    </label>
                                    <input
                                        name='transactionDate'
                                        type='date'
                                        className={`block border w-full px-4 py-1 ${
                                            errors.transactionDate &&
                                            "border-red-500 border-2"
                                        }`}
                                        ref={register({ required: true })}
                                    />
                                    {errors.transactionDate && (
                                        <span className='text-xs text-red-500'>
                                            * Tanggal harus di isi!
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <label>
                                        Keterangan{" "}
                                        <span className='text-red-500'>*</span>
                                    </label>

                                    <textarea
                                        name='note'
                                        rows='2'
                                        className={`block border w-full px-4 py-1 ${
                                            errors.note &&
                                            "border-red-500 border-2"
                                        }`}
                                        ref={register({ required: true })}
                                    ></textarea>
                                    {errors.note && (
                                        <span className='text-xs text-red-500'>
                                            * Keterangan harus di isi!
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className='flex justify-end w-full border-t p-2'>
                            <div>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        router.push(
                                            "/Admin/Gudang/Transaksi",
                                            undefined,
                                            { shallow: true }
                                        );
                                    }}
                                    type='button'
                                    className='px-3 bg-red-500 hover:bg-white shadow-md border-white rounded-md border-2 hover:border-red-500 hover:text-red-500 focus:outline-none p-1 text-white'
                                >
                                    Cancel
                                </button>

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
        </AdminLayout>
    );
}

export default Penjualan;
