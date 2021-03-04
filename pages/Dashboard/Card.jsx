import React from "react";

export default function Card() {
  return (
    <div className="shadow-md cardbg rounded-md overflow-hidden divide-y divide-fuchsia-300 ">
      <div className="px-5 py-2 text-gray-500 text-lg font-bold">
        Dashboard Card
      </div>
      <div className="flex py-4 justify-between px-16">
        <div className=" ">
          <h3 className="text-gray-500 py-2">Pengeluaran Cash</h3>
          <div className="flex space-x-4 items-center">
            <div className="w-20 p-4 rounded-full bg-green-300">
              <img src="cash-deposit.svg" alt="" />
            </div>
            <div className="font-bold text-3xl">1.7M</div>
          </div>
        </div>
        <div>Ditabungkan</div>
      </div>
      <div>Footer</div>
    </div>
  );
}
