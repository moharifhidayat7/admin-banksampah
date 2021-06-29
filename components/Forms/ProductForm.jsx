import { useForm, useFieldArray } from "react-hook-form";
import Link from "next/link";
import { useState, useEffect } from "react";
import * as Icons from "heroicons-react";
import { useRouter } from "next/router";
import AsyncCreatableSelect from "react-select/async-creatable";

export default function ProductForm({ onSubmit, data, title, handleChange }) {
    const { register, handleSubmit, setValue, reset, errors } = useForm();
    const router = useRouter();

    const createCategory = async (name) => {
        await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/productCategory`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: name }),
        }).then(async (res) => {
            const result = await res.json();
            setValue("_category", result._id);
        });
    };

    const searchCategory = async (keyword) => {
        const result = await fetch(
            `${process.env.NEXT_PUBLIC_API_HOST}/api/productCategory?keyword=${keyword}`
        ).then(async (res) => {
            return res.json();
        });
        return result.map((el) => {
            return {
                label: el.name,
                value: el._id,
            };
        });
    };

    return (
        <div className='bg-white rounded shadow m-auto md:w-1/2 sm:w-10/12 w-full'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='border-b px-4 py-2 flex justify-between	'>
                    <h3 className='font-semibold text-lg'>{title}</h3>
                </div>
                <div className='p-5'>
                    <div className='grid gap-4'>
                        <div>
                            <label>
                                Nama Produk{" "}
                                <span className='text-red-500'>*</span>
                            </label>
                            <input
                                name='name'
                                type='text'
                                defaultValue={data.name}
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
                        <div className='flex space-x-4'>
                            <div>
                                <label>
                                    Harga{" "}
                                    <span className='text-red-500'>*</span>
                                </label>
                                <input
                                    name='price'
                                    type='number'
                                    defaultValue={data.price}
                                    className={`block border w-full px-4 py-1 ${
                                        errors.price &&
                                        "border-red-500 border-2"
                                    }`}
                                    ref={register({ required: true })}
                                />
                                {errors.price && (
                                    <span className='text-xs text-red-500'>
                                        * Harga harus di isi!
                                    </span>
                                )}
                            </div>
                            <div>
                                <label>
                                    Stok <span className='text-red-500'>*</span>
                                </label>
                                <input
                                    name='stock'
                                    type='number'
                                    defaultValue={data.stock}
                                    className={`block border w-full px-4 py-1 ${
                                        errors.stock &&
                                        "border-red-500 border-2"
                                    }`}
                                    ref={register({ required: true })}
                                />
                                {errors.stock && (
                                    <span className='text-xs text-red-500'>
                                        * Stok harus di isi!
                                    </span>
                                )}
                            </div>
                        </div>
                        <div>
                            <label>
                                Foto Produk{" "}
                                <span className='text-red-500'>*</span>
                            </label>
                            <input
                                type='file'
                                accept='image/*'
                                className={`block border w-full px-4 py-1`}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>
                                Kategori <span className='text-red-500'>*</span>
                            </label>
                            <AsyncCreatableSelect
                                instanceId='selectCategory'
                                cacheOptions
                                defaultOptions
                                onChange={(e) => {
                                    if (e.__isNew__) {
                                        createCategory(e.value);
                                    } else {
                                        setValue("_category", e.value);
                                    }
                                }}
                                loadOptions={searchCategory}
                                className={`${
                                    errors._category &&
                                    "border-red-500 border-2"
                                }`}
                            />
                            <input
                                name='_category'
                                type='text'
                                className={`hidden block border w-full px-4 py-1`}
                                ref={register({ required: true })}
                            />
                        </div>
                        <div>
                            <label>
                                Status Produk{" "}
                                <span className='text-red-500'>*</span>
                            </label>
                            <select
                                name='status'
                                className={`block border w-full px-4 py-1 ${
                                    errors.status && "border-red-500 border-2"
                                }`}
                                ref={register({ required: "Pilih Salah Satu" })}
                            >
                                <option value='Offline'>Offline</option>
                                <option value='Online'>Online</option>
                            </select>
                            {errors.status && (
                                <span className='text-xs text-red-500'>
                                    * + {errors.status.message}
                                </span>
                            )}
                        </div>
                        <div>
                            <label>
                                Deskripsi Produk{" "}
                                <span className='text-red-500'>*</span>
                            </label>

                            <textarea
                                name='description'
                                rows='2'
                                className={`block border w-full px-4 py-1 ${
                                    errors.description &&
                                    "border-red-500 border-2"
                                }`}
                                ref={register({ required: true })}
                            >
                                {data.description}
                            </textarea>
                            {errors.description && (
                                <span className='text-xs text-red-500'>
                                    * Deskripsi harus di isi!
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
                                    "/Admin/Penjualan/Produk",
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
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

ProductForm.defaultProps = {
    data: "",
};
