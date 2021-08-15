import * as Icons from "heroicons-react";
import { List, Item, SubItem, ItemGroup } from "./List";

export default function Menu() {
  return (
    <List>
      <Item
        route='/Admin/Manager'
        icon={<Icons.HomeOutline size='1rem' />}
        title='User'
      />
    </List>
  );
}
