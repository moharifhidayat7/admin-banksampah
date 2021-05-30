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
                <SubItem
                    title='Data Pembelian Sampah'
                    route='/Admin/Gudang/PembelianSampah'
                />
                <SubItem
                    title='Beli Sampah'
                    route='/Admin/Gudang/PembelianSampah/tambah'
                />
            </Item>
            <Item
                route='/Admin/Gudang/HargaSampah'
                icon={<Icons.Trash size='1rem' />}
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
        </List>
    );
}
