import React, { useEffect, useState } from "react";

export default function MenuSidebar(props) {
  const [stateOptions, setStateValues] = useState(props.submenu);

  return (
    <div className="mt-4">
      <div className="p-0.5 mx-1 px-1 shadow-md rounded-md transition border-l-4 hover:border-yellow-200 hover:shadow bg-blue-100 flex justify-between items-center cursor-pointer duration-300 duration-500 ease-in-out  transform hover:scale-110 ">
        <button className="focus:outline-none flex  items-center">
          <div className="w-4 text-gray-300 mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={props.icon}
              />
            </svg>
          </div>
          {props.menu}
        </button>
        <div className="w-4 text-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"
            />
          </svg>
        </div>
      </div>
      <div className="ml-1">
        {/* Sub child */}
        <div className="ml-4 font-light text-sm  cursor-default">
          {stateOptions.map((value, i) => {
            return (
              <div
                key={i}
                className={`border-l-2 pl-4 ${
                  i % 2 === 0 ? ` border-red-200` : ` border-green-200 `
                } ${stateOptions.length - 1 === i ? `rounded-bl-md ` : `pb-2`}`}
              >
                {value}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}