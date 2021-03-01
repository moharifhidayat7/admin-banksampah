import React, { useState } from "react";
import Head from "next/head";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout(props) {
  const [sidebr, setSidebr] = useState(true);
  return (
    <div className="bg-gray-50">
      <Head>
        <title>{props.title}</title>
      </Head>
      <Sidebar sidebr={sidebr} />
      <Header openSide={setSidebr} sidebr={sidebr} />

      <div className={`${sidebr ? `container mx-auto` : `pl-56`} pt-16 `}>
        {props.children}
      </div>
      <div className=" flex justify-center">
        <footer className="bottom-0 absolute">
          Copyrigth Stikom Kampus Merdeka 2021
        </footer>
      </div>
    </div>
  );
}
