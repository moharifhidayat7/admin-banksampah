import * as Icons from "heroicons-react";

import List from "./List";

export default function Menu() {
    return (
        <List>
            <List.Item
                route='/Admin'
                icon={<Icons.HomeOutline size='1rem' />}
            ></List.Item>
            <List.Item>
                <List.SubItem></List.SubItem>
            </List.Item>
            <List.Item>
                <List.SubItem></List.SubItem>
                <List.SubItem></List.SubItem>
            </List.Item>
            <List.Item></List.Item>
        </List>
    );
}
