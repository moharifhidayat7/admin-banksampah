import * as Icon from "heroicons-react";
import CardGudang from "../../../components/CardGudang";
import NavbarGudang from "../../../components/Navbar/NavbarGudang";
import AsyncCreatableSelect from "react-select/async-creatable";
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableCol,
} from "../../../components/Table";
import { useForm } from "react-hook-form";
import { useState } from "react";
import * as Icons from "heroicons-react";
import Link from "next/link";

export default function Pembelian({ sampahType }) {
    const { register, handleSubmit, setValue, reset, errors } = useForm();

    const [items, setItems] = useState([]);
    const [qty, setQty] = useState(0);
    const [temp, setTemp] = useState([]);
    const [cash, setCash] = useState(false);
    const [success, setSuccess] = useState(false);
    const [trx, setTrx] = useState("");

    const onSubmit = async (data) => {
        await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/sampahPurchase`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...data,
                items: items,
            }),
        }).then(async (res) => {
            const result = await res.json();
            alert("Pembelian Sampah Berhasil");
            setSuccess(true);
            setTrx(result._id);
        });
    };

    const handleAdd = (e) => {
        e.preventDefault();

        if (qty == 0) {
            return;
        }

        if (temp.length < 1) {
            return;
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

    const formatRp = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(number);
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
    const handleSelect = (e) => {
        const tipe = sampahType.filter(
            (jenis) => jenis._id == e.target.value
        )[0];
        setTemp({
            ...tipe,
        });
    };

    return (
        <div>
            <NavbarGudang />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='bg-white shadow-md m-4 lg:grid lg:grid-cols-3 lg:gap-4  rounded-sm p-2 space-y-4'>
                    <div className='space-y-4 lg:col-span-1'>
                        <div className='flex lg:hidden flex-col space-y-2 md:flex-row md:space-y-0  justify-between'>
                            <h3 className='flex text-gray-800'>
                                <Icon.ShoppingCart /> Gudang{" "}
                                <Icon.ChevronRight />
                                Pembelian
                            </h3>
                            <h3 className='text-gray-800 '>
                                Sisa Saldo Gudang :{" "}
                                <strong>Rp.192.168.001</strong>
                            </h3>
                        </div>
                        <CardGudang title='Informasi Nota'>
                            <div className='p-2'>
                                <div className='flex justify-between items-center'>
                                    <label>Kasir</label>
                                    <input
                                        type='text'
                                        className='py-0.5 focus:outline-none w-1/2 bg-gray-200 px-0.5'
                                        value='Admin'
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className='p-2'>
                                <div className='flex  justify-between items-center'>
                                    <label>Tipe Transaksi</label>
                                    <select
                                        ref={register({ required: true })}
                                        name='transactionType'
                                        className='focus:outline-none py-0.5 w-1/2 border px-0.5'
                                    >
                                        <option
                                            value='TABUNG'
                                            disabled={cash ? "disabled" : ""}
                                        >
                                            TABUNG
                                        </option>
                                        <option value='CASH'>CASH</option>
                                    </select>
                                </div>
                            </div>
                        </CardGudang>
                        <CardGudang title='Informasi Penjual/Nasabah'>
                            <div className='p-2'>
                                <div className='flex justify-between py-2'>
                                    <label>Nasabah</label>
                                    {/* <button className="py-1 px-2 bg-red-700 text-white text-sm ring ring-transparent hover:ring-red-700 focus:outline-none hover:bg-white hover:text-red-700">Clear</button> */}
                                </div>
                                <AsyncCreatableSelect
                                    instanceId='selectNasabah'
                                    cacheOptions
                                    defaultOptions
                                    onChange={(e) => {
                                        if (e.__isNew__) {
                                            setCash(true);
                                            setValue("transactionType", "CASH");
                                            setValue("_nasabah._id");
                                            setValue("_nasabah.name", e.value);
                                            setValue("_nasabah.address");
                                            setValue("_nasabah.mobile");
                                        } else {
                                            setCash(false);
                                            setValue("_nasabah._id", e._id);
                                            setValue("_nasabah.name", e.name);
                                            setValue(
                                                "_nasabah.address",
                                                e.address
                                            );
                                            setValue(
                                                "_nasabah.mobile",
                                                e.mobile
                                            );
                                        }
                                    }}
                                    loadOptions={searchNasabah}
                                />
                            </div>
                            <div className='p-2'>
                                <div className='flex justify-between items-center hidden'>
                                    <label>Nama</label>
                                    <input
                                        ref={register({ required: true })}
                                        name='_nasabah.name'
                                        type='text'
                                        className='py-0.5 focus:outline-none w-1/2 border px-0.5'
                                    />
                                    <input
                                        ref={register()}
                                        name='_nasabah._id'
                                        type='text'
                                        className='hidden'
                                    />
                                </div>
                            </div>
                            <div className='p-2'>
                                <div className='flex justify-between items-center'>
                                    <label>Alamat</label>
                                    <input
                                        ref={register()}
                                        name='_nasabah.address'
                                        type='text'
                                        className='py-0.5 focus:outline-none w-1/2 border px-0.5'
                                    />
                                </div>
                            </div>
                            <div className='p-2'>
                                <div className='flex justify-between items-center'>
                                    <label>No. Hp</label>
                                    <input
                                        ref={register()}
                                        name='_nasabah.mobile'
                                        type='text'
                                        className='py-0.5 focus:outline-none w-1/2 border px-0.5'
                                    />
                                </div>
                            </div>
                        </CardGudang>
                    </div>
                    <div className='flex flex-col  lg:col-span-2 space-y-5'>
                        <div className='lg:flex hidden lg:justify-between'>
                            <h3 className='flex text-gray-800'>
                                Pembelian Sampah
                            </h3>
                        </div>

                        <div className='flex flex-col md:items-center md:flex-row'>
                            <div className='flex  lg:w-1/2 lg:flex-row md:items-center'>
                                <label>Pilih Item:</label>
                                <select
                                    className='focus:outline-none mx-3 py-0.5 w-1/2 md:w-3/5 border px-0.5'
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
                            <div className='flex  lg:flex-nowrap md:items-center'>
                                <label>Qty:</label>
                                <input
                                    value={qty}
                                    onChange={(e) =>
                                        setQty(parseInt(e.target.value))
                                    }
                                    type='number'
                                    className='focus:outline-none mx-3 py-0.5 w-1/3 mt-2 md:mt-0 md:w-3/5 border px-0.5'
                                />
                            </div>
                            <button
                                onClick={handleAdd}
                                type='button'
                                className='py-1 mt-2 md:mt-0 px-4 bg-gray-300 font-medium'
                            >
                                Tambahkan
                            </button>
                        </div>
                        <div className=''>
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
                                            <TableRow
                                                key={item._sampahType._id}
                                            >
                                                <TableCell>
                                                    <label>
                                                        {item._sampahType.name}
                                                    </label>
                                                </TableCell>
                                                <TableCell>
                                                    <label>
                                                        {formatRp(
                                                            item._sampahType
                                                                .price
                                                        )}
                                                        /
                                                        {item._sampahType.denom}
                                                    </label>
                                                </TableCell>
                                                <TableCell>
                                                    <label>{item.qty}</label>
                                                </TableCell>
                                                <TableCell>
                                                    <label>
                                                        {formatRp(
                                                            item._sampahType
                                                                .price *
                                                                item.qty
                                                        )}
                                                    </label>
                                                </TableCell>
                                                <TableCell className='float-right'>
                                                    <button
                                                        type='button'
                                                        className='bg-red-500 hover:bg-white shadow-md border-white rounded-md border-2 hover:border-red-500 hover:text-red-500 focus:outline-none p-1 text-white'
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleDelete(
                                                                item._sampahType
                                                                    ._id
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
                        <div>
                            <div className='flex justify-end mt-4 font-medium bg-blue-200 p-2 text-xl items-center'>
                                Total :{" "}
                                <p className='ml-4 mr-4'>
                                    {formatRp(
                                        items.reduce((tot, item) => {
                                            return (
                                                tot +
                                                item._sampahType.price *
                                                    item.qty
                                            );
                                        }, 0)
                                    )}
                                </p>
                            </div>
                            <div className='flex flex-col items-end'></div>
                            {success ? (
                                <div className='flex justify-end mt-2 space-x-10'>
                                    <button
                                        onClick={(e) => {
                                            setItems([]);
                                            reset();
                                            setSuccess(false);
                                        }}
                                        className='py-1 px-10 bg-red-700 text-white ring ring-transparent hover:ring-red-700 focus:outline-none hover:bg-white hover:text-red-700'
                                    >
                                        Transaksi baru
                                    </button>
                                    <Link
                                        href={`/Client/Gudang/Pembelian/${trx}`}
                                    >
                                        <a
                                            target='_blank'
                                            className='py-1 px-10 bg-blue-800 text-white ring ring-transparent hover:ring-blue-800 focus:outline-none hover:bg-white hover:text-blue-800'
                                        >
                                            Print
                                        </a>
                                    </Link>
                                </div>
                            ) : (
                                <div className='flex justify-end mt-2 space-x-10'>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setItems([]);
                                            reset();
                                        }}
                                        className='py-1 px-10 bg-red-700 text-white ring ring-transparent hover:ring-red-700 focus:outline-none hover:bg-white hover:text-red-700'
                                    >
                                        Reset
                                    </button>
                                    <button
                                        type='submit'
                                        className='py-1 px-10 bg-blue-800 text-white ring ring-transparent hover:ring-blue-800 focus:outline-none hover:bg-white hover:text-blue-800'
                                    >
                                        Submit
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
export async function getServerSideProps() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/api/sampahType`
    );
    const sampahType = await res.json();
    return {
        props: {
            sampahType,
        },
    };
}
