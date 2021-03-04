import React, { useState } from "react";
import Dashboard from "./Admin/Dashboard";
export default function index() {
  const [login, setLogin] = useState(true);

  return <Dashboard />;
}
