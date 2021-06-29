import { useReducer, useState, useEffect } from "react";

import * as Icons from "heroicons-react";
import { useForm, useFieldArray } from "react-hook-form";
import AsyncSelect from "react-select/async";

export default function TambahNasabahModal({
    modalData,
    modal,
    toggleModal,
    modalTitle,
    saldo,
    getTransaction,
}) {
    const { register, handleSubmit, setValue, reset, errors } = useForm();

    const onSubmit = async (data) => {
        const body = {
            ...data,
            _nasabah: modalData._id,
            transactionType: modalTitle,
        };
        await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/bankTransaction`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        }).then(async (res) => {
            reset();
            toggleModal();
            getTransaction();
        });
    };

    const formatRp = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(number);
    };

    return (
        <div
            className={`modal absolute z-40 h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-70 ${
                modal ? "" : "hidden"
            }`}
            onClick={() => {
                toggleModal();
            }}
        >
            <div
                className='bg-white rounded shadow-lg md:w-1/3 w-1/3 w-full'
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='border-b px-4 py-2 flex justify-between	'>
                        <h3 className='font-semibold text-lg'>{modalTitle}</h3>
                    </div>
                    <div className='p-5'>
                        <div>
                            <hr className='my-2' />
                            <div>
                                <p className='text-sm'>
                                    <b>NIK</b> : {modalData.nik}
                                    <br />
                                    <b>No. Rekening</b> : {modalData.rekening}
                                    <br />
                                    <b>Nama</b> : {modalData.name}
                                    <br />
                                    <b>Alamat</b> : {modalData.address}
                                    <br />
                                    <b>Saldo</b> : {formatRp(saldo)}
                                </p>
                            </div>
                            <hr className='my-2' />

                            <div className='mt-2'>
                                <label>
                                    Nominal{" "}
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
                                    rows='2'
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
                                onClick={() => {
                                    toggleModal();
                                }}
                            >
                                Cancel
                            </a>

                            <button
                                type='submit'
                                className='px-3 bg-blue-500 hover:bg-white shadow-md border-white rounded-md border-2 hover:border-blue-500 hover:text-blue-500 focus:outline-none p-1 text-white'
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
