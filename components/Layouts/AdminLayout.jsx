import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import * as Icons from "heroicons-react";
import { Menu, MenuGroup, MenuItem, SubMenu } from "../Menu";

export default function AdminLayout({ children }) {
    return (
        <>
            <Navbar />
            <div class='h-screen flex'>
                <Sidebar>
                    <Menu>
                        <MenuGroup>
                            <MenuItem
                                route='/tes'
                                icon={
                                    <Icons.Menu className='inline-block mr-2 align-middle' />
                                }
                            >
                                <SubMenu title='COBA' route='/home' />
                            </MenuItem>
                        </MenuGroup>
                    </Menu>
                </Sidebar>

                <div class='pt-16 ml-56 w-full'>
                    <div className='m-10'>{children}</div>
                </div>
            </div>
        </>
    );
}
