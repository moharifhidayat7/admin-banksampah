import NavbarBendahara from "../../../components/Navbar/NavbarBendahara";
import CardGudang from "../../../components/CardGudang";
import * as Icon from "heroicons-react";
import { useForm } from "react-hook-form";
import AsyncSelect from "react-select/async";
import { useState, useEffect } from "react";

export default function Transaksi() {
    const { register, handleSubmit, setValue, reset, errors } = useForm();

    const [nasabah, setNasabah] = useState([]);
    const [saldo, setSaldo] = useState(0);

    const onSubmit = async (data) => {
        await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/transfer`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then(async (res) => {
            alert("Transfer Berhasil");
            reset();
        });
    };
    const onSubmit2 = async (data) => {
        console.log(data);
        await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/bankTransaction`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then(async (res) => {
            alert("Transaksi Berhasil");
            reset();
        });
    };

    const searchNasabah = async (keyword) => {
        const result = await fetch(
            `${process.env.NEXT_PUBLIC_API_HOST}/api/nasabahProfile?keyword=${keyword}`
        ).then(async (res) => {
            return res.json();
        });
        return result.map((el) => {
            return {
                ...el,
                label: `${el.name} (nik: ${el.nik}, rekening: ${el.rekening})`,
                value: el._id,
            };
        });
    };

    const getSaldo = async (id) => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_HOST}/api/bankTransaction?nasabah=${id}`
        );
        const transaction = await res.json();

        const tabung = transaction.filter(
            (trx) => trx.transactionType == "Tabung"
        );
        const penarikan = transaction.filter(
            (trx) => trx.transactionType == "Penarikan"
        );

        const tabungan = tabung.reduce((total, item) => {
            return total + item.amount;
        }, 0);
        const tarik = penarikan.reduce((total, item) => {
            return total + item.amount;
        }, 0);

        setSaldo(tabungan - tarik);
    };

    const formatRp = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(number);
    };

    return (
        <div>
            <NavbarBendahara />

            <div className='lg:grid lg:grid-cols-3 '>
                <div className='bg-white lg:pb-32 shadow-lg col-span-1 p-4 m-4 rounded-sm flex flex-col'>
                    <div className='flex justify-between'>
                        <h3 className='flex flex-wrap text-gray-800 mb-4'>
                            Transaksi Internal
                        </h3>
                    </div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className='space-y-3 '
                    >
                        <div className='flex justify-between items-center'>
                            <label htmlFor=''>
                                Penerima <span className='text-red-500'>*</span>
                            </label>
                            <select
                                name='to'
                                defaultValue='Gudang'
                                className='p-1 focus:outline-none w-1/2 border'
                                ref={register({ required: true })}
                            >
                                <option value='Gudang'>Gudang</option>
                                <option value='Rumah Kreatif'>
                                    Rumah Kretif
                                </option>
                                <option value='Kompos'>Kompos</option>
                            </select>
                        </div>
                        <div className='flex justify-between items-center'>
                            <label htmlFor=''>
                                Nominal <span className='text-red-500'>*</span>
                            </label>
                            <input
                                type='number'
                                name='amount'
                                className='focus:outline-none w-1/2 p-1 border'
                                ref={register({ required: true })}
                            />
                        </div>
                        <div className='flex justify-between items-center'>
                            <label htmlFor=''>Keterangan</label>
                            <textarea
                                name='note'
                                placeholder='Jika ada'
                                className='border w-1/2 focus:outline-none p-1'
                                ref={register()}
                            ></textarea>
                        </div>
                        <div className='flex justify-end '>
                            <button className='py-1 px-10 w-1/2  bg-blue-800 text-white ring ring-transparent hover:ring-blue-800 focus:outline-none hover:bg-white hover:text-blue-800'>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
                <div className='bg-white  shadow-lg  col-span-2 p-4 m-4  rounded-sm flex flex-col'>
                    <div className='flex justify-between'>
                        <h3 className='flex flex-wrap text-gray-800 mb-4'>
                            Transaksi Tarik & Tabung Nasabah
                        </h3>
                    </div>
                    <div className='lg:grid lg:grid-cols-3 lg:gap-2'>
                        <CardGudang title='Informasi Nasabah'>
                            <div className='p-2'>
                                <div className='flex space-x-1'>
                                    <p className='font-bold'>Rekening :</p>
                                    <p>{nasabah.rekening}</p>
                                </div>
                                <div className='flex space-x-1'>
                                    <p className='font-bold'>NIK :</p>
                                    <p>{nasabah.nik}</p>
                                </div>
                                <div className='flex space-x-1'>
                                    <p className='font-bold'>Nama :</p>
                                    <p>{nasabah.name}</p>
                                </div>
                                <div className='flex space-x-1'>
                                    <p className='font-bold'>Alamat :</p>
                                    <p>{nasabah.address}</p>
                                </div>
                                <div className='flex space-x-1'>
                                    <p className='font-bold'>Saldo :</p>
                                    <p>{formatRp(saldo)}</p>
                                </div>
                            </div>
                        </CardGudang>

                        <form
                            onSubmit={handleSubmit(onSubmit2)}
                            className='space-y-3 mt-4 lg:mt-0 lg:col-span-2'
                        >
                            <div className='grid grid-cols-2'>
                                <label htmlFor=''>
                                    Cari Nasabah{" "}
                                    <span className='text-red-500'>*</span>
                                </label>
                                <AsyncSelect
                                    instanceId='selectNasabah'
                                    cacheOptions
                                    defaultOptions
                                    onChange={(e) => {
                                        setValue("_nasabah", e._id);
                                        setNasabah(e);
                                        getSaldo(e._id);
                                    }}
                                    loadOptions={searchNasabah}
                                    className='w-full'
                                />
                            </div>
                            <div className='flex justify-between items-center'>
                                <label htmlFor=''>
                                    Transaksi{" "}
                                    <span className='text-red-500'>*</span>
                                </label>
                                <select
                                    name='transactionType'
                                    ref={register({ required: true })}
                                    className='p-1 focus:outline-none w-1/2 border'
                                >
                                    <option value='Penarikan'>
                                        Penarikan Tunai
                                    </option>
                                    <option value='Tabung'>Tabung Tunai</option>
                                </select>
                            </div>
                            <div className='hidden'>
                                <input
                                    type='text'
                                    name='_nasabah'
                                    ref={register({ required: true })}
                                    className='focus:outline-none w-1/2 p-1 border'
                                />
                            </div>
                            <div className='flex justify-between items-center'>
                                <label htmlFor=''>
                                    Nominal{" "}
                                    <span className='text-red-500'>*</span>
                                </label>
                                <input
                                    type='number'
                                    name='amount'
                                    ref={register({ required: true })}
                                    className='focus:outline-none w-1/2 p-1 border'
                                />
                            </div>
                            <div className='flex justify-between items-center'>
                                <label htmlFor=''>Keterangan</label>
                                <textarea
                                    name='note'
                                    ref={register()}
                                    placeholder='Jika ada'
                                    className='border w-1/2 focus:outline-none p-1'
                                ></textarea>
                            </div>
                            <div className='flex justify-end'>
                                <button
                                    type='submit'
                                    className='py-1 w-1/2 px-10 bg-blue-800 text-white ring ring-transparent hover:ring-blue-800 focus:outline-none hover:bg-white hover:text-blue-800'
                                >
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
