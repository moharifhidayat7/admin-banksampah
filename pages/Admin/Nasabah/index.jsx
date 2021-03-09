import React from 'react'
import Layout from '../React-components/Layout'
import Kelompok from './Kelompok'
import Perorangan from './Perorangan'

function index() {
    return (
        <Layout title='Nasabah'>
            <div className="p-2  mb-4 shadow-lg rounded-lg text-pink-200 font-light items-center w-12 bg-white">
        <img src="/logo/team.svg" alt="nasabah" />
      </div>
      <div className="grid md:grid-cols-2 gap-4 mb-4">
       <Perorangan/>
       <Kelompok/>
       
      </div>
        </Layout>
    )
}

export default index
