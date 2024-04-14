import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

function AdminDashboard() {

  const userData = useSelector(state => state.userData)
  const authStatus = useSelector(state => state.status)
  const navigate = useNavigate()
  
  console.log("STATUS IN ADMIN DASHBOARD :", userData)

  const adminLeftSide = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link onClick={() => navigate("/admin/create/category")} className="nav-link text-success">
              Create Categories
            </Link>
          </li>
          <li className="list-group-item">
            <Link onClick={() => navigate("/admin/manage-category")}  className="nav-link text-success">
              Manage Categories
            </Link>
          </li>
          <li className="list-group-item">
            <Link onClick= {() => navigate("/admin/create/product")} className="nav-link text-success">
              Create Product
            </Link>
          </li>
          <li className="list-group-item">
            <Link onClick={() => navigate("/admin/manage/product")} className="nav-link text-success">
              Manage Products
            </Link>
          </li>
          <li className="list-group-item">
            <Link onClick={() => navigate("/admin/orders")} className="nav-link text-success">
              Manage Orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminRightSide = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header">Admin Information</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="btn btn-success mr-2">Name:</span> {userData?.name}
          </li>
          <li className="list-group-item">
            <span className="btn btn-success mr-2 ">Email:</span> {userData?.email}
          </li>

          <li className="list-group-item ">
            <span className="btn btn-danger text-color-red">Admin Area</span>
          </li>
        </ul>
      </div>
    );
  };


  return (
    <div>
      { userData?.role > 0 && (
        <div className='row  mt-2 '>
          <div className='text-center p-3'>
            <h1> Admin Area </h1>
            <h3> Manage All your Products Here</h3>
          </div>
          <div className='col-9'>{adminLeftSide()}</div>
          <div className='col-3'>{adminRightSide()}</div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard