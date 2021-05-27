import { useEffect, useState } from "react";
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

function Pembelian({ priceList }) {
    const [modal, setModal] = useState(false);
    const [transactions, setTransactions] = useState([]);

    const toggleModal = () => {
        setModal(!modal);
    };

    const getTransactions = async () => {
        const res = await fetch("http://localhost:3000/api/sampahTransaction");
        const json = await res.json();

        setTransactions(json);
    };

    const delTransaction = async (id) => {
        await fetch("http://localhost:3000/api/sampahTransaction/" + id, {
            method: "DELETE",
        }).then((res) => getTransactions());
    };

    useEffect(() => {
        getTransactions();
    }, []);

    return (
        <AdminLayout>
            <PembelianModal
                modal={modal}
                toggleModal={toggleModal}
                priceList={priceList}
                getTransactions={getTransactions}
            />

            <div>
                <h1 className='text-4xl mb-5 inline-block'>Transaksi</h1>

                <button
                    type='button'
                    className='px-4 inline-block align-top float-right focus:outline-none shadow-md bg-green-500 rounded-md font-bold py-2 ring-2 ring-white text-white hover:ring-green-500 hover:bg-white hover:text-green-500 focus:ring-green-500 focus:bg-white focus:text-green-500 '
                    onClick={toggleModal}
                >
                    Tambah Data
                </button>
            </div>
            <div className='w-full overflow-x-scroll xl:overflow-x-hidden'>
                <Table>
                    <TableHead>
                        <TableCol>Tanggal</TableCol>
                        <TableCol>Nama</TableCol>
                        <TableCol>Alamat</TableCol>
                        <TableCol>Tipe Transaksi</TableCol>
                        <TableCol>Jumlah</TableCol>
                        <TableCol></TableCol>
                    </TableHead>

                    <TableBody>
                        {transactions.map((trx, index) => {
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
                                    <TableCell>
                                        {trx.guest
                                            ? trx.guest.name
                                            : trx._nasabah.name}
                                    </TableCell>
                                    <TableCell>
                                        {trx.guest
                                            ? trx.guest.address
                                            : trx._nasabah.address}
                                    </TableCell>
                                    <TableCell>
                                        {trx.transactionType}{" "}
                                        {trx.transactionType == "saving"
                                            ? `(${trx._nasabah.rekening})`
                                            : ""}
                                    </TableCell>

                                    <TableCell>
                                        {new Intl.NumberFormat("id-ID", {
                                            style: "currency",
                                            currency: "IDR",
                                        }).format(
                                            trx.items.reduce((tot, item) => {
                                                return (
                                                    tot + item.price * item.qty
                                                );
                                            }, 0)
                                        )}
                                    </TableCell>
                                    <TableCell className='float-right'>
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

export async function getStaticProps() {
    const res = await fetch("http://localhost:3000/api/priceList");
    const priceList = await res.json();
    return {
        props: {
            priceList,
        },
    };
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
