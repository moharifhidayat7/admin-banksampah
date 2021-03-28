import {
    Table,
    TableBody,
    TableCell,
    TableCol,
    TableHead,
    TableRow,
} from "./Table";
import * as Icons from "heroicons-react";

export default function tes() {
    return (
        <div className='modal h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50'>
            <div className='bg-white rounded shadow-lg w-8/12'>
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
                            <label>Nama</label>
                            <input
                                type='text'
                                className='block border w-full px-4 py-1'
                            />
                        </div>
                        <div className='mt-2'>
                            <label>Alamat</label>
                            <input
                                type='text'
                                className='block border w-full px-4 py-1'
                            />
                        </div>
                    </div>
                    <div>
                        <div>
                            <label>No. HP</label>
                            <input
                                type='text'
                                className='block border w-full px-4 py-1'
                            />
                        </div>
                        <div className='mt-2'>
                            <label>Jenis Transaksi</label>
                            <div className='py-2'>
                                <label className='inline-flex items-center'>
                                    <input
                                        type='radio'
                                        className='form-radio'
                                        name='transactionType'
                                        value='personal'
                                    />
                                    <span className='ml-2'>Tunai</span>
                                </label>
                                <label className='inline-flex items-center ml-6'>
                                    <input
                                        type='radio'
                                        className='form-radio'
                                        name='transactionType'
                                        value='busines'
                                    />
                                    <span className='ml-2'>Tabung</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label>Tanggal</label>
                            <input
                                type='text'
                                className='block border w-full px-4 py-1'
                            />
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
                            <TableRow>
                                <TableCell>
                                    <select className='w-full'>
                                        <option>Kardus</option>
                                    </select>
                                </TableCell>
                                <TableCell>
                                    <label>Rp. 25.000/Kg</label>
                                </TableCell>
                                <TableCell>
                                    <input
                                        type='text'
                                        className='block border w-full p-2'
                                        placeholder='Qty.'
                                    />
                                </TableCell>
                                <TableCell>
                                    <label>Rp. 25.000/Kg</label>
                                </TableCell>
                                <TableCell>
                                    <Icons.MinusCircle className='text-red-500 cursor-pointer' />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <div className='flex justify-center mt-5'>
                        <Icons.PlusCircle className='text-green-500 cursor-pointer' />
                    </div>
                </div>
                <div className='flex justify-between items-center w-full border-t p-5'>
                    <div>
                        <span className='text-sm'>Total : </span>
                        <span className='font-bold text-md'>Rp. 200.000</span>
                    </div>
                    <div>
                        <button className='bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white mr-1 close-modal'>
                            Cancel
                        </button>
                        <button className='bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white'>
                            Tambah
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
