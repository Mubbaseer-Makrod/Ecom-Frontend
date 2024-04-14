import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Header from './components/Header/Header.jsx'
import { Provider } from 'react-redux'
import {authStore} from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Home } from './components/index.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './components/user/Signup.jsx'
import Signin from './components/user/Signin.jsx'
import AdminDashboard from './components/Admin/AdminDashboard.jsx'
import AddCategory from './components/Admin/Category/AddCategory.jsx'
import AdminRoute from './components/Protected/AdminRoute.jsx'
import ManageCategory from './pages/ManageCategory.jsx'
// import Datagrid from './components/Datagrid.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "/cart",
        element: <Home />
      },
      {
        path: "/dashboard",
        element: <Home />
      },
      {
        path: "/admin-dashboard",
        element: (
                    <AdminRoute> 
                      <AdminDashboard />
                    </AdminRoute>
                  )
      },
      {
        path: "/signin",
        element: <Signin />
      },
      {
        path: "/signup",
        element: <Signup />
      },
      {
        path: "/signout",
        element: <Home />
      },
      {
        path: '/admin/create/category',
        element: (
          <AdminRoute> 
            <AddCategory />
          </AdminRoute>
        )
      },
      {
        path: '/admin/manage-category',
        element: <ManageCategory />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={authStore}>
        <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
