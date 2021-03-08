import React from "react";
import MenuSidebar from "./MenuSidebar";

export default function Sidebar(props) {
  return (
    <div
      hidden={props.sidebr}
      className="left-0 z-10 fixed shadow-lg w-72 bg-white h-full pt-16 overscroll-contain"
    >
      <div className="ml-8 p-2 h-full mr-4  overflow-x-hidden">
        <h3 className=" font-bold text-blue-700 mb-2">MENU</h3>

        <MenuSidebar
          href="/Admin"
          menu="Dashboard"
          icon="/logo/home.png"
          submenu={[
            { subtex: "Total Nasabah", ref: "" },
            { subtex: "Total Tabungan", ref: "" },
            { subtex: "Total Kontan", ref: "" },
          ]}
        />

        <MenuSidebar
          href="/Admin/Nasabah"
          menu="Nasabah"
          icon="/logo/team.svg"
          submenu={[
            { subtex: "Detail Nasabah", ref: "" },
            { subtex: "Kelompok", ref: "" },
            { subtex: "Perorangan", ref: "" },
          ]}
        />
        <MenuSidebar
          href="/Admin/Pembelian"
          menu="Pembelian"
          icon="/logo/shopping-bag.png"
          submenu={[
            { subtex: "Pembelian Sampah", ref: "" },
            { subtex: "Detail Transaksi", ref: "" },
          ]}
        />

        <MenuSidebar
          href="/Admin/Sampah"
          menu="Sampah"
          icon="/logo/recycling.png"
          submenu={[
            { subtex: "Input Sampah", ref: "" },
            { subtex: "Detail Sampah", ref: "" },
          ]}
        />

        <footer className=" mt-8 pb-2 text-center   text-sm italic">
          Browser Suport
          <div className="flex space-x-2 items-center justify-center">
            <img className="w-4" src="/logo/chrome.png" alt="crome" />
            <img
              className="w-4"
              src="/logo/internet-explorer.png"
              alt="explorer"
            />
            <img className="w-4" src="/logo/mozilla.png" alt="mozilla" />
          </div>
        </footer>
      </div>
    </div>
  );
}
