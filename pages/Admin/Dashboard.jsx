import React from "react";
import Layout from "../../components/Layout";
import Card from "./Card";
export default function Dashboard() {
  return (
    <Layout title="Dashboard">
      <div className="mt-8">
        <div className="p-2 mb-4 shadow-lg rounded-lg text-pink-200 font-light items-center w-12 bg-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </div>
        <Card />
      </div>
    </Layout>
  );
}
