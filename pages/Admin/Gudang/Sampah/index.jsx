import AdminLayout from "../../../../components/Layouts/AdminLayout";
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableCol,
} from "../../../../components/Table";
import { useState, useReducer, useEffect } from "react";
import * as Icons from "heroicons-react";
import { useForm } from "react-hook-form";

export default function index({ sampahType }) {
    return (
        <AdminLayout>
            <h1 className='text-4xl mb-5'>Harga Sampah</h1>
            <div className='mt-5'>
                <div className='bg-white dark:bg-gray-800 dark:bg-gray-800 shadow rounded'>
                    <div className='overflow-x-auto'>
                        <Table>
                            <TableHead>
                                <TableCol>Jenis Sampah</TableCol>
                                <TableCol>Kategori</TableCol>
                                <TableCol>Satuan</TableCol>
                                <TableCol>Harga</TableCol>
                                <TableCol className='text-center'></TableCol>
                            </TableHead>
                            <TableBody>
                                {sampahType.map((type) => {
                                    if (type.price != 0) {
                                        return (
                                            <TableRow key={type._id}>
                                                <TableCell>
                                                    {type.name}
                                                </TableCell>
                                                <TableCell>
                                                    {type._category.name}
                                                </TableCell>
                                                <TableCell>
                                                    {type.denom}
                                                </TableCell>
                                                <TableCell>
                                                    {type.price}
                                                </TableCell>
                                                <TableCell className='text-right'>
                                                    <button
                                                        className={`bg-blue-500 hover:bg-white shadow-md border-white rounded-md border-2 hover:border-blue-500 hover:text-blue-500 focus:outline-none p-1 text-white`}
                                                    >
                                                        <Icons.Pencil />
                                                    </button>
                                                    <button
                                                        className='bg-red-500 hover:bg-white shadow-md border-white rounded-md border-2 hover:border-red-500 hover:text-red-500 focus:outline-none p-1 text-white'
                                                        onClick={() =>
                                                            delType(type._id)
                                                        }
                                                    >
                                                        <Icons.Trash />
                                                    </button>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    }
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

export async function getStaticProps() {
    const res = await fetch("http://localhost:3000/api/sampahType");
    const sampahType = await res.json();
    return {
        props: {
            sampahType,
        },
    };
}
