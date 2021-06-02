import ClientLayout from "../../../components/Layouts/ClientLayout";
import * as Icons from "heroicons-react";

export default function index() {
    return (
        <ClientLayout>
            <div className='grid grid-cols-3 gap-8'>
                <div className='col-span-2 relative'>
                    <h3 className='uppercase font-medium mb-3'>
                        Transaksi Hari ini
                    </h3>
                    <div className='grid grid-cols-2 grid-rows-2 gap-4 h-full'>
                        <div className='p-5 ring-1 bg-gray-100 text-center rounded-lg'>
                            <div className=''>Total Pembelian</div>
                            <div className='text-2xl'>Rp. 250.000,-</div>
                        </div>
                        <div className='p-5 ring-1 bg-gray-100 text-center rounded-lg'>
                            <div className=''>Transaksi Pembelian</div>
                            <div className='text-2xl'>60 Transaksi</div>
                        </div>
                        <div className='p-5 ring-1 bg-gray-100 text-center rounded-lg'>
                            <div className=''>Total Tabungan</div>
                            <div className='text-2xl'>Rp. 250.000,-</div>
                        </div>
                        <div className='p-5 ring-1 bg-gray-100 text-center rounded-lg'>
                            <div className=''>Transaksi Tabungan</div>
                            <div className='text-2xl'>60 Transaksi</div>
                        </div>
                    </div>
                </div>
                <div className=''>
                    <h3 className='uppercase font-medium mb-3'>AKSI</h3>
                    <div className='space-y-4'>
                        <button className='text-white px-2 block w-full py-3 bg-red-500 hover:bg-red-800 uppercase font-medium rounded-lg focus:outline-none'>
                            <span className='align-middle'>Beli Sampah</span>
                        </button>
                        <button className='text-white px-2 focus:outline-none block w-full py-3 bg-green-500 hover:bg-green-800 uppercase font-medium rounded-lg'>
                            <span className='align-middle'>Jual Sampah</span>
                        </button>
                    </div>
                </div>
            </div>
        </ClientLayout>
    );
}
