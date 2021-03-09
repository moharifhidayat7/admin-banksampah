import AdminLayout from "../../components/Layouts/AdminLayout";
import Head from "next/head";
import Card from "./Card";

const Dashboard = () => {
  return (
    <AdminLayout>
      <Head>
        
        <title>Dashboard</title>
      </Head>
      <div className="flex space-x-8 justify-center">
   
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
    </AdminLayout>
  );
};

export default Dashboard;
