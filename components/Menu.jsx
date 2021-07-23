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
      <Item icon={<Icons.SwitchVertical size='1rem' />} title='Transaksi'>
        <SubItem
          route='/Admin/Gudang/Transaksi/PembelianSampah'
          title='Pembelian Sampah'
        />
        <SubItem
          route='/Admin/Gudang/Transaksi/PenjualanSampah'
          title='Penjualan Sampah'
        />
        <SubItem route='/Admin/Gudang/Transaksi/Opname' title='Opname' />
      </Item>
      <Item
        route='/Admin/Gudang/HargaSampah'
        icon={<Icons.CurrencyDollar size='1rem' />}
        title='Harga Sampah'
      >
        <SubItem route='/Admin/Gudang/HargaSampah' title='Data Harga Sampah' />
        <SubItem
          route='/Admin/Gudang/HargaSampah/Kategori'
          title='Kategori Sampah'
        />
      </Item>
      <Item
        route='/Admin/Gudang/Rekap/SampahMasuk'
        icon={<Icons.DocumentReport size='1rem' />}
        title='Rekap Pembelian Sampah'
      ></Item>
    </List>
  );
}
