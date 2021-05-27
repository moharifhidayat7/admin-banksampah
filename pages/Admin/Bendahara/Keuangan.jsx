import * as Icons from "heroicons-react";
import BhrLayout from "../../../components/Layouts/BhrLayout";
import TambahTransaksiBankModal from "../../../components/Modals/TambahTransaksiBankModal";
import { useState, useEffect } from "react";
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableCol,
} from "../../../components/Table";

function Pemasukan() {
    return (
        <BhrLayout>
            <div>
                <h1 className='text-4xl mb-5 inline-block'>Transaksi Bank</h1>

                <button
                    type='button'
                    className='px-4 inline-block align-top float-right focus:outline-none shadow-md bg-green-500 rounded-md font-bold py-2 ring-2 ring-white text-white hover:ring-green-500 hover:bg-white hover:text-green-500 focus:ring-green-500 focus:bg-white focus:text-green-500 '
                >
                    Tambah Data
                </button>
            </div>
            <div className='w-full overflow-x-scroll xl:overflow-x-hidden'>
                <Table>
                    <TableHead>
                        <TableCol>Tanggal</TableCol>
                        <TableCol>Rekening</TableCol>
                        <TableCol>Jumlah</TableCol>
                        <TableCol>Keterangan</TableCol>
                        <TableCol>Tipe Transaksi</TableCol>
                        <TableCol></TableCol>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>asdasd</TableCell>
                            <TableCell>asdasd</TableCell>
                            <TableCell>asdasd</TableCell>
                            <TableCell>asdasd</TableCell>
                            <TableCell>asdasds</TableCell>
                            <TableCell className='float-right'>
                                <button
                                    className={`hidden bg-blue-500 hover:bg-white shadow-md border-white rounded-md border-2 hover:border-blue-500 hover:text-blue-500 focus:outline-none p-1 text-white`}
                                >
                                    <Icons.Pencil />
                                </button>
                                <button className='bg-red-500 hover:bg-white shadow-md border-white rounded-md border-2 hover:border-red-500 hover:text-red-500 focus:outline-none p-1 text-white'>
                                    <Icons.Trash />
                                </button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </BhrLayout>
    );
}

export default Pemasukan;
