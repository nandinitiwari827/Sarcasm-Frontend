import React from 'react'
import Header from './components/Layout elements/Header.jsx'
import Footer from './components/Layout elements/Footer.jsx'
import {Outlet} from "react-router-dom"

function Layout() {
  return (
    <div className='min-h-screen bg-orange-50'>
    <Header/>
    <Outlet/>
    <Footer/>
    </div>
  )
}

export default Layout