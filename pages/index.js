import React, { useState } from "react";
import Layout from "../components/Layout";
import Dashboard from "./Dashboard/Dashboard";
export default function index() {
  const [login, setLogin] = useState(true);

  return <Dashboard />;
}
