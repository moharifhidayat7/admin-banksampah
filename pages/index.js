import React, { useState } from "react";

import Dashboard from "./Dashboard/Dashboard";
import Login from "./Login/Login";

export default function index() {
  const [login, setLogin] = useState(true);

  return (
    <div>
      {login === true ? <Dashboard /> : <Login />}
      <button
        className=" justify-center absolute right-28 bg-yellow-200 p-1 focus:outline-none"
        onClick={() => setLogin(!login)}
      >
        Klik
      </button>
    </div>
  );
}
