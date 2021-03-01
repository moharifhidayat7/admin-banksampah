import React, { useEffect, useState } from "react";
import Settings from "./Settings";

export default function Header(props) {
  return (
    <div className="bg-gray-50 shadow-lg w-full  fixed italic">
      <div className="transition-transform flex justify-between lg:px-12 ">
        <div className="flex items-center h-12">
          {!props.sidebr && (
            <div className="w-28 mr-10">
              <img src="logo.svg" alt="logo" />
            </div>
          )}

          <div
            onClick={() => props.openSide(!props.sidebr)}
            className="w-8 text-blue-700 mr-10 cursor-pointer pointer-events"
          >
            <svg
              className="transition-transform hover:skew-y-12 transform"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {props.sidebr ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              )}
            </svg>
          </div>
          <div className="bg-gray-200 hidden lg:flex rounded-2xl p-0.5  justify-between ">
            <input
              type="text"
              className="focus:outline-none bg-transparent w-60 p-1 pl-2 text-lg"
              placeholder="Apa yang anda cari?"
            />
            <div className="w-8 text-blue-700 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9 9a2 2 0 114 0 2 2 0 01-4 0z" />
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a4 4 0 00-3.446 6.032l-2.261 2.26a1 1 0 101.414 1.415l2.261-2.261A4 4 0 1011 5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="items-center flex " >
          <img
            className="rounded-full w-10 mr-3 hidden lg:block"
            src="http://placehold.jp/500x500.png"
            alt="profile"
          />
          <div className="items-center -space-y-1  hidden lg:block ">
            <div className="font-bold text-base"> My Name is Koko </div>
            <div className="text-xs font-light font-mono">
              Manager bank sampah
            </div>
          </div>
          <Settings />
        </div>
       
      </div>
    </div>
  );
}
