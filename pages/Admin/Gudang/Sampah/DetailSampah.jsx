import React from "react";
import Tabel from "../../../../components/Tabel";
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableCol,
} from "../../../../components/Table";
import * as Icons from "heroicons-react";
function DetailSampah() {
    return (
        <div class='mx-auto bg-white dark:bg-gray-800 dark:bg-gray-800 shadow rounded'>
            <div class='flex flex-col lg:flex-row p-4 lg:p-8 justify-between items-start lg:items-stretch w-full'>
                <div className='inline-flex bg-white overflow-hidden focus-within:text-gray-800 text-gray-300 focus-within:ring-black rounded-md ring-2'>
                    <input
                        className='w-72 py-2 px-4 focus:outline-none bg-gray'
                        placeholder='Cari ?'
                        type='search'
                        name='carinasabah'
                        id='carinasabah'
                    />
                    <button
                        id='carinasabah'
                        className='items-center focus:outline-none flex p-1 '
                    >
                        <Icons.Search className='w-6' />
                    </button>
                </div>
            </div>
            <div class='w-full overflow-x-scroll xl:overflow-x-hidden'>
                <Table>
                    <TableHead>
                        <TableCol>No</TableCol>
                        <TableCol>Nama</TableCol>
                        <TableCol>Alamat</TableCol>
                        <TableCol>Rekening</TableCol>
                        <TableCol>Jenis Kelamin</TableCol>
                        <TableCol>No. HP</TableCol>

                        <TableCol>Keanggotaan</TableCol>
                    </TableHead>

                    <TableBody>
                        <TableRow>
                            <TableCell>NASABAH</TableCell>
                            <TableCell>NASABAH</TableCell>
                            <TableCell>NASABAH</TableCell>
                            <TableCell>NASABAH</TableCell>
                            <TableCell>NASABAH</TableCell>
                            <TableCell>NASABAH</TableCell>
                            <TableCell>NASABAH</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

export default DetailSampah;
