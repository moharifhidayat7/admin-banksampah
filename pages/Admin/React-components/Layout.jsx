import React, { useEffect, useState } from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout(props) {
  const [sidebr, setSidebr] = useState(false);

  // Menyimpan data togler di memory
  useEffect(() => {
    let a = localStorage.getItem("togler");
    if (a === "false" || a === null) {
      setSidebr(!sidebr);
    } else {
      setSidebr(sidebr);
    }
  }, []);

  return (
    <div>
      <Head>
        <title>{props.title}</title>
        <link rel="icon" href="/favicon.jfif" />
      </Head>
      <Sidebar sidebr={sidebr} />
      <Navbar openSide={setSidebr} sidebr={sidebr} />
      <div
        className={`${
          sidebr ? `px-4` : ` lg:pl-72`
        } pt-28 static z-0 container mx-auto `}
      >
        {props.children}
      </div>
    </div>
  );
}
