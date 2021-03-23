import React from "react";

export default function Tabel({ children, tabhead }) {
  return (
    <div className="border overflow-x-scroll md:overflow-x-hidden border-gray-700 rounded-lg overflow-hidden shadow-lg">
      <table className="table-auto w-full">
        <thead className="bg-gray-700 text-white">
          <tr>
            {tabhead.map((e, i) => {
              return (
                <th key={i} className={`${e.sz} `}>
                  {e.judul}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="bg-white">{children}</tbody>
      </table>
    </div>
  );
}
