import BhrLayout from "../../../components/Layouts/BhrLayout";

import DashboardCard from "../../../components/DashboardCard";
import {
    UserGroupOutline,
    UserAddOutline,
    SwitchVerticalOutline,
    PlusOutline,
    CashOutline,
} from "heroicons-react";

import { useState, useEffect } from "react";

function index({ transactions }) {
    const [tunai, setTunai] = useState(0);
    const [tabungan, setTabungan] = useState(0);
    const [pemasukan, setPemasukan] = useState(0);

    const getTunai = () => {
        const filter = transactions.filter(
            (trx) => trx.transactionType == "cash"
        );
        const total = filter.reduce((p, c) => {
            const sum = c.items.reduce((tot, item) => {
                return tot + item.price * item.qty;
            }, 0);
            return p + sum;
        }, 0);
        setTunai(total);
    };

    const getTabungan = () => {
        const filter = transactions.filter(
            (trx) => trx.transactionType == "saving"
        );
        const total = filter.reduce((p, c) => {
            const sum = c.items.reduce((tot, item) => {
                return tot + item.price * item.qty;
            }, 0);
            return p + sum;
        }, 0);
        setTabungan(total);
    };

    const getPemasukan = () => {
        const filter = transactions.filter(
            (trx) =>
                trx.transactionType == "pemasukan" ||
                trx.transactionType == "penjualan"
        );
        const total = filter.reduce((p, c) => {
            return p + c.amount;
        }, 0);

        setPemasukan(total);
    };

    const formatRp = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(number);
    };

    useEffect(() => {
        getTunai();
        getTabungan();
        getPemasukan();
    }, []);
    return (
        <BhrLayout>
            <h1 className='text-2xl mb-4'>Transaksi Admin Gudang</h1>
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
                    title='Total Pembelian Tunai Sampah'
                    value={formatRp(tunai)}
                />
                <DashboardCard
                    borderColor='border-green-400'
                    icon={
                        <CashOutline
                            className='text-green-500 text-5xl'
                            size='100%'
                        />
                    }
                    title='Total Saldo Tabungan Nasabah'
                    value={formatRp(tabungan)}
                />
                <DashboardCard
                    borderColor='border-blue-400'
                    icon={
                        <CashOutline
                            className='text-blue-500 text-5xl'
                            size='100%'
                        />
                    }
                    title='Saldo Gudang'
                    value={formatRp(pemasukan - tunai - tabungan)}
                />
            </div>
            <div>
                <h1 className='text-2xl mt-4'>
                    Transaksi Admin Penjualan Produk
                </h1>
            </div>
        </BhrLayout>
    );
}

export async function getServerSideProps() {
    const res = await fetch("http://localhost:3000/api/sampahTransaction");
    const transactions = await res.json();
    return {
        props: {
            transactions,
        },
    };
}

export default index;
