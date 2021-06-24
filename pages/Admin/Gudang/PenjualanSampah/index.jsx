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
import { getSession } from "next-auth/client";
export default function PembelianSampah({ sampahSale }) {
    const router = useRouter();
    const refreshData = () => {
        router.replace(router.asPath);
    };

    const delTransaction = async (id) => {
        await fetch(
            `${process.env.NEXT_PUBLIC_API_HOST}/api/sampahSale/${id}`,
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

                <div className='float-right'>
                    <Link href='/Admin/Gudang/PenjualanSampah/tambah'>
                        <a
                            role='button'
                            className='px-4 inline-block align-top focus:outline-none shadow-md bg-green-500 rounded-md font-bold py-2 ring-2 ring-white text-white hover:ring-green-500 hover:bg-white hover:text-green-500 focus:ring-green-500 focus:bg-white focus:text-green-500 '
                        >
                            Jual Sampah
                        </a>
                    </Link>
                </div>
            </div>
            <div className='w-full overflow-x-scroll xl:overflow-x-hidden'>
                <Table>
                    <TableHead>
                        <TableCol className='w-32'>Id</TableCol>
                        <TableCol className='w-32'>Tanggal</TableCol>
                        <TableCol>Pembeli</TableCol>
                        <TableCol>Item</TableCol>
                        <TableCol className='w-32'>Harga Jual</TableCol>
                        <TableCol></TableCol>
                    </TableHead>

                    <TableBody>
                        {sampahSale.map((trx, index) => {
                            return (
                                <TableRow key={trx._id}>
                                    <TableCell>{trx._id}</TableCell>
                                    <TableCell>
                                        {new Date(trx.createdAt).toLocaleString(
                                            "id-ID",
                                            {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            }
                                        )}
                                    </TableCell>
                                    <TableCell>{trx.customer}</TableCell>
                                    <TableCell>
                                        {trx.items.map((item) => {
                                            return (
                                                <span>
                                                    {item.qty} x{" "}
                                                    {item._sampahType.name}{" "}
                                                    <br />
                                                </span>
                                            );
                                        })}
                                    </TableCell>
                                    <TableCell className='text-green-500'>
                                        {formatRp(
                                            trx.items.reduce((tot, item) => {
                                                return tot + item.price;
                                            }, 0)
                                        )}
                                    </TableCell>

                                    <TableCell className='float-right'>
                                        {/* <button
                                            onClick={() => {
                                                router.push(
                                                    "/Admin/Gudang/PenjualanSampah/" +
                                                        trx._id
                                                );
                                            }}
                                            className='bg-green-500 hover:bg-white shadow-md border-white rounded-md border-2 hover:border-green-500 hover:text-green-500 focus:outline-none p-1 text-white'
                                        >
                                            <Icons.Eye />
                                        </button> */}
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

export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                destination: "/login",
            },
        };
    }
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
