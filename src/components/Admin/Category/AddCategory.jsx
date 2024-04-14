import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import adminService from '../../../backend/admin'
import { Form, Link, useNavigate } from 'react-router-dom'

function AddCategory({onSubmit}) {

    const [values, setValues] = useState({
        categoryName: "",
        categoryData: "",
        error: "",
        loading: false,
    })

    const navigate = useNavigate()
    
    // const userData = useSelector(state => state.userData)

    const { categoryName, categoryData, error, loading} = values

    const handleSubmit = (event) => {
        event.preventDefault()
        setValues({...values, loading: true})

        if(!categoryName) {
            setValues({...values, loading: false})
            setValues({...values, error: "Name is not available"})
            return false
        }

        adminService.createCategory({name: categoryName})
        .then((categoryData) => {
            setValues({...values, error: "", categoryName: "",loading: false, categoryData})
            console.log(" Created Category Data : ", categoryData)
            onSubmit(categoryData)
        })
        .catch((err) => {
            let error = err?.response?.data?.error?.errors || [{msg: err?.response?.data?.error}]
            setValues({...values, categoryData: "",loading: false, error, categoryName: ""})
        })       
    }



  return (
    <div className='row jumbotron bg-white rounded text-center p-4 m-4'>
        {error && (
            error?.map(error => (
                <div>Error Occour: {error.msg}</div>
            ))
        )}

        {categoryData && (
            <div> Successfully created Category : "Success" {JSON.stringify(categoryData)}</div>
        )}

        { loading && (
            <div> .. Loading Data</div>
        )}
        {(
            <div>
                <Form>
                    <h1 className='btn-lg btn-success font-weight-bold text-success'> Create a Category</h1>
                    <input
                    value={categoryName}
                    onChange={(e) => setValues({...values, categoryName: e.target.value})}
                    placeholder='Enter Category Name'></input>
                    <button
                    onClick={handleSubmit}>Submit</button>
                </Form>
                <Link className="btn btn-primary m-3" onClick={() => navigate("/admin-dashboard")}>Admin Home</Link>
            </div>
        )}
    </div>
  )
}

export default AddCategory