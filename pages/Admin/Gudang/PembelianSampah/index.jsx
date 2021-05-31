import { useEffect, useState } from "react";
import AdminLayout from "../../../../components/Layouts/AdminLayout";
import * as Icons from "heroicons-react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableCol,
} from "../../../../components/Table";

export default function PembelianSampah({ sampahPurchase }) {
    const router = useRouter();

    const refreshData = () => {
        router.replace(router.asPath);
    };

    const delTransaction = async (id) => {
        await fetch(
            `${process.env.NEXT_PUBLIC_API_HOST}/api/sampahPurchase/${id}`,
            {
                method: "DELETE",
            }
        ).then((res) => {
            refreshData();
        });
    };
    const formatRp = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(number);
    };

    return (
        <AdminLayout>
            <div>
                <h1 className='text-4xl mb-5 inline-block'>
                    Pembelian Sampah Nasabah
                </h1>

                <div className='float-right'>
                    <Link href='/Admin/Gudang/PembelianSampah/tambah'>
                        <a
                            role='button'
                            className='px-4 inline-block align-top focus:outline-none shadow-md bg-red-500 rounded-md font-bold py-2 ring-2 ring-white text-white hover:ring-red-500 hover:bg-white hover:text-red-500 focus:ring-red-500 focus:bg-white focus:text-red-500 '
                        >
                            Beli Sampah
                        </a>
                    </Link>
                </div>
                <div className='float-right'>
                    <Link href='/Admin/Gudang/PembelianSampah/tambah'>
                        <a
                            role='button'
                            className='px-4 inline-block align-top focus:outline-none shadow-md bg-red-500 rounded-md font-bold py-2 ring-2 ring-white text-white hover:ring-red-500 hover:bg-white hover:text-red-500 focus:ring-red-500 focus:bg-white focus:text-red-500 '
                        >
                            Beli Sampah
                        </a>
                    </Link>
                </div>
            </div>
            <div className='w-full overflow-x-scroll xl:overflow-x-hidden'>
                <Table>
                    <TableHead>
                        <TableCol className='w-32'>Tanggal</TableCol>
                        <TableCol>NIK</TableCol>
                        <TableCol>Nama</TableCol>
                        <TableCol className='w-80'>Alamat</TableCol>
                        <TableCol>Tipe Transaksi</TableCol>
                        <TableCol>Jumlah</TableCol>
                        <TableCol></TableCol>
                    </TableHead>

                    <TableBody>
                        {sampahPurchase.map((trx, index) => {
                            return (
                                <TableRow key={trx._id}>
                                    <TableCell>
                                        {new Date(
                                            trx.transactionDate
                                        ).toLocaleString("id-ID", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </TableCell>
                                    <TableCell>
                                        {trx._nasabah._id
                                            ? trx._nasabah._id.nik
                                            : "-"}
                                    </TableCell>
                                    <TableCell>{trx._nasabah.name}</TableCell>
                                    <TableCell>
                                        {trx._nasabah.address}
                                    </TableCell>
                                    <TableCell className='text-red-500'>
                                        {trx.transactionType}
                                    </TableCell>
                                    <TableCell className='text-red-500'>
                                        {formatRp(
                                            trx.items.reduce((tot, item) => {
                                                return (
                                                    tot +
                                                    item._sampahType.price *
                                                        item.qty
                                                );
                                            }, 0)
                                        )}
                                    </TableCell>
                                    <TableCell className='float-right'>
                                        <button
                                            onClick={() => {
                                                router.push(
                                                    "/Admin/Gudang/PembelianSampah/" +
                                                        trx._id
                                                );
                                            }}
                                            className='bg-green-500 hover:bg-white shadow-md border-white rounded-md border-2 hover:border-green-500 hover:text-green-500 focus:outline-none p-1 text-white'
                                        >
                                            <Icons.Eye />
                                        </button>
                                        <button
                                            className='bg-red-500 hover:bg-white shadow-md border-white rounded-md border-2 hover:border-red-500 hover:text-red-500 focus:outline-none p-1 text-white'
                                            onClick={() =>
                                                delTransaction(trx._id)
                                            }
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
        </AdminLayout>
    );
}

export async function getServerSideProps() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/api/sampahPurchase`
    );
    const sampahPurchase = await res.json();
    return {
        props: {
            sampahPurchase,
        },
    };
}