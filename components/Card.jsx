import React from "react";

function Card({ judul, gambar, total, alt, warna, lebar }) {
  return (
    <div className="flex justify-center md:block">
      <div
        className={`bg-white   rounded-md shadow-lg overflow-hidden ${lebar}`}
      >
        <div className={`${warna} text-center text-lg font-bold text-gray-600`}>
          {judul}
        </div>
        <div className="flex justify-center  py-4 items-center w-full">
          <div className={`${warna} p-5 rounded-full`}>
            <img className="w-24" src={gambar} alt={alt} />
          </div>
        </div>
        <div className={`text-center text-gray-800 font-bold text-2xl mb-4`}>
          {total}
        </div>
      </div>
    </div>
  );
}

export default Card;
