import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

const ClientNav = ({ text, route }) => {
    const router = useRouter();

    const classList =
        router.pathname === route
            ? "ring-green-500 bg-green-300"
            : "hover:bg-green-100 ring-gray-400 hover:bg-green-100 hover:ring-green-500 ";

    return (
        <Link href={route}>
            <a
                role='button'
                className={`uppercasefont-medium px-2 py-2 ring-2 focus:outline-none ${classList}`}
            >
                {text}
            </a>
        </Link>
    );
};

export default function ClientLayout({ children }) {
    return (
        <div className='flex items-center justify-center h-screen'>
            <Head>
                <title>Bank Sampah</title>
            </Head>
            <div className='w-full min-w-min md:w-1/2 mx-5'>
                <div className='bg-white rounded shadow p-5 mb-5 flex justify-between'>
                    <div className='flex space-x-4'>
                        <ClientNav
                            route='/Client/Gudang'
                            text='Halaman Utama'
                        />
                        <ClientNav
                            route='/Client/Gudang/PembelianSampah'
                            text='Pembelian'
                        />
                    </div>
                    <div className='uppercase font-medium flex items-center'>
                        Login
                    </div>
                </div>
                <div className='h-80 block bg-white rounded shadow p-5'>
                    {children}
                </div>
            </div>
        </div>
    );
}
