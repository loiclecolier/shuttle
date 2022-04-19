import React from 'react'
import './Products.css'
import { Outlet } from 'react-router-dom'
import NavbarProductDashboard from '../../../Components/NavbarProductDashboard/NavbarProductDashboard'

export default function Products() {

  return <>
    <NavbarProductDashboard />
    <Outlet /> 
  </>
}
