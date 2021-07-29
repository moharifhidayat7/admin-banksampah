import { List, Item, SubItem, ItemGroup } from "@components/List";
import * as Icons from "heroicons-react";

export default function MenuBhr() {
  return (
    <List>
      <Item
        route='/Admin/Bendahara'
        icon={<Icons.HomeOutline size='1rem' />}
        title='Dashboard'
      />
      <Item
        route='/Admin/Bendahara/Nasabah'
        icon={<Icons.UserGroup size='1rem' />}
        title='Nasabah'
      >
        <SubItem route='/Admin/Bendahara/Nasabah' title='Data Nasabah' />
        <SubItem route='/Admin/Bendahara/Nasabah/Golongan' title='Golongan' />
      </Item>
      {/* <Item
        route='/Admin/Bendahara/Internal'
        icon={<Icons.Cash size='1rem' />}
        title='Transaksi Internal'
      ></Item> */}
      <ItemGroup title='LAPORAN'>
        <Item
          route='/Admin/Bendahara/Transaksi'
          icon={<Icons.ArrowCircleRight size='1rem' />}
          title='Transaksi Tabungan'
        />
        <Item
          route='/Admin/Bendahara/Gudang'
          icon={<Icons.ArrowCircleRight size='1rem' />}
          title='Transaksi Gudang'
        />
      </ItemGroup>
      {/* <Item
                            route='/Admin/Bendahara/PembelianSampah'
                            icon={<Icons.Cash size='1rem' />}
                            title='Transaksi Pembelian Sampah'
                        ></Item>
                        <Item
                            route='/Admin/Bendahara/PenjualanSampah'
                            icon={<Icons.Cash size='1rem' />}
                            title='Transaksi Penjualan Sampah'
                        ></Item> */}
    </List>
  );
}
