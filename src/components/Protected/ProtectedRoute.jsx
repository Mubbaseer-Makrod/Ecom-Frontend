import React from 'react'
import {Route, useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'

function ProtectedRoute({path, component}) {

  const navigate = useNavigate()
  
  const userData = useSelector(state => state.userData)

  if( userData) {
    return <Route component={component} />;
  } 

  return navigate("/Signin")
}

export default ProtectedRoute