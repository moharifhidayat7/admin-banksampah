import React from "react";
import MenuSidebar from "./MenuSidebar";


export default function Sidebar(props) {
  return (
    <div
      hidden={props.sidebr}
      className="left-0 z-10 fixed shadow-lg w-72 bg-white h-full pt-16 overflow-y-auto"
    >
      <div className="ml-8 p-2 h-full mr-4  overflow-x-hidden">
        <h3 className=" font-bold text-blue-700 mb-2">MENU</h3>

        <MenuSidebar
        href='/Admin/Dashboard'
          menu="Dashboard"
          icon="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          submenu={["Card Pemasukan", "Card Pengeluaran", "Total"]}
        />

        <MenuSidebar
        href='/'
          menu="Nasabah"
          icon="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          submenu={["Pesan Masuk", "Konfirmasi", "Detail Nasabah"]}
        />

        <MenuSidebar
        href='/'
          menu="Pemasukan"
          icon="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          submenu={["Input Pemasukan", "Detail Pemasukan", "Total Pemasukan"]}
        />
        <MenuSidebar
        href='/Auth/login'
          menu="Pengeluaran"
          icon="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
          submenu={[
            "Input Pengeluaran",
            "Detail Pengeluaran",
            "Total Pengeluaran",
          ]}
        />

        <footer className=" mt-8 pb-2 text-center   text-sm italic">
          Browser Suport
          <div className="flex space-x-2 items-center justify-center">
            <img className="w-4" src="/chrome.png" alt="crome" />
            <img className="w-4" src="/internet-explorer.png" alt="explorer" />
            <img className="w-4" src="/mozilla.png" alt="mozilla" />
          </div>
        </footer>
      </div>
    </div>
  );
}
