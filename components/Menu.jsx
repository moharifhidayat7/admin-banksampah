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
            >
                <SubItem route='/Admin/Gudang/Nasabah' title='Data Nasabah' />
            </Item>
            <Item
                icon={<Icons.Cash size='1rem' />}
                route='/Admin/Gudang/PembelianSampah'
                title='Pembelian Sampah'
            >
            </Item>
            <Item
                icon={<Icons.Cash size='1rem' />}
                route='/Admin/Gudang/PenjualanSampah'
                title='Penjualan Sampah'
            >
                <SubItem
                    title='Data Penjualan Sampah'
                    route='/Admin/Gudang/PenjualanSampah'
                />
                <SubItem
                    title='Jual Sampah'
                    route='/Admin/Gudang/PenjualanSampah/tambah'
                />
            </Item>
            <Item
                route='/Admin/Gudang/HargaSampah'
                icon={<Icons.CurrencyDollar size='1rem' />}
                title='Harga Sampah'
            >
                <SubItem
                    route='/Admin/Gudang/HargaSampah'
                    title='Data Harga Sampah'
                />
                <SubItem
                    route='/Admin/Gudang/HargaSampah/tambah'
                    title='Tambah Jenis Sampah'
                />
            </Item>
            <Item
                route='#'
                icon={<Icons.DocumentReport size='1rem' />}
                title='Rekap'
            >
                <SubItem
                    route='/Admin/Gudang/Rekap/Stok'
                    title='Rekap Stok Sampah'
                />
                <SubItem route='#' title='Rekap Penjualan Sampah' />
            </Item>
        </List>
    );
}
