import React from 'react'
import AdminNav from './AdminNav'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const AdminLayout = () => {
  const user=useSelector((state)=>state.auth)
if (!user && user.role!=="admin") {
  return<Navigate to="/login"/>
}

  return (
    <div className='flex flex-col md:flex-row mx-auto gap-4 justify-start items-start '>
    <div className='w-full md:w-2/5 lg:w-1/5 shadow-sm'>
    <AdminNav/>
    
    </div>
    <div className='w-full md:w-3/5 lg:w-4/5 shadow-sm'>
<Outlet/>    </div>
    </div>
  )
}

export default AdminLayout