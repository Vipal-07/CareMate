import React from 'react'
import { useContext } from 'react'
import { authContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'


export default function ProtectedRoute({ children, allowedRoles }) {
    const {user, role} = useContext(authContext)
    const isAllowed = Array.isArray(allowedRoles) ? allowedRoles.includes(role) : true;
    const accessibleRoute = user && isAllowed ? children : <Navigate to="/login" replace={true}/>;
    return accessibleRoute;
}
