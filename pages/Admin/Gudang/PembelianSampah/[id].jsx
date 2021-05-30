import { useRouter } from "next/router";
import {
    Table,
    TableBody,
    TableCell,
    TableCol,
    TableHead,
    TableRow,
} from "../../../../components/Table";
import Link from "next/link";

import AdminLayout from "../../../../components/Layouts/AdminLayout";
import * as Icons from "heroicons-react";

export default function index({ sampahPurchase }) {
    const router = useRouter();

    const total = sampahPurchase.items.reduce((tot, item) => {
        return tot + item._sampahType.price * item.qty;
    }, 0);

    const handleCancel = (formData) => {
        if (formData != "") {
            router.back();
        } else {
            router.push("/Admin/Gudang/PembelianSampah", undefined, {
                shallow: true,
            });
        }
    };

    const delTransaction = async (id) => {
        await fetch(
            `${process.env.NEXT_PUBLIC_API_HOST}/api/sampahPurchase/${id}`,
            {
                method: "DELETE",
            }
        ).then((res) => {
            router.push("/Admin/Gudang/PembelianSampah");
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
                <div className='bg-white rounded shadow m-auto md:w-10/12 w-full'>
                    <div className='border-b px-4 py-2 flex justify-between	'>
                        <h3 className='font-semibold text-lg'>
                            Detail Pembelian Sampah
                        </h3>
                    </div>
                    <div className='p-5'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                            <div>
                                <div>
                                    <label className='font-bold'>Nama : </label>
                                    <label>
                                        {sampahPurchase._nasabah.name}
                                    </label>
                                </div>
                                <div>
                                    <label className='font-bold'>
                                        Alamat :{" "}
                                    </label>
                                    <label>
                                        {sampahPurchase._nasabah.address}
                                    </label>
                                </div>
                                <div>
                                    <label className='font-bold'>
                                        No. HP :{" "}
                                    </label>
                                    <label>
                                        {sampahPurchase._nasabah.mobile}
                                    </label>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <label className='font-bold'>
                                        {" "}
                                        Tipe :{" "}
                                    </label>
                                    <label>
                                        {sampahPurchase.transactionType ==
                                        "TABUNG"
                                            ? `${sampahPurchase.transactionType} (rekening: ${sampahPurchase._nasabah._id.rekening})`
                                            : sampahPurchase.transactionType}
                                    </label>
                                </div>
                                <div>
                                    <label className='font-bold'>
                                        {" "}
                                        Tanggal Pembelian :{" "}
                                    </label>
                                    <label>
                                        {new Date(
                                            sampahPurchase.transactionDate
                                        ).toLocaleString("id-ID", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='h-52 overflow-y-auto'>
                        <Table>
                            <TableHead>
                                <TableCol>Jenis Sampah</TableCol>
                                <TableCol>Harga</TableCol>
                                <TableCol>Qty.</TableCol>
                                <TableCol>Jumlah</TableCol>
                            </TableHead>

                            <TableBody className='h-6'>
                                {sampahPurchase.items.map((item) => {
                                    return (
                                        <TableRow key={item._sampahType._id}>
                                            <TableCell>
                                                <label>
                                                    {item._sampahType.name}
                                                </label>
                                            </TableCell>
                                            <TableCell>
                                                <label>
                                                    {formatRp(
                                                        item._sampahType.price
                                                    )}
                                                    /{item._sampahType.denom}
                                                </label>
                                            </TableCell>
                                            <TableCell>
                                                <label>{item.qty}</label>
                                            </TableCell>
                                            <TableCell>
                                                <label>
                                                    {formatRp(
                                                        item._sampahType.price *
                                                            item.qty
                                                    )}
                                                </label>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                    <div className='flex justify-between items-center w-full border-t p-5'>
                        <div>
                            <span className='text-sm'>Total : </span>
                            <span className='font-bold text-md'>
                                {formatRp(total)}
                            </span>
                        </div>
                        <div>
                            <button
                                className='bg-gray-500 px-4 hover:bg-white shadow-md border-white rounded-md border-2 hover:border-gray-500 hover:text-gray-500 focus:outline-none p-1 text-white'
                                onClick={() => router.back()}
                            >
                                Kembali
                            </button>
                            <button
                                className='bg-red-500 px-4 hover:bg-white shadow-md border-white rounded-md border-2 hover:border-red-500 hover:text-red-500 focus:outline-none p-1 text-white'
                                onClick={() =>
                                    delTransaction(sampahPurchase._id)
                                }
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

export async function getServerSideProps({ params }) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/api/sampahPurchase/${params.id}`
    );
    const sampahPurchase = await res.json();
    return {
        props: {
            sampahPurchase,
        },
    };
}
