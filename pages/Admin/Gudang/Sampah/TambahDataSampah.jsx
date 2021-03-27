import React, { useState } from "react";

function TambahDataSampah() {
    const [harga, setHarga] = useState("");

    const numOnly = (e) => {
        let re = /^[0-9\b]+$/;
        console.log(re.test(e.target.value));
        if (e.target.value === "" || re.test(e.target.value)) {
            setHarga(e.target.value);
        }
    };
    return <div></div>;
}

export default TambahDataSampah;
