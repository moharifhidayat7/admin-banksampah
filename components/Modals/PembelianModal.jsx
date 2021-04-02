import { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableCol,
    TableHead,
    TableRow,
} from "../Table";
import * as Icons from "heroicons-react";
import { useForm, useFieldArray } from "react-hook-form";

const ItemRow = ({ index, field, register, errors, append, remove }) => {
    const [jenis, setJenis] = useState([]);
    const [jumlah, setJumlah] = useState(0);
    const [qty, setQty] = useState(0);

    const handleJenis = (e) => {
        const jenis = jenises.filter((jenis) => jenis.id == e.target.value)[0];
        if (jenis == undefined) {
            setJenis({ harga: "0", satuan: "-" });
        } else {
            setJenis(jenis);
        }
    };

    const jenises = [
        { id: 1, name: "Kardus", harga: 20000, satuan: "Kg" },
        { id: 2, name: "Besi", harga: 10000, satuan: "Meter" },
    ];

    const updateQty = (e) => {
        e.preventDefault();
        setQty(e.target.value);
    };

    useEffect(() => {
        setJumlah(jenis.harga * qty);
    }, [handleJenis]);

    return (
        <TableRow>
            <TableCell>
                <select
                    name={`jenis[${index}].id`}
                    className='w-full'
                    onChange={handleJenis}
                    ref={register({
                        required: true,
                    })}
                >
                    <option>Pilih Jenis Sampah ...</option>
                    {jenises.map((jenis) => (
                        <option key={jenis.id} value={jenis.id}>
                            {jenis.name}
                        </option>
                    ))}
                </select>
            </TableCell>
            <TableCell>
                <label>{`Rp. ${jenis.harga}/${jenis.satuan}`}</label>
            </TableCell>
            <TableCell>
                <input
                    name={`jenis[${index}].qty`}
                    type='text'
                    className={`block border w-full p-2 ${
                        errors.jenis && "border-red-500 border-2"
                    }`}
                    ref={register({
                        required: true,
                    })}
                    placeholder='Qty.'
                    onChange={updateQty}
                    value={qty}
                />
            </TableCell>
            <TableCell>
                <label>{isNaN(jumlah) ? 0 : jumlah}</label>
            </TableCell>
            <TableCell>
                <Icons.MinusCircle className='text-red-500 cursor-pointer' />
            </TableCell>
        </TableRow>
    );
};

export default function PembelianModal({ modal, toggleModal, setDa }) {
    const { control, register, handleSubmit, watch, errors } = useForm();
    const {
        fields,
        append,
        prepend,
        remove,
        swap,
        move,
        insert,
    } = useFieldArray({ control, name: "items" });

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div
            className={`modal absolute z-40 h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-70 ${
                modal ? "" : "hidden"
            }`}
            onClick={toggleModal}
        >
            <div
                className='bg-white rounded shadow-lg w-8/12'
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='border-b px-4 py-2 grid grid-cols-3 items-center'>
                        <h3 className='font-semibold text-lg col-span-2'>
                            Tambah Transaksi Sampah
                        </h3>
                        <input
                            type='text'
                            placeholder='Cari Nasabah'
                            className='border px-4 py-2 w-full'
                        />
                    </div>
                    <div className='p-5 grid grid-cols-4 gap-4'>
                        <div className='col-span-2'>
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
                        </div>
                        <div>
                            <div>
                                <label>No. HP</label>
                                <input
                                    name='phone'
                                    type='text'
                                    className='block border w-full px-4 py-1'
                                    ref={register()}
                                />
                            </div>
                            <div className='mt-2'>
                                <label>
                                    Jenis Transaksi{" "}
                                    <span className='text-red-500'>*</span>
                                </label>
                                <div className='py-2'>
                                    <label className='inline-flex items-center'>
                                        <input
                                            name='transactionType'
                                            type='radio'
                                            className='form-radio'
                                            value='cash'
                                            ref={register({ required: true })}
                                        />
                                        <span className='ml-2'>Tunai</span>
                                    </label>
                                    <label className='inline-flex items-center ml-6'>
                                        <input
                                            name='transactionType'
                                            type='radio'
                                            className='form-radio'
                                            value='saving'
                                            ref={register({ required: true })}
                                        />
                                        <span className='ml-2'>Tabung</span>
                                    </label>
                                </div>
                                {errors.transactionType && (
                                    <span className='text-xs text-red-500'>
                                        * Pilih salah satu!
                                    </span>
                                )}
                            </div>
                        </div>
                        <div>
                            <div>
                                <label>
                                    Tanggal{" "}
                                    <span className='text-red-500'>*</span>
                                </label>
                                <input
                                    name='createdAt'
                                    type='text'
                                    className={`block border w-full px-4 py-1 ${
                                        errors.createdAt &&
                                        "border-red-500 border-2"
                                    }`}
                                    ref={register({ required: true })}
                                />
                                {errors.createdAt && (
                                    <span className='text-xs text-red-500'>
                                        * Tanggal harus di isi!
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className='border-t pl-5 h-72 overflow-y-scroll'>
                        <Table>
                            <TableHead>
                                <TableCol>Jenis Sampah</TableCol>
                                <TableCol>Harga</TableCol>
                                <TableCol>Qty.</TableCol>
                                <TableCol>Jumlah</TableCol>
                                <TableCol></TableCol>
                            </TableHead>

                            <TableBody className='overflow-y-scroll h-6'>
                                {fields.map((field, index) => (
                                    <ItemRow
                                        key={index}
                                        index={index}
                                        field={field}
                                        register={register}
                                        errors={errors}
                                        remove={remove}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                        <div className='flex justify-center mt-5'>
                            <Icons.PlusCircle
                                className='text-green-500 cursor-pointer'
                                onClick={() => append({ items: "items" })}
                            />
                        </div>
                    </div>
                    <div className='flex justify-between items-center w-full border-t p-5'>
                        <div>
                            <span className='text-sm'>Total : </span>
                            <span className='font-bold text-md'>
                                Rp. 200.000
                            </span>
                        </div>
                        <div>
                            <button
                                className='bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white mr-1 close-modal'
                                onClick={toggleModal}
                            >
                                Cancel
                            </button>
                            <button
                                type='submit'
                                className='bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white cursor-pointer'
                            >
                                Tambah
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
