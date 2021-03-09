import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import * as Icons from "heroicons-react";
import { Menu, MenuGroup, MenuItem, SubMenu } from "../Menu";
import Head from 'next/head'

export default function AdminLayout({ children }) {
    return (
        <>
      
            <Navbar />
            <div className='h-screen flex'>
                <Sidebar>
                    <Menu>
                        <MenuGroup name="General">
                            <MenuItem
                                showSub={false}
                                icon={
                                    <Icons.Archive className='inline-block mr-2 align-middle' />
                                }
                            >
                                <SubMenu title='COBA' route='/home' />
                            </MenuItem>
                            <MenuItem
                                showSub={false}
                                icon={
                                    <Icons.Menu className='inline-block mr-2 align-middle' />
                                }
                            >
                                <SubMenu title='COBA' route='/home' />
                            </MenuItem>
                        </MenuGroup>
                    </Menu>
                </Sidebar>

                <div className='pt-16 ml-56 w-full'>
                    <div className='m-10'>{children}</div>
                </div>
            </div>
        </>
    );
}
