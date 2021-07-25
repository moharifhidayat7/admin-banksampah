import { useEffect } from "react";
import Table from "easy-table";
import { formatRp } from "@helpers/functions";
import { getSession } from "next-auth/client";

export default function print({ data }) {
  var t = new Table();

  data.items.forEach(function (item, i) {
    t.cell("No", i.toString().padEnd(3));
    t.cell("Jenis Sampah", item._sampahType.name.slice(0, 20).padEnd(20));
    t.cell("Qty", item.qty.toString().padStart(5));
    t.cell("Harga", item.price.toString().padStart(6));
    t.cell("Sub Total", item.subTotal.toString().padStart(9));
    t.newRow();
  });

  useEffect(() => {
    window.print();
  }, []);

  return (
    <pre>
      {`
               BANK SAMPAH BANYUWANGI
        Jl. Jaksa Agung Suprapto Gang An-Nur
                 No. 11 Banyuwangi
---------------------------------------------------
No: ${data.transactionNo}
Tanggal: ${data.transactionDate.slice(0, 10)}
Tipe: ${data.transactionType}
---  --------------------  -----  ------  ---------
${t.toString()}
---------------------------------------------------
${`Total: ${formatRp(data.total)}`.padStart(51)}
---------------------------------------------------
                bsb251012@gmail.com
                 +62 8233-5280-557
`}
    </pre>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
      },
    };
  }

  const result = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/sampahTransaction/${context.params.id}`
  );
  const data = await result.json();

  return {
    props: {
      data,
    },
  };
}
