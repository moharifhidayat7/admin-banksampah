import React from "react";
import Head from "next/head";
import Header from "./Header";

export default function Layout(props) {
  return (
    <div className='subpixel-antialiased'>
      <Head>
        <title>{props.title}</title>
      </Head>
      <Header/>
      <div className='pt-16 container'>{props.children}</div>
     
    </div>
  );
}
