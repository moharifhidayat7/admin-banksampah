import React, { useState } from "react";

import Layout from "../components/Layout";
import Dashboard from "./Dashboard/Dashboard";
import Login from "./Login/Login";

export default function index() {
  const [login, setLogin] = useState(true);

  return (
    <div>
      {login === false ? <Dashboard /> : <Login />}
      <button
        className="flex justify-center items-center w-full focus:outline-none"
        onClick={() => setLogin(!login)}
      >
        Klik
      </button>
    </div>
  );
}
