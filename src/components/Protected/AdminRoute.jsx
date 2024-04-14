import React from 'react'
import {Route, useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'

function AdminRoute({ children }) {
  // console.log(Component)

  const navigate = useNavigate()
  
  const userData = useSelector(state => state.userData)

  console.log("Admin Route : userData :", String(userData))

  if( userData || userData?.role > 0 ) {
    return children
  } 

  return <h1>Not LoGin</h1>
}

export default AdminRoute