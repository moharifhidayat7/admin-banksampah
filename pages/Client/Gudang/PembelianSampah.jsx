import ClientLayout from "../../../components/Layouts/ClientLayout";
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableCol,
} from "../../../components/Table";
import * as Icons from "heroicons-react";
export default function PembelianSampah({ sampahPurchase }) {
    const formatRp = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(number);
    };
    return (
        <ClientLayout>
            <div className='flex justify-between'>
                <h3 className='uppercase font-medium mb-3'>
                    Transaksi Pembelian Sampah
                </h3>
                {/* <div className='flex space-x-1'>
                    <div>
                        <a
                            href='#'
                            className='ring-green-500 bg-green-500 px-2'
                        >
                            1
                        </a>
                    </div>
                    <div>
                        <a href='#' className='ring-1 ring-gray-500 px-2'>
                            2
                        </a>
                    </div>
                    <div>
                        <a href='#' className='ring-1 ring-gray-500 px-2'>
                            3
                        </a>
                    </div>
                    <div>
                        <a href='#' className='ring-1 ring-gray-500 px-2'>
                            4
                        </a>
                    </div>
                    <div>
                        <a href='#' className='ring-1 ring-gray-500 px-2'>
                            Selanjutnya
                        </a>
                    </div>
                </div> */}
            </div>
            <div className='w-full'>
                <Table>
                    <TableHead>
                        <TableCol>Id</TableCol>
                        <TableCol>Tanggal</TableCol>
                        <TableCol>Nama</TableCol>
                        <TableCol>Total</TableCol>
                    </TableHead>
                    <TableBody>
                        {sampahPurchase.map((trx) => {
                            return (
                                <TableRow key={trx._id}>
                                    <TableCell>{trx._id}</TableCell>
                                    <TableCell>
                                        {new Date(
                                            trx.transactionDate
                                        ).toLocaleString("id-ID", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </TableCell>
                                    <TableCell>{trx._nasabah.name}</TableCell>
                                    <TableCell>
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
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </ClientLayout>
    );
}
export async function getServerSideProps() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/api/sampahPurchase?limit=4&newest`
    );
    const sampahPurchase = await res.json();
    return {
        props: {
            sampahPurchase,
        },
    };
}
