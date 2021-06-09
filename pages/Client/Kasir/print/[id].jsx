import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableCol,
} from "../../../../components/Table";

import { useEffect } from "react";

export default function Print({ order }) {
    const formatRp = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(number);
    };

    useEffect(() => {
        window.print();
    });
    return (
        <div className='bg-white h-screen'>
            <div className='w-full'>
                <div className='border-b px-4 py-2 flex justify-between	'>
                    <h3 className='font-semibold text-lg'>Nota Pembelian</h3>
                </div>
                <div className='p-5'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                        <div>
                            <div>
                                <label className='font-bold'>
                                    ID Pesanan :{" "}
                                </label>
                                <label>{order._id}</label>
                            </div>
                            <div>
                                <label className='font-bold'>Tanggal : </label>
                                <label>
                                    {new Date(order.createdAt).toLocaleString(
                                        "id-ID",
                                        {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        }
                                    )}
                                </label>
                            </div>
                            <div>
                                <label className='font-bold'>Status : </label>
                                <label>{order.status}</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <Table>
                        <TableHead>
                            <TableCol>Nama Produk</TableCol>
                            <TableCol>Harga</TableCol>
                            <TableCol>Qty.</TableCol>
                            <TableCol>Jumlah</TableCol>
                        </TableHead>

                        <TableBody className='h-6'>
                            {order.items.map((item) => {
                                return (
                                    <TableRow key={item._product._id}>
                                        <TableCell>
                                            <label>{item._product.name}</label>
                                        </TableCell>
                                        <TableCell>
                                            <label>
                                                {formatRp(item._product.price)}
                                            </label>
                                        </TableCell>
                                        <TableCell>
                                            <label>{item.qty}</label>
                                        </TableCell>
                                        <TableCell>
                                            <label>
                                                {formatRp(
                                                    item.qty *
                                                        item._product.price
                                                )}
                                            </label>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
                <div className='text-right w-full border-t p-5'>
                    <div>
                        <div>
                            <span className='text-sm'>Total : </span>
                            <span className='font-bold text-md'>
                                {formatRp(
                                    order.items.reduce((tot, item) => {
                                        return (
                                            tot + item._product.price * item.qty
                                        );
                                    }, 0)
                                )}
                            </span>
                        </div>
                        <div>
                            <span className='text-sm'>Bayar : </span>
                            <span className='font-bold text-md'>
                                {formatRp(order.payment)}
                            </span>
                        </div>
                        <div>
                            <span className='text-sm'>Kembalian : </span>
                            <span className='font-bold text-md'>
                                {formatRp(
                                    order.payment -
                                        order.items.reduce((tot, item) => {
                                            return (
                                                tot +
                                                item._product.price * item.qty
                                            );
                                        }, 0)
                                )}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps({ params }) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/api/order/${params.id}`
    );
    const order = await res.json();
    return {
        props: {
            order,
        },
    };
}
