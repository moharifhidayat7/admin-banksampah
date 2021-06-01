import ClientLayout from "../../../components/Layouts/ClientLayout";
import {
   Table,
   TableHead,
   TableBody,
   TableRow,
   TableCell,
   TableCol,
} from "../../../components/Table";
export default function Transaksi() {
   return (
      <ClientLayout>
         <h3 className="uppercase font-medium mb-3">Content</h3>
         <div className="w-full">
            <Table>
               <TableHead>
                  <TableCol>Tanggal</TableCol>
                  <TableCol>Pembeli</TableCol>
                  <TableCol>Jumlah</TableCol>
                  <TableCol>Keterangan</TableCol>
               </TableHead>
               <TableBody>
                  <TableRow>
                     <TableCell>12-12-12</TableCell>
                     <TableCell>Siswanto</TableCell>
                     <TableCell>Rp.200000</TableCell>
                     <TableCell>Beli Beli</TableCell>
                  </TableRow>
               </TableBody>
            </Table>
         </div>
      </ClientLayout>
   );
}
