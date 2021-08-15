import * as Icons from "heroicons-react";
import { List, Item, SubItem, ItemGroup } from "./List";

export default function Menu() {
  return (
    <List>
      <Item
        route='/Admin/Gudang'
        icon={<Icons.HomeOutline size='1rem' />}
        title='Dashboard'
      />
      {/* <Item
        route='/Admin/Gudang/Kas'
        icon={<Icons.Cash size='1rem' />}
        title='Kas Gudang'
      /> */}
      <ItemGroup title='DATA'>
        <Item
          route='/Admin/Gudang/Nasabah'
          icon={<Icons.UserGroup size='1rem' />}
          title='Nasabah'
        />
        <Item icon={<Icons.CurrencyDollar size='1rem' />} title='Sampah'>
          <SubItem route='/Admin/Gudang/Sampah/Jenis' title='Jenis Sampah' />
          <SubItem
            route='/Admin/Gudang/Sampah/Kategori'
            title='Kategori Sampah'
          />
        </Item>
      </ItemGroup>
      <ItemGroup title='TRANSAKSI'>
        <Item
          icon={<Icons.ArrowCircleDown size='1rem' />}
          route='/Admin/Gudang/Transaksi/Beli'
          title='Beli Sampah'
        />
        <Item
          icon={<Icons.ArrowCircleUp size='1rem' />}
          route='/Admin/Gudang/Transaksi/Jual'
          title='Jual Sampah'
        />
        <Item
          icon={<Icons.SwitchVertical size='1rem' />}
          route='/Admin/Gudang/Transaksi/Stok'
          title='Stok In/Out Sampah'
        />
        {/* <Item icon={<Icons.SwitchVertical size='1rem' />} title='Transaksi'>
          <SubItem route='/Admin/Gudang/Transaksi/Beli' title='Beli Sampah' />
          <SubItem route='/Admin/Gudang/Transaksi/Jual' title='Jual Sampah' />
          <SubItem route='/Admin/Gudang/Transaksi/Stok' title='Stok In/Out' />
        </Item> */}
      </ItemGroup>
      <ItemGroup title='LAPORAN'>
        <Item
          route='/Admin/Gudang/Pembelian'
          icon={<Icons.TrendingDown size='1rem' />}
          title='Pembelian Sampah'
        />
        <Item
          route='/Admin/Gudang/Penjualan'
          icon={<Icons.TrendingUp size='1rem' />}
          title='Penjualan Sampah'
        />
        <Item
          route='/Admin/Gudang/Rekap/Pembelian'
          icon={<Icons.DocumentReport size='1rem' />}
          title='Rekap Pembelian Sampah'
        />
        <Item
          route='/Admin/Gudang/Rekap/Penjualan'
          icon={<Icons.DocumentReport size='1rem' />}
          title='Rekap Penjualan Sampah'
        />
      </ItemGroup>

      {/* <Item
        route='/Admin/Gudang/Rekap/SampahMasuk'
        icon={<Icons.DocumentReport size='1rem' />}
        title='Rekap Pembelian Sampah'
      ></Item> */}
    </List>
  );
}
