import Head from "next/head";
export default function ClientLayout({ children }) {
    return (
        <div className='flex items-center justify-center h-screen'>
            <Head>
                <title>Bank Sampah</title>
            </Head>
            <div className='w-1/2'>
                <div className='bg-white rounded shadow p-5 mb-5'>menu</div>
                <div className='h-80 block bg-white rounded shadow p-5'>
                    content
                </div>
            </div>
        </div>
    );
}
