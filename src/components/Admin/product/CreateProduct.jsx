import adminService from '@/backend/admin'
import productService from '@/backend/product'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function CreateProduct() {
    const navigate = useNavigate()

    const valueDefaultState = {
        photos: "",
        name: "",
        description: "",
        price: "",
        categoryId: "",
        stock: "",
    }

    const [values, setValues] = useState({
        photos: "",
        name: "",
        description: "",
        price: "",
        categoryId: "",
        stock: "",
    })

    const [state, setState] = useState({
        loading: false,
        error: false,
        createdProduct: ""
    })

    const [categories, setCategories] = useState([])

    const successMessage = () => (
        <div
          className="alert alert-success mt-3"
          style={{ display: state.createdProduct ? "" : "none" }}
        >
          <h4>{state.createdProduct} created successfully</h4>
          <button type="button" class="btn btn-primary"
          onClick={() => setState({loading: false,error: false, createdProduct: ""})}>Ok</button>
        </div>
      );

    

    useEffect(() => {
        adminService.getCategories()
            .then((data) => {
                setState({...state, loading: true, error: ""})
                console.log("Data ", data)
                // const categoriesArray = data?.categories
                setCategories(data?.categories)
                setState({...state, loading: false})
                setValues({
                    photos: "",
                    name: "",
                    description: "",
                    price: "",
                    categoryId: "",
                    stock: "",
                })
                // console.log("Categories in createProduct", categories)
            })
            .catch((error) => {
                setValues({
                    photos: "",
                    name: "",
                    description: "",
                    price: "",
                    categoryId: "",
                    stock: "",
                })
                setState({...state, error: error.msg, loading: false })
            })
    }, [])

    useEffect(() => {
        console.log("Categories in createProduct:", categories);
        console.log("Submission Data are :", values);
      }, [categories, values]);

    const handleSubmit = (event) => {
        console.log("Submission Started")
        event.preventDefault()

        setState({loading: true, error: false, createdProduct: ""})

        productService.createProduct(values)
            .then((productData) => {
                setState({loading: false, error: false, createdProduct: productData.name})
                setValues(valueDefaultState)
            })
            .catch( (error) => {
                setState({...state, error: error.msg})
                setValues(valueDefaultState)
            })
        console.log("Submission Ended")
    }

  return (
    <div className=' m-5 p-6'>
        { successMessage() }
        <div className=''>
            <div className=''><h1>Register Product</h1></div>
        <form onSubmit={handleSubmit}>
        <div class="form-group">
            <input type="file" multiple="multiple"
                    onChange={(e) => setValues({...values, photos: e.target.files[0] })} 
                    class="form-control-file" id="Image" />
        </div>
            <div className="form-group mt-3 overflow-hidden">
                <input type="text" value={values.name}
                        onChange={(e) => setValues({...values, name: e.target.value })}
                     className="form-control" id="Name" aria-describedby="emailHelp" placeholder="Enter Name" />
                {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
            </div>
            <div className="form-group mt-3">
                {/* <label for="exampleInputPassword1">Password</label> */}
                {/* <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Description" /> */}
                <textarea className="form-control" 
                            value={values.description}
                            onChange={(e) => setValues({...values, description: e.target.value })}
                            id="Description" rows="3" placeholder="Description"></textarea>
            </div>
            <div className="form-group mt-3">
                {/* <label for="exampleInputPassword1">Password</label> */}
                <input type="Number" value={values.price}
                        onChange={(e) => setValues({...values, price: e.target.value })}
                        className="form-control" id="Price" placeholder="Price" />
            </div>
            <div className="form-group mt-3">
                {/* <label for="exampleInputPassword1">Password</label> */}
                <select className="form-control" 
                        value={values.categoryId}
                        onChange={(e) => setValues({...values, categoryId: e.target.value})}
                        id="CategorySlector" placeholder="Select Category">
                    {
                        categories.length !== 0 && (
                            categories.map((category) => (
                                <option key={category._id} value={category._id}>{category.name}</option>
                            ))
                        )
                    }
                </select>
            </div>
            <div className="form-group mt-3">
                <input type="number" value={values.stock}
                        onChange={(e) => setValues({...values, stock: e.target.value})} 
                        className="form-control" id="Quantity" placeholder="Quantity" />
            </div>
            <div className=''>
                <button type="submit" className="btn btn-primary mt-3">Submit</button>
                <Link className="btn btn-primary mt-3 ml-3" onClick={() => navigate("/admin-dashboard")}>Admin Home</Link>
            </div>
        </form>
        </div> 
    </div>
  )
}

export default CreateProduct