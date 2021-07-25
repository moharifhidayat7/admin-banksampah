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
import { formatRp } from "@helpers/functions";
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
export default function Index({ sampahTransaction }) {
  const getTunai = () => {
    const filter = sampahTransaction.results.filter(
      (trx) => trx.transactionType == "CASH"
    );
    const total = filter.reduce((p, c) => {
      const sum = c.items.reduce((tot, item) => {
        return tot + item._sampahType.price * item.qty;
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
        return tot + item._sampahType.price * item.qty;
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
        return tot + item._sampahType.price * item.qty;
      }, 0);
      return p + sum;
    }, 0);
    return total;
  };

  return (
    <AdminLayout>
      <h1 className='text-4xl mb-5'>Dashboard</h1>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-full'>
        <DashboardCard
          borderColor='border-red-400'
          textColor='text-red-500'
          icon={<ShoppingCart className='text-red-500' size='100%' />}
          title='Total Pembelian Tunai'
          value={formatRp(getTunai())}
        />
        <DashboardCard
          borderColor='border-green-400'
          textColor='text-green-500'
          icon={<Save className='text-green-500 text-5xl' size='100%' />}
          title='Total Pembelian Tabungan'
          value={formatRp(getTabungan())}
        />
        <DashboardCard
          borderColor='border-blue-400'
          textColor='text-blue-500'
          icon={<CashOutline className='text-blue-500 text-5xl' size='100%' />}
          title='Total Penjualan Sampah'
          value={formatRp(getPenjualan())}
        />
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
    `${process.env.NEXT_PUBLIC_API_HOST}/api/sampahTransaction`
  );
  const sampahTransaction = await res.json();

  return {
    props: {
      sampahTransaction,
    },
  };
}
