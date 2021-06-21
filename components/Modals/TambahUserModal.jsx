import { useReducer, useState, useEffect, useRef } from "react";

import * as Icons from "heroicons-react";
import { useForm, useFieldArray } from "react-hook-form";

export default function TambahUserModal({
    modal,
    toggleModal,
    getItems,
    setEdit,
    edit,
}) {
    const { register, handleSubmit, setValue, getValue, watch, reset, errors } =
        useForm();

    const password = useRef({});
    password.current = watch("password", "");

    const onSubmit = async (data) => {
        console.log(data);
        if (edit._id) {
            editUser(data, edit._id);
        } else {
            addUser(data);
        }
    };

    const editUser = async (data, id) => {
        await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/user/${id}`, {
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

    const addUser = async (data) => {
        await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/user`, {
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
            setValue("name", edit.name);
            setValue("username", edit.username);
            setValue("role", edit.role);
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
                className='bg-white rounded shadow-lg md:w-1/4 w-full'
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='border-b px-4 py-2 flex justify-between	'>
                        <h3 className='font-semibold text-lg'>
                            {edit._id ? "Edit User" : "Tambah User"}
                        </h3>
                    </div>
                    <div className='p-5'>
                        <div>
                            <label>
                                Role <span className='text-red-500'>*</span>
                            </label>
                            <select
                                name='role'
                                className={`w-full border px-4 py-1 ${
                                    errors.role && "border-red-500 border-2"
                                }`}
                                ref={register({ required: true })}
                                defaultValue='personal'
                            >
                                <option value='gudang'>Admin</option>
                                <option value='bendahara'>Bendahara</option>
                                <option value='penjualan'>Bendahara</option>
                            </select>
                            {errors.role && (
                                <span className='text-xs text-red-500'>
                                    * Pilih salah satu!
                                </span>
                            )}
                        </div>
                        <div className='mt-2'>
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
                        <div className='mt-2'>
                            <label>
                                Username <span className='text-red-500'>*</span>
                            </label>
                            <input
                                name='username'
                                type='text'
                                className={`block border w-full px-4 py-1 ${
                                    errors.name && "border-red-500 border-2"
                                }`}
                                ref={register({ required: true })}
                            />
                            {errors.username && (
                                <span className='text-xs text-red-500'>
                                    * Username harus di isi!
                                </span>
                            )}
                        </div>
                        <div className='mt-2'>
                            <label>
                                Password{" "}
                                {edit._id ? (
                                    ""
                                ) : (
                                    <span className='text-red-500'>*</span>
                                )}
                            </label>
                            {edit._id ? (
                                <input
                                    name='password'
                                    type='password'
                                    className={`block border w-full px-4 py-1`}
                                    ref={register()}
                                />
                            ) : (
                                <input
                                    name='password'
                                    type='password'
                                    className={`block border w-full px-4 py-1 ${
                                        errors.password &&
                                        "border-red-500 border-2"
                                    }`}
                                    ref={register({ required: true })}
                                />
                            )}

                            {errors.password && (
                                <span className='text-xs text-red-500'>
                                    * Password harus di isi!
                                </span>
                            )}
                        </div>
                        <div className='mt-2'>
                            <label>
                                Konfirmasi Password{" "}
                                {edit._id ? (
                                    ""
                                ) : (
                                    <span className='text-red-500'>*</span>
                                )}
                            </label>
                            {edit._id ? (
                                <input
                                    name='password2'
                                    type='password2'
                                    className={`block border w-full px-4 py-1`}
                                    ref={register()}
                                />
                            ) : (
                                <input
                                    name='password2'
                                    type='password2'
                                    className={`block border w-full px-4 py-1 ${
                                        errors.password2 &&
                                        "border-red-500 border-2"
                                    }`}
                                    ref={register({
                                        validate: (value) =>
                                            value === password.current ||
                                            "Password tidak sesuai",
                                    })}
                                />
                            )}
                            {errors.password2 && (
                                <span className='text-xs text-red-500'>
                                    * {errors.password2.message}
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
