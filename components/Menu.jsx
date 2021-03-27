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
                route='/Admin/Gudang/Pembelian'
                icon={<Icons.Cash size='1rem' />}
                title='Pembelian'
            />
            <Item
                route='/Admin/Gudang/Sampah'
                icon={<Icons.Trash size='1rem' />}
                title='Sampah'
            />
        </List>
    );
}
