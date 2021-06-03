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

export default function Product({ products }) {
    const router = useRouter();
    const refreshData = () => {
        router.replace(router.asPath);
    };
    const deleteHandler = async (id) => {
        await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/product/${id}`, {
            method: "DELETE",
        }).then(async (res) => {
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
        <PenjualanLayout>
            <div>
                <h1 className='text-4xl mb-5 inline-block'> Daftar Produk</h1>

                <div className='float-right'>
                    <Link href='/Admin/Penjualan/Produk/tambah'>
                        <a
                            role='button'
                            className='px-4 inline-block align-top focus:outline-none shadow-md bg-green-500 rounded-md font-bold py-2 ring-2 ring-white text-white hover:ring-green-500 hover:bg-white hover:text-green-500 focus:ring-green-500 focus:bg-white focus:text-green-500 '
                        >
                            Tambah Produk
                        </a>
                    </Link>
                </div>
            </div>
            <div className='w-full overflow-x-scroll xl:overflow-x-hidden'>
                <Table>
                    <TableHead>
                        <TableCol>Info Produk</TableCol>
                        <TableCol>Harga</TableCol>
                        <TableCol>Stok</TableCol>
                        <TableCol>Status</TableCol>
                        <TableCol></TableCol>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => {
                            return (
                                <TableRow key={product._id}>
                                    <TableCell className='py-2'>
                                        <div className='inline-block align-middle'>
                                            <img
                                                src='/3541851566.jpg'
                                                alt='item'
                                                className='w-20'
                                            />
                                        </div>
                                        <div className='inline-block align-top ml-5 w-96 h-16'>
                                            <b>{product.name}</b>
                                            <p className='line-clamp-3 my-1'>
                                                {product.description}
                                            </p>
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        {formatRp(product.price)}
                                    </TableCell>
                                    <TableCell>{product.stock}</TableCell>
                                    <TableCell>Aktif</TableCell>
                                    <TableCell className='text-right'>
                                        <Link
                                            href={`/Admin/Penjualan/Produk/edit/${product._id}`}
                                        >
                                            <a
                                                className={`inline-block bg-blue-500 align-middle hover:bg-white shadow-md border-white rounded-md border-2 hover:border-blue-500 hover:text-blue-500 focus:outline-none p-1 text-white`}
                                            >
                                                <Icons.Pencil />
                                            </a>
                                        </Link>
                                        <button
                                            onClick={() =>
                                                deleteHandler(product._id)
                                            }
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
        </PenjualanLayout>
    );
}

export async function getServerSideProps() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/product`);
    const products = await res.json();
    return {
        props: {
            products,
        },
    };
}
