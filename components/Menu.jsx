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
                route='/Admin/Gudang/Kas'
                icon={<Icons.Cash size='1rem' />}
                title='Kas Gudang'
            />
            <Item
                route='/Admin/Gudang/Nasabah'
                icon={<Icons.UserGroup size='1rem' />}
                title='Nasabah'
            />
            <Item
                icon={<Icons.TrendingDown size='1rem' />}
                route='/Admin/Gudang/PembelianSampah'
                title='Pembelian Sampah'
            ></Item>
            <Item
                icon={<Icons.TrendingUp size='1rem' />}
                route='/Admin/Gudang/PenjualanSampah'
                title='Penjualan Sampah'
            ></Item>
            <Item
                route='/Admin/Gudang/HargaSampah'
                icon={<Icons.CurrencyDollar size='1rem' />}
                title='Harga Sampah'
            ></Item>
            <Item
                route='/Admin/Gudang/Rekap/SampahMasuk'
                icon={<Icons.DocumentReport size='1rem' />}
                title='Rekap Pembelian Sampah'
            ></Item>
        </List>
    );
}
