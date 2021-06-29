import { useReducer, useState, useEffect } from "react";

import * as Icons from "heroicons-react";
import { useForm, useFieldArray } from "react-hook-form";

export default function TambahNasabahModal({
    modal,
    toggleModal,
    getItems,
    setEdit,
    edit,
}) {
    const { register, handleSubmit, setValue, reset, errors } = useForm();

    const onSubmit = async (data) => {
        if (edit._id) {
            editNasabah(data, edit._id);
        } else {
            addNasabah(data);
        }
    };

    const editNasabah = async (data, id) => {
        await fetch("http://localhost:3000/api/nasabahProfile/" + id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then(async (res) => {
            reset();
            setEdit([]);
            toggleModal();
            getItems();
        });
    };

    const addNasabah = async (data) => {
        await fetch("http://localhost:3000/api/nasabahProfile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then(async (res) => {
            reset();
            toggleModal();
            getItems();
        });
    };

    useEffect(() => {
        if (edit._id) {
            const newBirth = new Date(edit.birthdate);

            setValue("nik", edit.nik);
            setValue("name", edit.name);
            setValue("email", edit.email);
            setValue("address", edit.address);
            setValue(
                "birthdate",
                `${newBirth.getFullYear()}-${
                    parseInt(newBirth.getMonth()) < 9
                        ? "0" + parseInt(newBirth.getMonth() + 1)
                        : newBirth.getMonth() + 1
                }-${
                    parseInt(newBirth.getDate()) < 10
                        ? "0" + newBirth.getDate()
                        : newBirth.getDate()
                }`
            );
            setValue("gender", edit.gender);
            setValue("mobile", edit.mobile);
            setValue("accountType", edit.accountType);
        }
    }, [edit]);

    return (
        <div
            className={`modal absolute z-40 h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-70 ${
                modal ? "" : "hidden"
            }`}
            onClick={() => {
                toggleModal();
                setEdit([]);
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
                        <h3 className='font-semibold text-lg'>
                            {edit._id ? "Edit Nasabah" : "Tambah Nasabah"}
                        </h3>
                    </div>
                    <div className='p-5'>
                        <div>
                            <div>
                                <label>
                                    NIK <span className='text-red-500'>*</span>
                                </label>
                                <input
                                    name='nik'
                                    type='number'
                                    className={`block border w-full px-4 py-1 ${
                                        errors.nik && "border-red-500 border-2"
                                    }`}
                                    ref={register({ required: true })}
                                />
                                {errors.nik && (
                                    <span className='text-xs text-red-500'>
                                        * NIK harus di isi!
                                    </span>
                                )}
                            </div>
                            <div>
                                <label>
                                    Nama <span className='text-red-500'>*</span>
                                </label>
                                <input
                                    name='name'
                                    type='text'
                                    className={`block border w-full px-4 py-1 ${
                                        errors.name && "border-red-500 border-2"
                                    }`}
                                    ref={register({ required: true })}
                                />
                                {errors.name && (
                                    <span className='text-xs text-red-500'>
                                        * Nama harus di isi!
                                    </span>
                                )}
                            </div>
                            <div className='mt-2 grid grid-cols-2 gap-4'>
                                <div>
                                    <label>
                                        Tanggal Lahir{" "}
                                        <span className='text-red-500'>*</span>
                                    </label>
                                    <input
                                        name='birthdate'
                                        type='date'
                                        className={`block border w-full px-4 py-1 ${
                                            errors.birthdate &&
                                            "border-red-500 border-2"
                                        }`}
                                        ref={register({ required: true })}
                                    />
                                    {errors.birthdate && (
                                        <span className='text-xs text-red-500'>
                                            * Tanggal harus di isi!
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <label>
                                        Jenis Kelamin{" "}
                                        <span className='text-red-500'>*</span>
                                    </label>
                                    <div className='py-1'>
                                        <label className='inline-flex items-center'>
                                            <input
                                                name='gender'
                                                type='radio'
                                                className='form-radio'
                                                value='Male'
                                                ref={register({
                                                    required: true,
                                                })}
                                            />
                                            <span className='ml-2'>
                                                Laki-Laki
                                            </span>
                                        </label>
                                        <label className='inline-flex items-center ml-6'>
                                            <input
                                                name='gender'
                                                type='radio'
                                                className='form-radio'
                                                value='Female'
                                                ref={register({
                                                    required: true,
                                                })}
                                            />
                                            <span className='ml-2'>
                                                Perempuan
                                            </span>
                                        </label>
                                    </div>
                                    {errors.gender && (
                                        <span className='text-xs text-red-500'>
                                            * Pilih salah satu!
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className='mt-2'>
                                <label>
                                    Keanggotaan{" "}
                                    <span className='text-red-500'>*</span>
                                </label>
                                <select
                                    name='accountType'
                                    className={`w-full border px-4 py-1 ${
                                        errors.accountType &&
                                        "border-red-500 border-2"
                                    }`}
                                    ref={register({ required: true })}
                                    defaultValue='personal'
                                >
                                    <option value='personal'>Umum</option>
                                    <option value='corporate'>Instansi</option>
                                </select>
                                {errors.accountType && (
                                    <span className='text-xs text-red-500'>
                                        * Pilih salah satu!
                                    </span>
                                )}
                            </div>
                            <div className='mt-2'>
                                <label>Email</label>
                                <input
                                    name='email'
                                    type='text'
                                    className={`block border w-full px-4 py-1 `}
                                    ref={register()}
                                />
                            </div>
                            <div className='mt-2'>
                                <label>
                                    Alamat{" "}
                                    <span className='text-red-500'>*</span>
                                </label>
                                <input
                                    name='address'
                                    type='text'
                                    className={`block border w-full px-4 py-1 ${
                                        errors.address &&
                                        "border-red-500 border-2"
                                    }`}
                                    ref={register({ required: true })}
                                />
                                {errors.address && (
                                    <span className='text-xs text-red-500'>
                                        * Alamat harus di isi!
                                    </span>
                                )}
                            </div>
                            <div className='mt-2'>
                                <label>
                                    No. HP{" "}
                                    <span className='text-red-500'>*</span>
                                </label>
                                <input
                                    name='mobile'
                                    type='number'
                                    className='block border w-full px-4 py-1'
                                    ref={register({ required: true })}
                                />
                                {errors.mobile && (
                                    <span className='text-xs text-red-500'>
                                        * No. HP harus di isi!
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className='mt-2'>
                            <label>
                                Scan KTP <span className='text-red-500'>*</span>
                            </label>
                            <input
                                name='ktp'
                                type='file'
                                className={`block border w-full px-4 py-1 ${
                                    errors.ktp && "border-red-500 border-2"
                                }`}
                                ref={register({ required: true })}
                            />
                            {errors.ktp && (
                                <span className='text-xs text-red-500'>
                                    * Upload KTP
                                </span>
                            )}
                        </div>
                    </div>
                    <div className='flex justify-end items-center w-full border-t p-5'>
                        <div>
                            <a
                                href='#'
                                className='px-3 bg-red-500 hover:bg-white shadow-md border-white rounded-md border-2 hover:border-red-500 hover:text-red-500 focus:outline-none p-1 text-white'
                                onClick={() => {
                                    toggleModal();
                                    setEdit([]);
                                }}
                            >
                                Cancel
                            </a>

                            <button
                                type='submit'
                                className='px-3 bg-blue-500 hover:bg-white shadow-md border-white rounded-md border-2 hover:border-blue-500 hover:text-blue-500 focus:outline-none p-1 text-white'
                            >
                                {edit._id ? "Update" : "Tambah"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
