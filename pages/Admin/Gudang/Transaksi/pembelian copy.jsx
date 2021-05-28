import * as Icons from "heroicons-react";
import AdminLayout from "../../../../components/Layouts/AdminLayout";
import { useState, useEffect } from "react";
import AsyncCreatableSelect from "react-select/async-creatable";
import {
    Table,
    TableBody,
    TableCell,
    TableCol,
    TableHead,
    TableRow,
} from "../../../../components/Table";
import { useForm, useFieldArray } from "react-hook-form";

function Pembelian({ priceList }) {
    const { register, handleSubmit, setValue, reset, errors } = useForm();

    const [items, setItems] = useState([]);
    const [temp, setTemp] = useState([]);
    const [qty, setQty] = useState(0);
    const [total, setTotal] = useState(0);
    const [selected, setSelected] = useState([]);
    const [disabled, setDisabled] = useState(false);

    const handleSelect = (e) => {
        const selected = priceList.filter(
            (jenis) => jenis._id == e.target.value
        )[0];
        setTemp({
            ...selected,
        });
    };

    const handleAdd = (e) => {
        e.preventDefault();

        if (temp.length < 1) {
            return -1;
        }

        const find = items.filter((item) => item._id == temp._id);

        if (find.length > 0) {
            const newItems = items.map((item) => {
                if (item._id == temp._id) {
                    item.qty = qty;
                }
                return item;
            });

            setItems(newItems);
        } else {
            setItems([...items, { ...temp, qty: qty }]);
        }
    };

    const handleDelete = (id) => {
        const find = items.filter((item) => item._id != id);

        setItems(find);
    };

    useEffect(() => {
        setTotal(() => {
            return items.reduce((tot, item) => {
                return tot + item.price * item.qty;
            }, 0);
        });
    }, [items]);

    useEffect(() => setTemp([]), []);

    const onSubmit = async (data) => {
        let body;
        if (selected.__isNew__) {
            body = {
                transactionType: data.transactionType,
                transactionDate: data.transactionDate,
                guest: {
                    name: selected.label,
                    address: data.address,
                    mobile: data.mobile,
                },
                items: items,
            };
        } else {
            body = {
                transactionType: data.transactionType,
                transactionDate: data.transactionDate,
                _nasabah: selected.value,
                items: items,
            };
        }
        await fetch("http://localhost:3000/api/sampahTransaction", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        }).then(async (res) => {
            reset();
            setItems([]);
            setSelected([]);
        });
    };
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
                address: el.address,
                mobile: el.mobile,
            };
        });
    };
    const disableInput = (e) => {
        setSelected(e);
        console.log(e);

        if (selected.__isNew__) {
            console.log(true);
            setDisabled(true);
        } else {
            console.log(false);
            setValue("transactionType", "cash");
            setDisabled(false);
        }
    };
    return (
        <AdminLayout>
            <div className='w-full'>
                <div
                    className='bg-white rounded shadow-lg m-auto md:w-10/12 w-full'
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <form onSubmit={handleSubmit}>
                        <div className='border-b px-4 py-2 flex justify-between	'>
                            <h3 className='font-semibold text-lg'>
                                Tambah Transaksi Pembelian Sampah
                            </h3>
                        </div>
                        <div className='p-5'>
                            <div className='grid grid-cols-2 gap-4'>
                                <div className='col-span-2'>
                                    <label>
                                        Nama{" "}
                                        <span className='text-red-500'>*</span>
                                    </label>
                                    <AsyncCreatableSelect
                                        instanceId='selectNasabah'
                                        cacheOptions
                                        defaultOptions
                                        onChange={(e) => {
                                            setValue("name", e.label);
                                            setValue("address", e.address);
                                            setValue("mobile", e.mobile);
                                            disableInput(e);
                                        }}
                                        loadOptions={searchNasabah}
                                        className={`${
                                            errors.name &&
                                            "border-red-500 border-2"
                                        }`}
                                    />
                                </div>
                                <div>
                                    <div className='hidden'>
                                        <label>
                                            Nama{" "}
                                            <span className='text-red-500'>
                                                *
                                            </span>
                                        </label>
                                        <input
                                            name='name'
                                            type='text'
                                            className={`block border w-full px-4 py-1`}
                                            ref={register({ required: true })}
                                        />
                                    </div>
                                    <div>
                                        <label>
                                            Alamat{" "}
                                            <span className='text-red-500'>
                                                *
                                            </span>
                                        </label>

                                        <input
                                            name='address'
                                            type='text'
                                            className={`block border w-full px-4 py-1 ${
                                                errors.address &&
                                                "border-red-500 border-2"
                                            }`}
                                            disabled={
                                                disabled ? "disabled" : ""
                                            }
                                            ref={register({ required: true })}
                                        />
                                        {errors.address && (
                                            <span className='text-xs text-red-500'>
                                                * Alamat harus di isi!
                                            </span>
                                        )}
                                    </div>
                                    <div className='mt-2'>
                                        <label>No. HP</label>
                                        <input
                                            name='mobile'
                                            type='text'
                                            className='block border w-full px-4 py-1'
                                            disabled={
                                                disabled ? "disabled" : ""
                                            }
                                            ref={register()}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <label>
                                            Tanggal{" "}
                                            <span className='text-red-500'>
                                                *
                                            </span>
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
                                    <div className='mt-2'>
                                        <label>
                                            Jenis Transaksi{" "}
                                            <span className='text-red-500'>
                                                *
                                            </span>
                                        </label>
                                        <div className='py-1'>
                                            <label className='inline-flex items-center'>
                                                <input
                                                    name='transactionType'
                                                    type='radio'
                                                    className='form-radio'
                                                    value='cash'
                                                    ref={register({
                                                        required: true,
                                                    })}
                                                />
                                                <span className='ml-2'>
                                                    Tunai
                                                </span>
                                            </label>
                                            <label className='inline-flex items-center ml-6'>
                                                <input
                                                    name='transactionType'
                                                    type='radio'
                                                    className='form-radio'
                                                    value='saving'
                                                    ref={register({
                                                        required: true,
                                                    })}
                                                    disabled={
                                                        disabled
                                                            ? ""
                                                            : "disabled"
                                                    }
                                                />
                                                <span className='ml-2'>
                                                    Tabung
                                                </span>
                                            </label>
                                        </div>
                                        {errors.transactionType && (
                                            <span className='text-xs text-red-500'>
                                                * Pilih salah satu!
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <hr className='mt-2' />
                            <div className='mt-2'>
                                <div className='grid grid-cols-3 gap-4'>
                                    <select
                                        className='w-full border px-4 py-1'
                                        onChange={handleSelect}
                                        defaultValue='0'
                                    >
                                        <option value='0' disabled>
                                            Pilih Jenis Sampah
                                        </option>
                                        {priceList.map((list) => {
                                            if (list.price != 0) {
                                                return (
                                                    <option
                                                        key={list._id}
                                                        value={list._id}
                                                    >
                                                        {list._sampahType.name}
                                                    </option>
                                                );
                                            }
                                        })}
                                    </select>
                                    <input
                                        type='number'
                                        className={`block border w-full px-4 py-1`}
                                        placeholder='Qty.'
                                        value={qty}
                                        onChange={(e) =>
                                            setQty(parseInt(e.target.value))
                                        }
                                    />
                                    <button
                                        className='bg-green-500 hover:bg-white shadow-md border-white rounded-md border-2 hover:border-green-500 hover:text-green-500 focus:outline-none p-1 text-white'
                                        onClick={handleAdd}
                                    >
                                        Tambah Item
                                    </button>
                                </div>
                            </div>
                            <hr className='mt-2' />
                        </div>

                        <div className='h-72 overflow-y-auto'>
                            <Table>
                                <TableHead>
                                    <TableCol>Jenis Sampah</TableCol>
                                    <TableCol>Harga</TableCol>
                                    <TableCol>Qty.</TableCol>
                                    <TableCol>Jumlah</TableCol>
                                    <TableCol></TableCol>
                                </TableHead>

                                <TableBody className='h-6'>
                                    {items.map((item) => {
                                        return (
                                            <TableRow key={item._id}>
                                                <TableCell>
                                                    <label>
                                                        {item._sampahType.name}
                                                    </label>
                                                </TableCell>
                                                <TableCell>
                                                    <label>
                                                        {new Intl.NumberFormat(
                                                            "id-ID",
                                                            {
                                                                style: "currency",
                                                                currency: "IDR",
                                                            }
                                                        ).format(item.price)}
                                                        /
                                                        {
                                                            item._sampahType
                                                                .qtyfier
                                                        }
                                                    </label>
                                                </TableCell>
                                                <TableCell>
                                                    <label>{item.qty}</label>
                                                </TableCell>
                                                <TableCell>
                                                    <label>
                                                        {new Intl.NumberFormat(
                                                            "id-ID",
                                                            {
                                                                style: "currency",
                                                                currency: "IDR",
                                                            }
                                                        ).format(
                                                            item.price *
                                                                item.qty
                                                        )}
                                                    </label>
                                                </TableCell>
                                                <TableCell>
                                                    <button
                                                        className='bg-red-500 hover:bg-white shadow-md border-white rounded-md border-2 hover:border-red-500 hover:text-red-500 focus:outline-none p-1 text-white'
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleDelete(
                                                                item._id
                                                            );
                                                        }}
                                                    >
                                                        <Icons.X />
                                                    </button>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </div>
                        <div className='flex justify-between items-center w-full border-t p-5'>
                            <div>
                                <span className='text-sm'>Total : </span>
                                <span className='font-bold text-md'>
                                    {new Intl.NumberFormat("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                    }).format(total)}
                                </span>
                            </div>
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
        </AdminLayout>
    );
}
export async function getServerSideProps() {
    const res = await fetch("http://localhost:3000/api/priceList");
    const priceList = await res.json();
    return {
        props: {
            priceList,
        },
    };
}
export default Pembelian;
