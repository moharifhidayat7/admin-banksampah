import Layout from "./React-components/Layout";
export default function Dashboard() {
  return (
    <Layout title="Dashboard">
      <div className="p-2 mt-8 mb-4 shadow-lg rounded-lg text-pink-200 font-light items-center w-12 bg-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      </div>
      <div className="shadow-md cardbg rounded-md  divide-y divide-fuchsia-300 ">
        <div className="px-5 py-2 text-gray-500 text-lg font-bold">
          Dashboard Card
        </div>
        <div className="md:flex py-4 w-full text-center  md:justify-between px-16">
          <div className="space-y-4">
            <h3 className="text-gray-500 my-2">Uang Masuk</h3>
            <div className="flex space-x-4 justify-center items-center">
              <div className="w-20 p-4 rounded-full bg-green-300">
                <img src="/cash-deposit.svg" alt="deposit" />
              </div>
              <div className="font-bold text-3xl">1.7M</div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-gray-500 my-2">Nasabah</h3>
            <div className="flex space-x-4 justify-center items-center">
              <div className="w-20 p-4 rounded-full bg-yellow-300">
                <img src="/team.svg" alt="Nasabah" />
              </div>
              <div className="font-bold text-3xl">2K</div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-gray-500 my-2">Uang Keluar</h3>
            <div className="flex space-x-4 justify-center items-center">
              <div className="w-20 p-4 rounded-full bg-red-300">
                <img src="/money-transaction.svg" alt="uang keluar" />
              </div>
              <div className="font-bold text-3xl">1.7M</div>
            </div>
          </div>
        </div>
        <div className="font-extrabold font-mono text-center py-2">
          Tampilkan Lebih Banyak
          <div className=" flex justify-center">
            <img
              className="w-4 animate-bounce pt-1"
              src="/down-arrow.svg"
              alt="downarrow"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
