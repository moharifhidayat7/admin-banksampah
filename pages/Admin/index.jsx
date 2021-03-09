import AdminLayout from "../../components/Layouts/AdminLayout";
import Head from "next/head";
import Card from "./Card";

const Dashboard = () => {
    return (
        <AdminLayout>
            <Head>
                <title>Dashboard</title>
            </Head>
            <div className='shadow-md cardbg rounded-md  divide-y divide-fuchsia-300 '>
                <div className='px-5 py-2 text-gray-500 text-lg font-bold'>
                    Dashboard Card
                </div>
                <div className="md:flex justify-center md:space-x-4 lg:space-x-16 space-y-16 md:space-y-0">
        <Card
          gambar="/logo/cash-deposit.svg"
          warna="bg-green-200"
          alt="tabungan"
          judul="Tabungan"
          total="Rp. 200000"
        />
        <Card
          gambar="/logo/team.svg"
          warna="bg-blue-200"
          alt="Nasabah"
          judul="Nasabah"
          total="Rp. 37189"
        />
        <Card
          gambar="/logo/money-transaction.svg"
          warna="bg-red-200"
          alt="Kontan"
          judul="Kontan"
          total="Rp. 7189"
        />
      </div>
            </div>
        </AdminLayout>
    );
};

export default Dashboard;