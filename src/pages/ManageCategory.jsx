import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import adminService from '../backend/admin'
import { Link } from 'react-router-dom'
import AddCategory from '../components/Admin/Category/AddCategory'
import { data } from 'autoprefixer'

function ManageCategory() {
    
    const [category, setCategory] = useState([])
    const [error, setError] = useState({msg:""})

    const navigate = useNavigate("")

    useEffect(() => {
        adminService.getCategories()
        .then((data) => {
            const categoryData = data.categories
            setCategory(categoryData)
        })
        .catch((err) => {
            const error = err.response?.data?.error?.errors || [{msg: err.response?.data?.error}]
            setError(error)
        })
    }, [])

    console.log(category)

    
  return (
    <div>
        {error.msg && (
            <h1> Hi Error is Here </h1>
        )}
        
        <AddCategory data={category} onSubmit={(data) => setCategory([...category, data])}/>

        {category.length > 0 && (
            category.map((category, index) => {
                console.log(category)
                return (
                    <h3 className="text-black" key={index}>
                {category.name}
                </h3>)
        })
        )}
    </div>
  )
}

export default ManageCategory