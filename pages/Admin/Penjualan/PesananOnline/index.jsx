import PenjualanLayout from "../../../../components/Layouts/PenjualanLayout";
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableCol,
} from "../../../../components/Table";
import * as Icons from "heroicons-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Product({ orders }) {
    const router = useRouter();
    const refreshData = () => {
        router.replace(router.asPath);
    };

    const formatRp = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(number);
    };

    return (
        <PenjualanLayout>
            <div>
                <h1 className='text-4xl mb-5 inline-block'> Pesanan Offline</h1>
            </div>
            <div className='w-full overflow-x-scroll xl:overflow-x-hidden'>
                <Table>
                    <TableHead>
                        <TableCol className='w-28'>Id. Pesanan</TableCol>
                        <TableCol>Tanggal</TableCol>

                        <TableCol className='w-96'>Produk</TableCol>
                        <TableCol>Pembeli</TableCol>
                        <TableCol>Total</TableCol>
                        <TableCol>Status</TableCol>

                        <TableCol></TableCol>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => {
                            return (
                                <TableRow key={order._id}>
                                    <TableCell>{order._id}</TableCell>

                                    <TableCell>
                                        {new Date(
                                            order.createdAt
                                        ).toLocaleString("id-ID", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </TableCell>
                                    <TableCell className='py-2'>
                                        <ul>
                                            {order.items.map((item) => {
                                                return (
                                                    <li key={item._product._id}>
                                                        {item.qty} x{" "}
                                                        {item._product.name}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </TableCell>

                                    <TableCell>{order.customer}</TableCell>
                                    <TableCell>
                                        {formatRp(
                                            order.items.reduce(
                                                (total, item) => {
                                                    return (
                                                        total +
                                                        item.qty *
                                                            item._product.price
                                                    );
                                                },
                                                0
                                            )
                                        )}
                                    </TableCell>
                                    <TableCell>{order.status}</TableCell>
                                    <TableCell className='text-right'>
                                        {/* <Link href='#'>
                                            <a
                                                className={`inline-block bg-gray-500 align-middle hover:bg-white shadow-md border-white rounded-md border-2 hover:border-gray-500 hover:text-gray-500 focus:outline-none p-1 text-white`}
                                            >
                                                <Icons.Eye className='inline-block' />
                                                <span className='align-middle ml-1'>
                                                    Lihat Detail
                                                </span>
                                            </a>
                                        </Link> */}
                                        {order.status != "Sudah Dibayar" ? (
                                            <div>
                                                <Link href='#'>
                                                    <a
                                                        className={`inline-block bg-green-500 align-middle hover:bg-white shadow-md border-white rounded-md border-2 hover:border-green-500 hover:text-green-500 focus:outline-none p-1 text-white`}
                                                    >
                                                        <Icons.Check className='inline-block' />
                                                        <span className='align-middle ml-1'>
                                                            Konfirmasi
                                                        </span>
                                                    </a>
                                                </Link>
                                                <button className='bg-red-500 align-middle hover:bg-white shadow-md border-white rounded-md border-2 hover:border-red-500 hover:text-red-500 focus:outline-none p-1 text-white'>
                                                    <Icons.X className='inline-block' />
                                                    <span className='align-middle ml-1'>
                                                        Batalkan
                                                    </span>
                                                </button>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </PenjualanLayout>
    );
}

export async function getServerSideProps() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/order`);
    const orders = await res.json();
    return {
        props: {
            orders,
        },
    };
}
