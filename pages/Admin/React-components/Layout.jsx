import React, { useState } from "react";
import Head from "next/head";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout(props) {
  const [sidebr, setSidebr] = useState(true);
  return (
    <div>
      <Head>
        <title>{props.title}</title>
      </Head>
      <Sidebar  sidebr={sidebr} />
      <Header openSide={setSidebr} sidebr={sidebr} />
      <div
        className={`${
          sidebr ? `px-4` : `lg:pl-72`
        } pt-16 static z-0 container mx-auto`}
      >
        {props.children}
       
      </div>
     
    </div>
  );
}