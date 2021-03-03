import React from "react";
import MenuSidebar from "./MenuSidebar";

export default function Sidebar(props) {
  return (
    <div
      hidden={props.sidebr}
      className="left-0 fixed shadow-lg w-52 bg-white h-full overflow-y-auto overflow-x-hidden"
    >
      <div className="pt-16 ml-8 mr-4">
        <h3 className=" font-bold text-blue-700 mb-2">MENU</h3>
        <MenuSidebar
          menu="Dashboard"
          icon="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          submenu={["Card Pemasukan", "Card Pengeluaran", "Total"]}
        />
        <MenuSidebar
          menu="Nasabah"
          icon="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          submenu={["Pendaftaran", "Konfirmasi", "Detail Nasabah"]}
        />

        <MenuSidebar
          menu="Pemasukan"
          icon="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          submenu={["Input Pemasukan", "Detail Pemasukan", "Total Pemasukan"]}
        />
        <MenuSidebar
          menu="Pengeluaran"
          icon="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
          submenu={[
            "Input Pengeluaran",
            "Detail Pengeluaran",
            "Total Pengeluaran",
          ]}
        />
      </div>

      <footer className=" mt-12  pb-2 pl-2 text-center space-x-2 flex items-center text-sm italic">
        <p>Suport Browser</p>
        <img className="w-4" src="chrome.png" alt="crome" />
        <img className="w-4" src="internet-explorer.png" alt="explorer" />
        <img className="w-4" src="mozilla.png" alt="mozilla" />
      </footer>
    </div>
  );
}
