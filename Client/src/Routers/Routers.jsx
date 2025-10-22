import React from 'react'
import Home from '../Pages/Home'
import Contact from '../Pages/Contact'
import Login from '../Pages/Login'
import Signup from '../Pages/Signup'
import Services from '../Pages/Services'
import DoctorDetails from '../Pages/Doctor/DoctorDetails'
import Doctors from '../Pages/Doctor/Doctors'
import { Route, Routes } from 'react-router-dom'
import MyAccount from '../Dashboard/user-account/MyAccount'
import Dashboard from '../Dashboard/doctor-account/Dashboard'
import ProtectedRoute from './ProtectedRoute'

function Routers() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/services" element={<Services />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:id" element={<DoctorDetails />} />
        <Route path="/users/profile/me" element={
            <ProtectedRoute allowedRoles={['patient']}>
              <MyAccount />
            </ProtectedRoute>
        } />
        <Route path="/doctors/profile/me" element={
            <ProtectedRoute allowedRoles={['doctor']}>
              <Dashboard />
            </ProtectedRoute>
        } />
    </Routes>
  )
}

export default Routers
