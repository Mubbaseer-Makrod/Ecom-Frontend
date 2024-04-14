import { useEffect, useState } from "react"
import conf from "./conf/conf.js"
import authService from "./backend/auth.js"
import { login, logout } from "./store/authSlice.js"
import { useDispatch, useSelector } from "react-redux"
import { Header, Footer } from "./components/index.js"
import { Outlet } from "react-router-dom"


function App() {

  // const loading = useSelector((state) => !state.status)
  const dispatch = useDispatch()
  console.log("State of Redux is :", useSelector(state => state))

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      console.log(userData)
      dispatch(login({userData}))
      console.log("Loading Data :", userData)
    })
    .catch((error) => {
      dispatch(logout())
      console.log(error)
    })
  }, [dispatch]) 

  // if(loading) {
  //   return (
  //     <h1> ... Loading</h1>
  //   )
  // }

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
