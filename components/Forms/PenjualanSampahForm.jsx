import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import AsyncCreatableSelect from "react-select/async-creatable";
import {
    Table,
    TableBody,
    TableCell,
    TableCol,
    TableHead,
    TableRow,
} from "../Table";
import Link from "next/link";
import * as Icons from "heroicons-react";

export default function PenjualanSampahForm({
    sampahType,
    onSubmit,
    data,
    title,
    handleCancel,
}) {
    const { register, handleSubmit, setValue, unregister, reset, errors } =
        useForm();
    const router = useRouter();

    const [items, setItems] = useState([]);
    const [temp, setTemp] = useState([]);
    const [qty, setQty] = useState("");
    const [price, setPrice] = useState("");
    const [total, setTotal] = useState(0);
    const [validItem, setValidItem] = useState(false);

    const handleSelect = (e) => {
        const tipe = sampahType.filter(
            (jenis) => jenis._id == e.target.value
        )[0];
        setTemp({
            ...tipe,
        });
    };

    const send = (formData) => {
        if (items.length > 0) {
            onSubmit(formData, items);
            reset();
            setItems([]);
        } else {
            setValidItem(true);
        }
    };

    const handleAdd = (e) => {
        e.preventDefault();

        setValidItem(false);

        if (qty == 0) {
            return -1;
        }
        if (price == 0) {
            return -1;
        }

        if (temp.length < 1) {
            return -1;
        }

        const find = items.filter((item) => item._sampahType._id == temp._id);

        if (find.length > 0) {
            const newItems = items.map((item) => {
                if (item._sampahType._id == temp._id) {
                    item.qty = qty;
                    item.price = price;
                }
                return item;
            });

            setItems(newItems);
        } else {
            setItems([...items, { _sampahType: temp, qty: qty, price: price }]);
        }
    };

    const handleDelete = (id) => {
        const find = items.filter((item) => item._sampahType._id != id);

        setItems(find);
    };

    const formatRp = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(number);
    };

    useEffect(() => {
        if (data != "") {
            setItems(data.items);
        }
    }, []);

    useEffect(() => {
        setTotal(() => {
            return items.reduce((tot, item) => {
                return tot + parseInt(item.price);
            }, 0);
        });
    }, [items]);

    return (
        <div className='bg-white rounded shadow m-auto md:w-1/2 w-full'>
            <form onSubmit={handleSubmit(send)}>
                <div className='border-b px-4 py-2 flex justify-between	'>
                    <h3 className='font-semibold text-lg'>{title}</h3>
                </div>
                <div className='p-5'>
                    <div className='grid grid-cols-1 gap-2'>
                        <div>
                            <div>
                                <label>
                                    Pembeli{" "}
                                    <span className='text-red-500'>*</span>
                                </label>
                                <input
                                    name='customer'
                                    type='text'
                                    className={`block border w-full px-4 py-1 ${
                                        errors.customer
                                            ? "border-red-500 border-2"
                                            : ""
                                    }`}
                                    ref={register({
                                        required: "Pembeli harus di isi!",
                                    })}
                                />
                                {errors.customer && (
                                    <span className='text-xs text-red-500'>
                                        * {errors.customer.message}
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
                                        errors.transactionDate
                                            ? "border-red-500 border-2"
                                            : ""
                                    }`}
                                    ref={register({
                                        required: "Tanggal harus di isi!",
                                    })}
                                />
                                {errors.transactionDate && (
                                    <span className='text-xs text-red-500'>
                                        * {errors.transactionDate.message}
                                    </span>
                                )}
                            </div>
                        </div>
                        <label>
                            Item <span className='text-red-500'>*</span>
                        </label>
                        <div className='flex space-x-2'>
                            <div>
                                <select
                                    className='w-full border px-4 py-1'
                                    defaultValue='0'
                                    onChange={handleSelect}
                                >
                                    <option value='0' disabled>
                                        Pilih Jenis Sampah
                                    </option>
                                    {sampahType.map((list) => {
                                        return (
                                            <option
                                                key={list._id}
                                                value={list._id}
                                            >
                                                {list.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div>
                                <input
                                    type='number'
                                    className={`border px-4 py-1`}
                                    placeholder='Qty.'
                                    value={qty}
                                    onChange={(e) => setQty(e.target.value)}
                                />
                            </div>
                            <div>
                                <input
                                    type='number'
                                    placeholder='Harga Jual'
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className={`border px-4 py-1`}
                                />
                            </div>
                            <div>
                                <button
                                    className={`block bg-green-500 hover:bg-white shadow-md border-white rounded-md border-2 hover:border-green-500 hover:text-green-500 focus:outline-none p-1 text-white ${
                                        validItem
                                            ? "border-red-500 border-2"
                                            : ""
                                    }`}
                                    onClick={handleAdd}
                                >
                                    Tambah Item
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='h-52 overflow-y-auto'>
                    <Table>
                        <TableHead>
                            <TableCol>Jenis Sampah</TableCol>
                            <TableCol>Qty.</TableCol>
                            <TableCol>Harga Jual</TableCol>
                            <TableCol></TableCol>
                        </TableHead>

                        <TableBody className='h-6'>
                            {items.map((item) => {
                                return (
                                    <TableRow key={item._sampahType._id}>
                                        <TableCell>
                                            <label>
                                                {item._sampahType.name}
                                            </label>
                                        </TableCell>
                                        <TableCell>
                                            <label>{item.qty}</label>
                                        </TableCell>
                                        <TableCell>
                                            <label>
                                                {formatRp(item.price)}
                                            </label>
                                        </TableCell>
                                        <TableCell className='float-right'>
                                            <button
                                                className='bg-red-500 hover:bg-white shadow-md border-white rounded-md border-2 hover:border-red-500 hover:text-red-500 focus:outline-none p-1 text-white'
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleDelete(
                                                        item._sampahType._id
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
                            {formatRp(total)}
                        </span>
                    </div>
                    <div>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                handleCancel();
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

PenjualanSampahForm.defaultProps = {
    data: "",
};
