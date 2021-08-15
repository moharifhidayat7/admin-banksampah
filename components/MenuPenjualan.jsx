import * as Icons from "heroicons-react";
import { List, Item, SubItem, ItemGroup } from "./List";

export default function Menu() {
  return (
    <List>
      <Item
        route='/Admin/Penjualan'
        icon={<Icons.HomeOutline size='1rem' />}
        title='Dashboard'
      />
      <ItemGroup title='DATA'>
        <Item
          route='/Admin/Penjualan/Produk'
          icon={<Icons.ClipboardList size='1rem' />}
          title='Produk'
        >
          <SubItem route='/Admin/Penjualan/Produk' title='Data Produk' />
          <SubItem route='/Admin/Penjualan/Produk/Kategori' title='Kategori' />
        </Item>
      </ItemGroup>
      <ItemGroup title='TRANSAKSI'>
        <Item
          route='/Admin/Penjualan/Stok'
          icon={<Icons.ClipboardList size='1rem' />}
          title='Stok In/Out'
        ></Item>
      </ItemGroup>
      <ItemGroup title='LAPORAN'>
        <Item
          route='/Admin/Penjualan/Pesanan'
          icon={<Icons.ShoppingCart size='1rem' />}
          title='Transaksi Penjualan'
        />
        {/* <Item
                  route='/Admin/Penjualan/RekapPenjualan'
                  icon={<Icons.DocumentReport size='1rem' />}
                  title='Rekap Penjualan Produk'
                /> */}
      </ItemGroup>
    </List>
  );
}
