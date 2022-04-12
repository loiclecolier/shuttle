import React from 'react'
import { Outlet } from 'react-router-dom'
import NavbarDashboard from '../../Components/NavbarDashboard/NavbarDashboard'
import './Dashboard.css'

export default function Dashboard() {
  return <>
    <NavbarDashboard />
    <Outlet />
  </>
}
