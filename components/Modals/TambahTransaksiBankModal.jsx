import { useReducer, useState, useEffect } from "react";

import * as Icons from "heroicons-react";
import { useForm, useFieldArray } from "react-hook-form";
import AsyncSelect from "react-select/async";

export default function TambahNasabahModal({
    modal,
    toggleModal,
    getItems,
    setEdit,
    edit,
}) {
    const { register, handleSubmit, setValue, reset, errors } = useForm();

    const [selected, setSelected] = useState([]);

    const onSubmit = async (data) => {
        if (edit._id) {
            editTransaksi(data, edit._id);
        } else {
            addTransaksi(data);
        }
    };

    const editTransaksi = async (data, id) => {
        await fetch("http://localhost:3000/api/bankTransaction/" + id, {
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

    const addTransaksi = async (data) => {
        const body = {
            ...data,
            _nasabah: selected.value,
        };
        await fetch("http://localhost:3000/api/bankTransaction", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        }).then(async (res) => {
            reset();
            toggleModal();
            getItems();
        });
    };

    useEffect(() => {
        if (edit._id) {
            const newBirth = new Date(edit.birthdate);
            setValue("name", edit.name);
        }
    }, [edit]);

    const searchNasabah = async (keyword) => {
        const result = await fetch(
            "http://localhost:3000/api/nasabahProfile?limit=10&keyword=" +
                keyword
        ).then(async (res) => {
            return res.json();
        });
        return result.map((el) => {
            return {
                label: `${el.name} (${el.nik})`,
                value: el._id,
            };
        });
    };

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
                            {edit._id ? "Edit Transaksi" : "Tambah Transaksi"}
                        </h3>
                    </div>
                    <div className='p-5'>
                        <div>
                            <label>
                                Nasabah <span className='text-red-500'>*</span>
                            </label>
                            <div>
                                <AsyncSelect
                                    instanceId='selectNasabah'
                                    cacheOptions
                                    defaultOptions
                                    onChange={(e) => {
                                        setValue("name", e.value);
                                        setSelected(e);
                                    }}
                                    loadOptions={searchNasabah}
                                    className={`${
                                        errors.name && "border-red-500 border-2"
                                    }`}
                                />
                            </div>
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
                                    <option value='credit'>Pengeluaran</option>
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