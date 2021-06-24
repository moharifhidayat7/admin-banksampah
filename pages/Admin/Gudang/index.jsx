import {
    UserGroupOutline,
    UserAddOutline,
    SwitchVerticalOutline,
    PlusOutline,
    TrendingDown,
    TrendingUp,
    CashOutline,
    ShoppingCart,
    Save,
} from "heroicons-react";

import AdminLayout from "../../../components/Layouts/AdminLayout";
import DashboardCard from "../../../components/DashboardCard";
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableCol,
} from "../../../components/Table";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/client";
export default function Index({ sampahPurchase, transfer }) {
    const [tunai, setTunai] = useState(0);
    const [tabungan, setTabungan] = useState(0);
    const [pemasukan, setPemasukan] = useState(0);
    const [stok, setStok] = useState([]);
    const getTunai = () => {
        const filter = sampahPurchase.filter(
            (trx) => trx.transactionType == "CASH"
        );
        const total = filter.reduce((p, c) => {
            const sum = c.items.reduce((tot, item) => {
                return tot + item._sampahType.price * item.qty;
            }, 0);
            return p + sum;
        }, 0);
        setTunai(total);
    };

    const getTabungan = () => {
        const filter = sampahPurchase.filter(
            (trx) => trx.transactionType == "TABUNG"
        );
        const total = filter.reduce((p, c) => {
            const sum = c.items.reduce((tot, item) => {
                return tot + item._sampahType.price * item.qty;
            }, 0);
            return p + sum;
        }, 0);
        setTabungan(total);
    };
    const getTransfer = () => {
        const total = transfer.reduce((p, c) => {
            return p + c.amount;
        }, 0);

        setPemasukan(total);
    };

    const getStok = async () => {
        const result = await fetch(
            `${process.env.NEXT_PUBLIC_API_HOST}/api/stok`
        );
        setStok(await result.json());
    };

    const formatRp = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(number);
    };
    useEffect(() => {
        getStok();
        getTunai();
        getTabungan();
        getTransfer();
    }, []);

    return (
        <AdminLayout>
            <h1 className='text-4xl mb-5'>Dashboard</h1>
            <div className='grid grid-cols-3 gap-4 w-full'>
                <div className='col-span-2'>
                    <h1 className='text-2xl mb-4'>Transaksi Admin Gudang</h1>
                    <div className='grid grid-cols-2 gap-4'>
                        <DashboardCard
                            borderColor='border-red-400'
                            textColor='text-red-500'
                            icon={
                                <ShoppingCart
                                    className='text-red-500'
                                    size='100%'
                                />
                            }
                            title='Total Pembelian Tunai'
                            value={formatRp(tunai)}
                        />
                        <DashboardCard
                            borderColor='border-green-400'
                            textColor='text-green-500'
                            icon={
                                <Save
                                    className='text-green-500 text-5xl'
                                    size='100%'
                                />
                            }
                            title='Total Transaksi Tabungan'
                            value={formatRp(tabungan)}
                        />
                        {/* <DashboardCard
                            borderColor='border-blue-400'
                            icon={
                                <CashOutline
                                    className='text-blue-500 text-5xl'
                                    size='100%'
                                />
                            }
                            title='Saldo Gudang'
                            value={formatRp(pemasukan - tunai)}
                        /> */}
                    </div>
                </div>
                <div>
                    <h1 className='text-2xl mb-4'>Stok Sampah Gudang</h1>
                    <div>
                        <Table>
                            <TableHead>
                                <TableCol>Jenis Sampah</TableCol>
                                <TableCol>Qty</TableCol>
                            </TableHead>

                            <TableBody>
                                {stok.length > 0 &&
                                    stok.map((item) => {
                                        return (
                                            <TableRow key={item._id}>
                                                <TableCell>
                                                    {item.type}
                                                </TableCell>
                                                <TableCell>
                                                    {item.cashQty +
                                                        item.tabungQty}{" "}
                                                    {item.denom}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 hidden'>
                <div className='md:col-span-2'>
                    <div className='bg-white rounded shadow-md'>
                        <div className='p-5'>
                            <h1 className='text-gray-800 font-bold'>
                                Transaksi Sampah Terbaru
                            </h1>
                        </div>
                        <div>
                            <div className='mx-auto bg-white dark:bg-gray-800 dark:bg-gray-800 shadow rounded'>
                                <div className='w-full overflow-x-scroll xl:overflow-x-hidden'>
                                    <Table>
                                        <TableHead>
                                            <TableCol>No</TableCol>
                                            <TableCol>Tipe Transaksi</TableCol>
                                            <TableCol>Nasabah</TableCol>
                                            <TableCol>Uang</TableCol>
                                            <TableCol>Waktu Transaksi</TableCol>
                                        </TableHead>

                                        <TableBody>
                                            <TableRow>
                                                <TableCell>NASABAH</TableCell>
                                                <TableCell>NASABAH</TableCell>
                                                <TableCell>NASABAH</TableCell>
                                                <TableCell>NASABAH</TableCell>
                                                <TableCell>NASABAH</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='bg-white rounded shadow-md hidden sm:hidden md:hidden lg:block'>
                        <div className='border-gray-300 border-b p-5'>
                            <h1 className='text-gray-800 font-bold'>
                                Notifikasi Jemput Sampah
                            </h1>
                        </div>
                        <div>
                            <div className='flex items-center space-x-5 px-5 py-2 bg-yellow-100 border-gray border-b'>
                                <div className='flex-grow'>
                                    <small className='font-bold'>
                                        Jemput Sampah
                                    </small>
                                    <span className='text-xs ml-2 text-gray'>
                                        2 jam yang lalu
                                    </span>
                                    <div>
                                        <small>
                                            Dusun Kampunganyar RT 02 RW 05 Desa
                                            Gumuk, Kecamatan Licin
                                        </small>
                                    </div>
                                </div>
                                <div className='flex-none'>
                                    <button className='text-xs rounded bg-green-500 text-white py-1 px-2'>
                                        X
                                    </button>
                                </div>
                            </div>
                            <div className='flex items-center space-x-5 px-5 py-2 border-gray border-b'>
                                <div className='flex-grow'>
                                    <small className='font-bold'>
                                        Jemput Sampah
                                    </small>
                                    <span className='text-xs ml-2 text-gray'>
                                        2 jam yang lalu
                                    </span>
                                    <br />
                                    <small>
                                        Dusun Kampunganyar RT 02 RW 05 Desa
                                        Gumuk, Kecamatan Licin
                                    </small>
                                </div>
                                <div className='flex-none'></div>
                            </div>
                            <div className='flex items-center space-x-5 px-5 py-2 border-gray border-b'>
                                <div className='flex-grow'>
                                    <small className='font-bold'>
                                        Jemput Sampah
                                    </small>
                                    <span className='text-xs ml-2 text-gray'>
                                        2 jam yang lalu
                                    </span>
                                    <br />
                                    <small>
                                        Dusun Kampunganyar RT 02 RW 05 Desa
                                        Gumuk, Kecamatan Licin
                                    </small>
                                </div>
                                <div className='flex-none'></div>
                            </div>
                            <div className='text-center text-sm p-4'>
                                Lihat Semua Notifikasi
                            </div>
                        </div>
                    </div>
                </div>
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
        `${process.env.NEXT_PUBLIC_API_HOST}/api/sampahPurchase`
    );
    const sampahPurchase = await res.json();

    const res2 = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/api/transfer?to=Gudang`
    );
    const transfer = await res2.json();

    return {
        props: {
            sampahPurchase,
            transfer,
        },
    };
}
