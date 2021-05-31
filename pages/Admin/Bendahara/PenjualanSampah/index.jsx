import { useEffect, useState } from "react";
import AdminLayout from "../../../../components/Layouts/BhrLayout";
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

export default function PembelianSampah({ sampahSale }) {
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
                    Penjualan Sampah Bank Sampah
                </h1>

                
            </div>
            <div className='w-full overflow-x-scroll xl:overflow-x-hidden'>
                <Table>
                    <TableHead>
                        <TableCol className='w-32'>Tanggal</TableCol>
                        <TableCol>Pembeli</TableCol>
                        <TableCol>Jumlah</TableCol>
                        <TableCol>Keterangan</TableCol>
                        <TableCol></TableCol>
                    </TableHead>

                    <TableBody>
                        {sampahSale.map((trx, index) => {
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
                                    <TableCell>PT-BLABLA</TableCell>
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
        `${process.env.NEXT_PUBLIC_API_HOST}/api/sampahSale`
    );
    const sampahSale = await res.json();
    return {
        props: {
            sampahSale,
        },
    };
}
