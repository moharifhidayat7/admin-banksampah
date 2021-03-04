import React from "react";

export default function Card() {
  return (
    <div className="shadow-md cardbg rounded-md  divide-y divide-fuchsia-300 ">
      <div className="px-5 py-2 text-gray-500 text-lg font-bold">
        Dashboard Card
      </div>
      <div className="flex py-4 justify-between px-12 md:px-16">
        <div className="">
          <h3 className="text-gray-500 mb-2">Uang Masuk</h3>
          <div className="flex space-x-4 items-center">
            <div className="w-20 p-4 rounded-full bg-green-300">
              <img src="cash-deposit.svg" alt="deposit" />
            </div>
            <div className="font-bold text-3xl">1.7M</div>
          </div>
        </div>
        <div className="">
          <h3 className="text-gray-500 mb-2">Uang Keluar</h3>
          <div className="flex space-x-4 items-center">
            <div className="w-20 p-4 rounded-full bg-red-300">
              <img src="money-transaction.svg" alt="uang keluar" />
            </div>
            <div className="font-bold text-3xl">1.7M</div>
          </div>
        </div>
        <div className="">
          <h3 className="text-gray-500 mb-2">Uang Keluar</h3>
          <div className="flex space-x-4 items-center">
            <div className="w-20 p-4 rounded-full bg-red-300">
              <img src="money-transaction.svg" alt="uang keluar" />
            </div>
            <div className="font-bold text-3xl">1.7M</div>
          </div>
        </div>
      </div>
      <div className="font-extrabold font-mono text-center py-2">
        Tampilkan Lebih Banyak
        <div className=" flex justify-center">
          <img className="w-4 animate-bounce pt-1" src="down-arrow.svg" alt="downarrow" />
        </div>
      </div>
    </div>
  );
}
