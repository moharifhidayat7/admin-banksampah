import { useState } from "react";
import AdminLayout from "../../../components/Layouts/AdminLayout";
import PopUpComp from "../../../components/PopUpComp";
import PembelianModal from "../../../components/Modals/PembelianModal";
import * as Icons from "heroicons-react";
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableCol,
} from "../../../components/Table";

function Pembelian() {
    const [modal, setModal] = useState(false);
    const [da, setDa] = useState("");

    const toggleModal = () => {
        setModal(!modal);
    };

    return (
        <AdminLayout>
            <PembelianModal
                modal={modal}
                toggleModal={toggleModal}
                da={da}
                setDa={setDa}
            />

            <h1 className='text-4xl mb-5'>Pembelian</h1>
            <div className='mx-auto bg-white dark:bg-gray-800 dark:bg-gray-800 shadow rounded'>
                <div className='flex flex-col lg:flex-row p-4 lg:p-8 justify-between items-start lg:items-stretch w-full'>
                    <div className='inline-flex bg-white overflow-hidden focus-within:text-gray-800 text-gray-300 focus-within:ring-black rounded-md ring-2'>
                        <input
                            className='w-72 py-2 px-4 focus:outline-none bg-gray'
                            placeholder='Cari ?'
                            type='search'
                            name='carinasabah'
                            id='carinasabah'
                        />
                        <button
                            id='carinasabah'
                            className='items-center focus:outline-none flex p-1 '
                        >
                            <Icons.Search className='w-6' />
                        </button>
                    </div>
                    <div className='flex justify-between space-x-1'>
                        <button
                            type='button'
                            className='px-4 focus:outline-none shadow-md bg-green-500 rounded-md font-bold py-2 ring-2 ring-white text-white hover:ring-green-500 hover:bg-white hover:text-green-500 focus:ring-green-500 focus:bg-white focus:text-green-500 '
                            onClick={toggleModal}
                        >
                            Tambah Data
                        </button>
                        <button className='flex items-center shadow-md rounded-md overflow-hidden'>
                            <Icons.DocumentText className='bg-yellow-300 h-full w-full' />
                            <p className='bg-white font-bold w-full h-full pr-2 items-center flex'>
                                Export
                            </p>
                        </button>
                    </div>
                </div>
                <div className='w-full overflow-x-scroll xl:overflow-x-hidden'>
                    <Table>
                        <TableHead>
                            <TableCol>No.</TableCol>
                            <TableCol>Tanggal</TableCol>
                            <TableCol>Tipe Transaksi</TableCol>
                            <TableCol>Nasabah</TableCol>
                            <TableCol>Rekening</TableCol>
                            <TableCol>Jumlah</TableCol>
                        </TableHead>

                        <TableBody>
                            <TableRow>
                                <TableCell>1.</TableCell>
                                <TableCell>12-12-1223</TableCell>
                                <TableCell>Cash</TableCell>
                                <TableCell>Muhaimin</TableCell>
                                <TableCell>123791</TableCell>
                                <TableCell>Rp.388833</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AdminLayout>
    );
}

export default Pembelian;

const ExportNota = ({ exnota, setExnota }) => {
    return (
        <PopUpComp pop={exnota}>
            <p className='text-center text-xl'>Export Nota</p>
            <div className='flex justify-center'>
                <table className=''>
                    <tbody>
                        <tr>
                            <td className='font-bold align-text-top'>Nama</td>
                            <td className='align-text-top'>:</td>
                            <td width={20} className='break-all align-text-top'>
                                Ach Rizal
                            </td>
                            <td></td>
                            <td className='font-bold align-text-top'>
                                Rekening
                            </td>
                            <td className='align-text-top'>:</td>
                            <td className='align-text-top'>1319819312</td>
                        </tr>
                        <tr>
                            <td className='font-bold align-text-top'>Alamat</td>
                            <td className='align-text-top'>:</td>
                            <td width={20} className='align-text-top'>
                                Banyuwangi Kemiren 2999 jdqijii
                            </td>
                            <td width={12}></td>
                            <td className='font-bold align-text-top'>Date</td>
                            <td className='align-text-top'>:</td>
                            <td className='align-text-top'>13 Feb 2021</td>
                        </tr>
                        <tr>
                            <td className='font-bold'>Pembayaran</td>
                            <td>:</td>
                            <td>Cast</td>
                        </tr>
                        <tr className='font-bold'>
                            <td colSpan={4}>Barang</td>
                            <td> Harga</td>
                        </tr>
                        <tr>
                            <td colSpan={4}>Minuman</td>
                            <td>Rp.20000</td>
                        </tr>
                        <tr>
                            <td colSpan={4} className='font-bold text-right'>
                                Total
                            </td>
                            <td>Rp.2000</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='flex space-x-6'>
                <button onClick={() => setExnota(true)}>Cancel</button>
                <button className='bg-yellow-500'>Print</button>
            </div>
        </PopUpComp>
    );
};
