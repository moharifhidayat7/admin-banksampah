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
export default function PembelianSampah() {
    return (
        <ClientLayout>
            <div className='flex justify-between'>
                <h3 className='uppercase font-medium mb-3'>
                    Transaksi Pembelian Sampah
                </h3>
                <div className='flex space-x-1'>
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
                </div>
            </div>
            <div className='w-full'>
                <Table>
                    <TableHead>
                        <TableCol>Tanggal</TableCol>
                        <TableCol>Pembeli</TableCol>
                        <TableCol>Jumlah</TableCol>
                        <TableCol>Keterangan</TableCol>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>12-12-12</TableCell>
                            <TableCell>Siswanto</TableCell>
                            <TableCell>Rp.200000</TableCell>
                            <TableCell>Beli Beli</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>12-12-12</TableCell>
                            <TableCell>Siswanto</TableCell>
                            <TableCell>Rp.200000</TableCell>
                            <TableCell>Beli Beli</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>12-12-12</TableCell>
                            <TableCell>Siswanto</TableCell>
                            <TableCell>Rp.200000</TableCell>
                            <TableCell>Beli Beli</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>12-12-12</TableCell>
                            <TableCell>Siswanto</TableCell>
                            <TableCell>Rp.200000</TableCell>
                            <TableCell>Beli Beli</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </ClientLayout>
    );
}
