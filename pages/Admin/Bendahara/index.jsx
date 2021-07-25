import * as Icons from "heroicons-react";
import { formatRp } from "@helpers/functions";
import Layout from "@components/Layouts/BhrLayout";
import DashboardCard from "@components/DashboardCard";
import Head from "next/head";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableCol,
} from "@components/Table";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/client";
export default function Index({
  sampahTransaction,
  bankTransaction,
  nasabahProfile,
}) {
  const getTunai = () => {
    const filter = sampahTransaction.results.filter(
      (trx) => trx.transactionType == "CASH"
    );
    const total = filter.reduce((p, c) => {
      const sum = c.items.reduce((tot, item) => {
        return tot + item.price * item.qty;
      }, 0);
      return p + sum;
    }, 0);
    return total;
  };

  const getTabungan = () => {
    const filter = sampahTransaction.results.filter(
      (trx) => trx.transactionType == "TABUNG"
    );
    const total = filter.reduce((p, c) => {
      const sum = c.items.reduce((tot, item) => {
        return tot + item.price * item.qty;
      }, 0);
      return p + sum;
    }, 0);
    return total;
  };
  const getPenjualan = () => {
    const filter = sampahTransaction.results.filter(
      (trx) => trx.transactionType == "PENJUALAN"
    );
    const total = filter.reduce((p, c) => {
      const sum = c.items.reduce((tot, item) => {
        return tot + item.price * item.qty;
      }, 0);
      return p + sum;
    }, 0);
    return total;
  };

  const getPenarikan = () => {
    const filter = bankTransaction.results.filter(
      (trx) => trx.transactionType == "KREDIT" && trx.status == "SUCCESS"
    );
    const total = filter.reduce((p, c) => {
      return p + c.amount;
    }, 0);
    return total;
  };

  const getPemasukan = () => {
    const filter = bankTransaction.results.filter(
      (trx) => trx.transactionType == "DEBIT" && trx.status == "SUCCESS"
    );
    const total = filter.reduce((p, c) => {
      return p + c.amount;
    }, 0);
    return total;
  };

  const getNasabah = () => {
    const total = nasabahProfile.results.length;

    return total;
  };

  return (
    <Layout>
      <Head>
        <title>Dashboard - Bank Sampah Banyuwangi</title>
      </Head>
      <h1 className='text-4xl mb-5'>Dashboard</h1>
      <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full'>
        <DashboardCard
          borderColor='border-yellow-400'
          textColor='text-yellow-500'
          icon={<Icons.UserGroup className='text-yellow-500' size='100%' />}
          title='Nasabah Terdaftar'
          value={getNasabah()}
        />
        <DashboardCard
          borderColor='border-red-400'
          textColor='text-red-500'
          icon={<Icons.ArrowUp className='text-red-500' size='100%' />}
          title='Total Kredit'
          value={formatRp(getPenarikan())}
        />
        <DashboardCard
          borderColor='border-green-400'
          textColor='text-green-500'
          icon={
            <Icons.ArrowDown className='text-green-500 text-5xl' size='100%' />
          }
          title='Total Debit'
          value={formatRp(getPemasukan())}
        />
        <DashboardCard
          borderColor='border-blue-400'
          textColor='text-blue-500'
          icon={
            <Icons.CashOutline className='text-blue-500 text-5xl' size='100%' />
          }
          title='Saldo Total Nasabah'
          value={formatRp(getPemasukan() - getPenarikan())}
        />
      </div>

      <div className='pt-5'>
        <h1 className='text-2xl mb-4'>Transaksi Admin Gudang</h1>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-full'>
          <DashboardCard
            borderColor='border-gray-400'
            textColor='text-gray-700'
            icon={<Icons.ShoppingCart className='text-gray-700' size='100%' />}
            title='Total Tunai'
            value={formatRp(getTunai())}
          />
          <DashboardCard
            borderColor='border-gray-400'
            textColor='text-gray-700'
            icon={<Icons.Save className='text-gray-700 text-5xl' size='100%' />}
            title='Total Tabung'
            value={formatRp(getTabungan())}
          />
          <DashboardCard
            borderColor='border-gray-400'
            textColor='text-gray-700'
            icon={
              <Icons.CashOutline
                className='text-gray-700 text-5xl'
                size='100%'
              />
            }
            title='Total Penjualan Sampah'
            value={formatRp(getPenjualan())}
          />
        </div>
      </div>
      <div className='pt-5'>
        <h1 className='text-2xl mb-4'>Transaksi Penjualan</h1>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-full'>
          <DashboardCard
            borderColor='border-gray-400'
            textColor='text-gray-700'
            icon={<Icons.TrendingUp className='text-gray-700' size='100%' />}
            title='Total Penjualan Kompos'
            value={formatRp(getTunai())}
          />
          <DashboardCard
            borderColor='border-gray-400'
            textColor='text-gray-700'
            icon={
              <Icons.TrendingUp
                className='text-gray-700 text-5xl'
                size='100%'
              />
            }
            title='Total Penjualan Rumah Kreatif'
            value={formatRp(getTabungan())}
          />
        </div>
      </div>
    </Layout>
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
    `${process.env.NEXT_PUBLIC_API_HOST}/api/sampahTransaction`
  );
  const sampahTransaction = await res.json();

  const res2 = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/bankTransaction`
  );
  const bankTransaction = await res2.json();

  const res3 = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/nasabahProfile`
  );
  const nasabahProfile = await res3.json();

  return {
    props: {
      sampahTransaction,
      bankTransaction,
      nasabahProfile,
    },
  };
}
