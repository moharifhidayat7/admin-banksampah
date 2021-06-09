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

export default function PembelianSampahForm({
    sampahType,
    onSubmit,
    data,
    title,
    cancel,
}) {
    const { register, handleSubmit, setValue, unregister, reset, errors } =
        useForm();
    const router = useRouter();
    const handleCancel = (formData) => {
        if (cancel != "") {
            cancel();
            return;
        }
        if (formData != "") {
            router.back();
        } else {
            router.push("/Admin/Gudang/PembelianSampah", undefined, {
                shallow: true,
            });
        }
    };

    const [items, setItems] = useState([]);
    const [temp, setTemp] = useState([]);
    const [qty, setQty] = useState("");
    const [total, setTotal] = useState(0);
    const [nasabah, setNasabah] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [tabung, setTabung] = useState(false);
    const [validItem, setValidItem] = useState(false);
    const [defaultNasabah, setDefaultNasabah] = useState([]);

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
            onSubmit(formData, items, nasabah);
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

        if (temp.length < 1) {
            return -1;
        }

        const find = items.filter((item) => item._sampahType._id == temp._id);

        if (find.length > 0) {
            const newItems = items.map((item) => {
                if (item._sampahType._id == temp._id) {
                    item.qty = qty;
                }
                return item;
            });

            setItems(newItems);
        } else {
            setItems([...items, { _sampahType: temp, qty: qty }]);
        }
    };

    const handleDelete = (id) => {
        const find = items.filter((item) => item._sampahType._id != id);

        setItems(find);
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

    const mustCash = () => {
        setValue("transactionType", "CASH");
        setTabung(true);
    };

    const formatRp = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(number);
    };

    useEffect(() => {
        if (data != "") {
            setValue("name", data._nasabah.name);
            setValue("address", data._nasabah.address);
            setValue("mobile", data._nasabah.mobile);
            setValue("transactionDate", data.transactionDate);
            setValue("transactionType", data.transactionType);
            setItems(data.items);
            setDefaultNasabah({
                label: data._nasabah.name,
                value: data._nasabah._id,
            });
        }
    }, []);

    useEffect(() => {
        setTotal(() => {
            return items.reduce((tot, item) => {
                return tot + item._sampahType.price * item.qty;
            }, 0);
        });
    }, [items]);

    return (
        <div className='bg-white rounded shadow m-auto w-full'>
            <form onSubmit={handleSubmit(send)}>
                <div className='border-b px-4 py-2 flex justify-between	'>
                    <h3 className='font-semibold text-lg'>{title}</h3>
                </div>
                <div className='p-5'>
                    <div className='grid grid-cols-2 gap-2'>
                        <div className='col-span-2'>
                            <label>
                                Nama <span className='text-red-500'>*</span>
                            </label>
                            <AsyncCreatableSelect
                                instanceId='selectNasabah'
                                cacheOptions
                                defaultOptions
                                value={defaultNasabah}
                                onChange={(e) => {
                                    if (e.__isNew__) {
                                        setValue("name", e.value);
                                        setValue("_nasabah");
                                        setDisabled(false);
                                        mustCash();
                                        setDefaultNasabah(e);
                                    } else {
                                        setDefaultNasabah(e);
                                        setNasabah(e);
                                        setTabung(false);
                                        setDisabled(true);
                                        setValue("name", e.name);
                                        setValue("address", e.address);
                                        setValue("mobile", e.mobile);
                                    }
                                }}
                                loadOptions={searchNasabah}
                                className={`${
                                    errors.name && "border-red-500 border-2"
                                }`}
                            />
                        </div>
                        <div className='hidden'>
                            <input
                                name='_nasabah'
                                type='text'
                                ref={register()}
                            />
                            <input
                                name='name'
                                type='text'
                                ref={register({
                                    required: "Nama harus di isi!",
                                })}
                            />
                        </div>
                        <div>
                            <label>
                                Alamat <span className='text-red-500'>*</span>
                            </label>

                            <input
                                name='address'
                                type='text'
                                className={`block border w-full px-4 py-1 ${
                                    errors.address
                                        ? "border-red-500 border-2"
                                        : ""
                                }`}
                                disabled={disabled ? "disabled" : ""}
                                ref={register({
                                    required: "Alamat harus di isi!",
                                })}
                            />
                            {errors.address && (
                                <span className='text-xs text-red-500'>
                                    * {errors.address.message}
                                </span>
                            )}
                        </div>
                        <div>
                            <label>
                                Tanggal <span className='text-red-500'>*</span>
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
                        <div>
                            <label>No. HP</label>
                            <input
                                name='mobile'
                                type='text'
                                className='block border w-full px-4 py-1'
                                disabled={disabled ? "disabled" : ""}
                                ref={register()}
                            />
                        </div>
                        <div>
                            <label>
                                Tipe Transaksi{" "}
                                <span className='text-red-500'>*</span>
                            </label>
                            <select
                                name='transactionType'
                                className={`block border w-full px-4 py-1 ${
                                    errors.transactionType
                                        ? "border-red-500 border-2"
                                        : ""
                                }`}
                                ref={register({
                                    required: "Pilih jenis kelamin!",
                                })}
                            >
                                <option
                                    value='TABUNG'
                                    disabled={tabung ? "disabled" : ""}
                                >
                                    TABUNG
                                </option>
                                <option value='CASH'>CASH</option>
                            </select>
                            {errors.transactionType && (
                                <span className='text-xs text-red-500'>
                                    * {errors.transactionType.message}
                                </span>
                            )}
                        </div>
                        <div className='col-span-2'>
                            <label>
                                Item <span className='text-red-500'>*</span>
                            </label>
                            <div className='grid grid-cols-3 gap-2'>
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
                                <input
                                    type='number'
                                    className={`border px-4 py-1`}
                                    placeholder='Qty.'
                                    value={qty}
                                    onChange={(e) =>
                                        setQty(parseInt(e.target.value))
                                    }
                                />
                                <button
                                    className={`bg-green-500 hover:bg-white shadow-md border-white rounded-md border-2 hover:border-green-500 hover:text-green-500 focus:outline-none p-1 text-white ${
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
                            <TableCol>Harga</TableCol>
                            <TableCol>Qty.</TableCol>
                            <TableCol>Jumlah</TableCol>
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
                                            <label>
                                                {formatRp(
                                                    item._sampahType.price
                                                )}
                                                /{item._sampahType.denom}
                                            </label>
                                        </TableCell>
                                        <TableCell>
                                            <label>{item.qty}</label>
                                        </TableCell>
                                        <TableCell>
                                            <label>
                                                {formatRp(
                                                    item._sampahType.price *
                                                        item.qty
                                                )}
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

PembelianSampahForm.defaultProps = {
    data: "",
};
