import ClientLayout from "../../../components/Layouts/ClientLayout";
import * as Icons from "heroicons-react";
import PenjualanSampahModal from "../../../components/Modals/PenjualanSampahModal";
import PembelianSampahModal from "../../../components/Modals/PembelianSampahModal";
import { useState } from "react";

export default function index({ sampahType, sampahPurchase }) {
    const [modal, setModal] = useState(false);
    const [modalP, setModalP] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };
    const toggleModalP = () => {
        setModalP(!modalP);
    };

    const formatRp = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(number);
    };

    return (
        <ClientLayout>
            <PenjualanSampahModal
                toggleModal={toggleModal}
                modal={modal}
                sampahType={sampahType}
            ></PenjualanSampahModal>
            <PembelianSampahModal
                toggleModal={toggleModalP}
                modal={modalP}
                sampahType={sampahType}
            ></PembelianSampahModal>
            <div className='grid grid-cols-3 gap-8'>
                <div className='col-span-2 relative'>
                    <h3 className='uppercase font-medium mb-3'>
                        Transaksi Hari ini
                    </h3>
                    <div className='grid grid-cols-2 grid-rows-2 gap-4 h-full'>
                        <div className='p-5 ring-1 bg-gray-100 text-center rounded-lg'>
                            <div className=''>Pembelian Tunai</div>
                            <div className='text-2xl'>
                                {formatRp(
                                    sampahPurchase.cash.reduce((total, trx) => {
                                        return (
                                            total +
                                            trx.items.reduce((tot, item) => {
                                                return (
                                                    tot +
                                                    item._sampahType.price *
                                                        item.qty
                                                );
                                            }, 0)
                                        );
                                    }, 0)
                                )}
                            </div>
                        </div>
                        <div className='p-5 ring-1 bg-gray-100 text-center rounded-lg'>
                            <div className=''>Transaksi Tunai</div>
                            <div className='text-2xl'>
                                {sampahPurchase.cash.length} Transaksi
                            </div>
                        </div>
                        <div className='p-5 ring-1 bg-gray-100 text-center rounded-lg'>
                            <div className=''>Tabungan</div>
                            <div className='text-2xl'>
                                {formatRp(
                                    sampahPurchase.tabung.reduce(
                                        (total, trx) => {
                                            return (
                                                total +
                                                trx.items.reduce(
                                                    (tot, item) => {
                                                        return (
                                                            tot +
                                                            item._sampahType
                                                                .price *
                                                                item.qty
                                                        );
                                                    },
                                                    0
                                                )
                                            );
                                        },
                                        0
                                    )
                                )}
                            </div>
                        </div>
                        <div className='p-5 ring-1 bg-gray-100 text-center rounded-lg'>
                            <div className=''>Transaksi Tabungan</div>
                            <div className='text-2xl'>
                                {sampahPurchase.tabung.length} Transaksi
                            </div>
                        </div>
                    </div>
                </div>
                <div className=''>
                    <h3 className='uppercase font-medium mb-3'>AKSI</h3>
                    <div className='space-y-4'>
                        <button
                            onClick={toggleModalP}
                            className='text-white px-2 block w-full py-3 bg-red-500 hover:bg-red-800 uppercase font-medium rounded-lg focus:outline-none'
                        >
                            <span className='align-middle'>Beli Sampah</span>
                        </button>
                        <button
                            onClick={toggleModal}
                            className='text-white px-2 focus:outline-none block w-full py-3 bg-green-500 hover:bg-green-800 uppercase font-medium rounded-lg'
                        >
                            <span className='align-middle'>Jual Sampah</span>
                        </button>
                    </div>
                </div>
            </div>
        </ClientLayout>
    );
}

export async function getServerSideProps() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/api/sampahType`
    );
    const sampahType = await res.json();
    const res2 = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/api/sampahPurchase?client`
    );
    const sampahPurchase = await res2.json();
    return {
        props: {
            sampahType,
            sampahPurchase,
        },
    };
}
