import BhrLayout from "../../components/Layouts/BhrLayout";
import Head from "next/head";
import Card from "../../components/Card";
function index() {
   return (
      <BhrLayout>
         <Head>
            <title>Dashboard</title>
         </Head>
         <div className="md:flex md:space-x-8 md:pl-20 lg:pl-0 space-y-20 md:space-y-0  pb-4 justify-center">
            <Card
               gambar="/logo/cash-deposit.svg"
               warna="bg-green-200"
               alt="Pemasukan"
               judul="Pemasukan"
               total="Rp. 200000"
               lebar="w-80"
            />
            <Card
               gambar="/logo/team.svg"
               warna="bg-blue-200"
               alt="Nasabah"
               judul="Nasabah"
               total="100 Nasabah"
               lebar="w-80"
            />
            <Card
               gambar="/logo/money-transaction.svg"
               warna="bg-red-200"
               alt="Pengeluaran"
               judul="Pengeluaran"
               total="Rp. 7189"
               lebar="w-80"
            />
         </div>
      </BhrLayout>
   );
}

export default index;
