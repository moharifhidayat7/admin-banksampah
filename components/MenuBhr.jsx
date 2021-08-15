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
      <Item icon={<Icons.UserGroup size='1rem' />} title='Nasabah'>
        <SubItem route='/Admin/Bendahara/Nasabah' title='Data Nasabah' />
        <SubItem route='/Admin/Bendahara/Nasabah/Golongan' title='Golongan' />
        <SubItem route='/Admin/Bendahara/Nasabah/Import' title='Import' />
      </Item>
      <ItemGroup title='TRANSAKSI'>
        <Item
          route='/Admin/Bendahara/Penarikan'
          icon={<Icons.ArrowCircleRight size='1rem' />}
          title='Penarikan'
        />
      </ItemGroup>
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
        <Item
          route='/Admin/Bendahara/Rekap'
          icon={<Icons.ArrowCircleRight size='1rem' />}
          title='Rekap Tabungan'
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
