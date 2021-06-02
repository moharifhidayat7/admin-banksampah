import { useEffect, useState } from "react";
import BhrLayout from "../../../../components/Layouts/BhrLayout";
import Link from "next/link";

import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableCol,
} from "../../../../components/Table";
import * as Icons from "heroicons-react";
import { useRouter } from "next/router";

export default function Nasabah({ nasabahProfile }) {
    const router = useRouter();
    const refreshData = () => {
        router.replace(router.asPath);
    };
    const deleteHandler = async (id) => {
        await fetch(
            `${process.env.NEXT_PUBLIC_API_HOST}/api/nasabahProfile/${id}`,
            {
                method: "DELETE",
            }
        ).then(async (res) => {
            refreshData();
        });
    };

    return (
        <BhrLayout>
            <div className='border-b px-4 py-2 flex justify-between	'>
                <h1 className='text-4xl'>Data Nasabah</h1>
                <div className='float-right'>
                    <Link href='/Admin/Bendahara/Nasabah/tambah'>
                        <a
                            role='button'
                            className='px-4 inline-block align-top focus:outline-none shadow-md bg-green-500 rounded-md font-bold py-2 ring-2 ring-white text-white hover:ring-green-500 hover:bg-white hover:text-green-500 focus:ring-green-500 focus:bg-white focus:text-green-500 '
                        >
                            Tambah Nasabah
                        </a>
                    </Link>
                </div>
            </div>
            <div className='mt-5'>
                <div className='overflow-x-auto'>
                    <Table>
                        <TableHead>
                            <TableCol>No. Rekening</TableCol>
                            <TableCol>NIK</TableCol>
                            <TableCol>Nama</TableCol>
                            <TableCol>Alamat</TableCol>
                            <TableCol>L/P</TableCol>
                            <TableCol>No. HP</TableCol>
                            <TableCol>Keanggotaan</TableCol>
                            <TableCol></TableCol>
                        </TableHead>
                        <TableBody>
                            {nasabahProfile.map((item) => {
                                return (
                                    <TableRow key={item._id}>
                                        <TableCell>{item.rekening}</TableCell>
                                        <TableCell>{item.nik}</TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.address}</TableCell>
                                        <TableCell>{item.gender}</TableCell>
                                        <TableCell>{item.mobile}</TableCell>
                                        <TableCell>
                                            {item.accountType}
                                        </TableCell>
                                        <TableCell className='float-right'>
                                            <Link
                                                href={`/Admin/Bendahara/Nasabah/${item._id}`}
                                            >
                                                <a
                                                    role='button'
                                                    className={`inline-block align-middle bg-green-500 hover:bg-white shadow-md border-white rounded-md border-2 hover:border-green-500 hover:text-green-500 focus:outline-none p-1 text-white`}
                                                >
                                                    <Icons.Eye />
                                                </a>
                                            </Link>
                                            <Link
                                                href={`/Admin/Bendahara/Nasabah/edit/${item._id}`}
                                            >
                                                <a
                                                    className={`inline-block bg-blue-500 align-middle hover:bg-white shadow-md border-white rounded-md border-2 hover:border-blue-500 hover:text-blue-500 focus:outline-none p-1 text-white`}
                                                >
                                                    <Icons.Pencil />
                                                </a>
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    deleteHandler(item._id);
                                                }}
                                                className='bg-red-500 align-middle hover:bg-white shadow-md border-white rounded-md border-2 hover:border-red-500 hover:text-red-500 focus:outline-none p-1 text-white'
                                            >
                                                <Icons.Trash />
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </BhrLayout>
    );
}

export async function getServerSideProps() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/api/nasabahProfile`
    );
    const nasabahProfile = await res.json();
    return {
        props: {
            nasabahProfile,
        },
    };
}
