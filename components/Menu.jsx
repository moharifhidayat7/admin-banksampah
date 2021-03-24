import * as Icons from "heroicons-react";

import List from "./List";

export default function Menu() {
    return (
        <List>
            <List.Item
                route='/Admin'
                icon={<Icons.HomeOutline size='1rem' />}
                title='Dashboard'
            />
            <List.Item
                route='/Admin/Nasabah'
                icon={<Icons.UserGroup size='1rem' />}
                title='Nasabah'
            />
            <List.Item
                route='/Admin/Pembelian'
                icon={<Icons.Cash size='1rem' />}
                title='Pembelian'
            />
            <List.Item
                route='/Admin/Sampah'
                icon={<Icons.Trash size='1rem' />}
                title='Sampah'
            />
        </List>
    );
}
