import {
    UserGroupOutline,
    UserAddOutline,
    SwitchVerticalOutline,
    PlusOutline,
    CashOutline,
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

export default function Index() {
    return (
        <AdminLayout>
            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4'>
                <DashboardCard
                    borderColor='border-red-400'
                    textColor='text-red-500'
                    icon={
                        <SwitchVerticalOutline
                            className='text-red-500'
                            size='100%'
                        />
                    }
                    title='Total Pengeluaran Tunai'
                    value='Rp. 353365959'
                />
                <DashboardCard
                    borderColor='border-green-400'
                    icon={
                        <CashOutline
                            className='text-green-500 text-5xl'
                            size='100%'
                        />
                    }
                    title='Total Pemasukan Bank'
                    value='Rp. 353365959'
                />
                <DashboardCard
                    borderColor='border-blue-400'
                    icon={
                        <CashOutline
                            className='text-blue-500 text-5xl'
                            size='100%'
                        />
                    }
                    title='Total Sampah Masuk'
                    value='562623 Kg'
                />
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5'>
                <div className='md:col-span-2'>
                    <div className='bg-white rounded shadow-md'>
                        <div className='p-5'>
                            <h1 className='text-gray-800 font-bold'>
                                Transaksi Sampah Terbaru
                            </h1>
                        </div>
                        <div>
                            <div class='mx-auto bg-white dark:bg-gray-800 dark:bg-gray-800 shadow rounded'>
                                <div class='w-full overflow-x-scroll xl:overflow-x-hidden'>
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
