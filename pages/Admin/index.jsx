import Card from "./Card";
import Layout from "./React-components/Layout";
export default function Dashboard() {
  return (
    <Layout title="Dashboard">
      <div className="p-2  mb-8 shadow-lg rounded-lg text-pink-200 font-light items-center w-12 bg-white">
        <img src="/logo/home.png" alt="home" />
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
    </Layout>
  );
}
