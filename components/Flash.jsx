import React, { useEffect, useState } from "react";
import Bus from "../src/Bus";
import flash from "@kessl/next-flash";

const Flash = () => {
  let [visibility, setVisibility] = useState(false);
  let [message, setMessage] = useState("");
  let [type, setType] = useState("");

  useEffect(() => {
    Bus.addListener("flash", ({ message, type }) => {
      setVisibility(true);
      setMessage(message);
      switch (type) {
        case "success":
          setType("bg-green-300 border-green-400");
          break;
        case "error":
          setType("bg-red-300 border-red-400");
          break;
        default:
          setType("bg-yellow-300 border-yellow-400");
          break;
      }
      setTimeout(() => {
        setVisibility(false);
      }, 4000);
    });
  }, []);

  return (
    visibility && (
      <div
        className={`px-5 py-2 rounded-md text-sm border text-gray-800 shadow-sm ${type}`}
      >
        {message}
      </div>
    )
  );
};

export default Flash;
