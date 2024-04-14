import React, { Fragment,useEffect, useState } from 'react'
import { login, logout } from '../../store/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import {Container} from '../index'
import { NavLink, useNavigate } from 'react-router-dom'
import Button from '../Helpers/Button'
import authService from '../../backend/auth'


function Header() {

  // Testing Purpose Start 
  // const authStatus = !useSelector((state) => state.status)
  // const userData = null
  // testing purpose End 

  const authStatus = useSelector((state) => state.status)
  const userData = useSelector((state) => state.userData)

  console.log("userData is : ", JSON.stringify(userData))
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <div>
      <ul className="nav nav-tabs bg-dark">
        <li className="nav-item">
          <NavLink 
            className={`${({isActive}) => isActive ? "color: #2ecc72" : " color: #FFFFFF"} nav-link`} 
            to="/">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className={`${({isActive}) => isActive ? "color: #2ecc72" : " color: #FFFFFF"} nav-link`}
            to="/cart"
          >
            Cart
          </NavLink>
        </li>
        {authStatus  && (
          <li className="nav-item">
            <NavLink
              className={`${({isActive}) => isActive ? "color: #2ecc72" : " color: #FFFFFF"} nav-link`}
              to="/dashboard"
            >
              U. Dashboard
            </NavLink>
          </li>
        )}
        {authStatus && userData.role > 0 && (
          <li className="nav-item">
            <NavLink
              className={`${({isActive}) => isActive ? "color: #2ecc72" : " color: #FFFFFF"} nav-link`}
              to="/admin-dashboard"
            >
              A. Dashboard
            </NavLink>
          </li>
        )}
        {!authStatus && (
          <Fragment>
            <li className="nav-item">
              <NavLink
                className={`${({isActive}) => isActive ? "color: #2ecc72" : " color: #FFFFFF"} nav-link`}
                to="/signup"
              >
                Signup
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={`${({isActive}) => isActive ? "color: #2ecc72" : " color: #FFFFFF"} nav-link`}
                to="/signin"
              >
                Sign In
              </NavLink>
            </li>
          </Fragment>
        )}
        {authStatus && (
          <li className="nav-item">
            <span
              className="nav-link text-warning"
              onClick={() => {
                authService.logout()
                .then((response) => {
                  console.log("Entering logout section data ", response)
                  dispatch(logout())
                  navigate("/")
                })

              }}
            >
              Signout
            </span>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Header
