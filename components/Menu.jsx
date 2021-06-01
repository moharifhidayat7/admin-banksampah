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
                title='Data Nasabah'
            />
            <Item
                icon={<Icons.Cash size='1rem' />}
                route='/Admin/Gudang/PembelianSampah'
                title='Data Pembelian Sampah'
            ></Item>
            <Item
                icon={<Icons.Cash size='1rem' />}
                route='/Admin/Gudang/PenjualanSampah'
                title='Data Penjualan Sampah'
            ></Item>
            <Item
                route='/Admin/Gudang/HargaSampah'
                icon={<Icons.CurrencyDollar size='1rem' />}
                title='Data Harga Sampah'
            ></Item>
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
