import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import * as Icons from "heroicons-react";
import { Menu, MenuGroup, MenuItem, SubMenu } from "../Menu";

export default function AdminLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="h-screen flex">
        <Sidebar>
          <Menu>
            <MenuGroup name="General">
              <MenuItem
                title="Dashboard"
                route="/Admin"
                showSub={false}
                icon={
                  <Icons.Home className="inline-block mr-2 align-middle" />
                }
              ></MenuItem>
              <MenuItem
                route="/Admin/Pembelian"
                title="Pembelian"
                showSub={false}
                icon={<Icons.CurrencyDollar className="inline-block mr-2 align-middle" />}
              ></MenuItem>
              <MenuItem
                route="/Admin/Nasabah"
                title="Nasabah"
                showSub={false}
                icon={<Icons.UserGroup className="inline-block mr-2 align-middle" />}
              ></MenuItem>
              <MenuItem
                route="/Admin/Sampah"
                title="Sampah"
                showSub={false}
                icon={<Icons.Collection className="inline-block mr-2 align-middle" />}
              ></MenuItem>
            </MenuGroup>
          </Menu>
        </Sidebar>

        <div className="pt-16 md:ml-64 w-full">
          <div className="mt-10 mx-2">{children}</div>
        </div>
      </div>
    </>
  );
}
