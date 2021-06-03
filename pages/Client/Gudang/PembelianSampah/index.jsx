import ClientLayout from "../../../../components/Layouts/ClientLayout";
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableCol,
} from "../../../../components/Table";
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
                        <TableCol>Tipe</TableCol>
                        <TableCol>Total</TableCol>
                        <TableCol>Aksi</TableCol>
                    </TableHead>
                    <TableBody>
                        {sampahPurchase.map((trx) => {
                            return (
                                <TableRow key={trx._id}>
                                    <TableCell className="w-24 truncate">{trx._id}</TableCell>
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
                                    <TableCell>{trx.transactionType}</TableCell>
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
                                    <TableCell><a target="_blank" href={`/Client/Gudang/PembelianSampah/${trx._id}`} className="bg-green-500 hover:bg-white shadow-md border-white rounded-md border-2 hover:border-green-500 hover:text-green-500 focus:outline-none p-1 text-white">Print</a></TableCell>
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
        `${process.env.NEXT_PUBLIC_API_HOST}/api/sampahPurchase?newest`
    );
    const sampahPurchase = await res.json();
    return {
        props: {
            sampahPurchase,
        },
    };
}
