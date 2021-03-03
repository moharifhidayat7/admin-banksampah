import React, { useState } from "react";

import Layout from "../components/Layout";
import Dashboard from "./Dashboard/Dashboard";
import Login from "./Login/Login";

export default function index() {
  const [login, setLogin] = useState(true);

  return (
    <div>
      {login===false ? (
        <Layout title="Dashboard">
          <Dashboard />
        </Layout>
      ) : (
        <Login />
      )}
      <button className='flex justify-center items-center w-full focus:outline-none' onClick={() => setLogin(!login)}>Klik</button>
    </div>
  );
}
