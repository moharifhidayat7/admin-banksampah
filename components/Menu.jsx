import * as Icons from "heroicons-react";
import { List, Item, SubItem } from "./List";

export default function Menu() {
    return (
        <List>
            <Item
                route='/Admin/Gudang'
                icon={<Icons.HomeOutline size='1rem' />}
                title='Dashboard'
            />
            <Item
                route='/Admin/Gudang/Nasabah'
                icon={<Icons.UserGroup size='1rem' />}
                title='Nasabah'
            />
            <Item
                icon={<Icons.Cash size='1rem' />}
                route='/Admin/Gudang/PembelianSampah'
                title='Pembelian Sampah'
            ></Item>
            <Item
                icon={<Icons.Cash size='1rem' />}
                route='/Admin/Gudang/PenjualanSampah'
                title='Penjualan Sampah'
            ></Item>
            <Item
                route='/Admin/Gudang/HargaSampah'
                icon={<Icons.CurrencyDollar size='1rem' />}
                title='Harga Sampah'
            ></Item>
            <Item
                route='#'
                icon={<Icons.Truck size='1rem' />}
                title='Lakukan Transaksi'
            ></Item>
            <Item
                route='/Admin/Gudang/Rekap/SampahMasuk'
                icon={<Icons.DocumentReport size='1rem' />}
                title='Rekap Sampah Masuk'
            ></Item>
        </List>
    );
}
