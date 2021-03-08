<<<<<<< HEAD
import AdminLayout from "../../components/Layouts/AdminLayout";
import Head from "next/head";

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
                <div className='md:flex py-4 text-center  md:justify-between px-16'>
                    <div className='space-y-4'>
                        <h3 className='text-gray-500 my-2'>Tabungan</h3>
                        <div className='flex space-x-4 justify-center items-center'>
                            <div className='w-20 p-4 rounded-full bg-green-300'>
                                <img
                                    src='/logo/cash-deposit.svg'
                                    alt='deposit'
                                />
                            </div>
                            <div className='font-bold text-3xl'>1.7M</div>
                        </div>
                    </div>
                    <div className='space-y-4'>
                        <h3 className='text-gray-500 my-2'>Nasabah</h3>
                        <div className='flex space-x-4 justify-center items-center'>
                            <div className='w-20 p-4 rounded-full bg-yellow-300'>
                                <img src='/logo/team.svg' alt='Nasabah' />
                            </div>
                            <div className='font-bold text-3xl'>2K</div>
                        </div>
                    </div>
                    <div className='space-y-4'>
                        <h3 className='text-gray-500 my-2'>Kontan</h3>
                        <div className='flex space-x-4 justify-center items-center'>
                            <div className='w-20 p-4 rounded-full bg-red-300'>
                                <img
                                    src='/logo/money-transaction.svg'
                                    alt='uang keluar'
                                />
                            </div>
                            <div className='font-bold text-3xl'>1.7M</div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Dashboard;
=======
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
>>>>>>> main
