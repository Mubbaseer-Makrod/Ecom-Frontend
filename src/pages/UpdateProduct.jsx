import productService from '@/backend/product'
import adminService from '@/backend/admin'
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function UpdateProduct() {
    const navigate = useNavigate()
    const [productData, setProductData] = useState("")
    const [categories, setCategories] = useState("")
    const [exception, setException] = useState({ 
        loading: false,
        error: "",
        updatedData: ""
    })

    const {productId} = useParams()

    const successMessage = () => (
        <div
          className="alert alert-success mt-3"
          style={{ display: exception.updatedData ? "" : "none" }}
        >
          <h4>{exception.updatedData.name} created successfully</h4>
          <button type="button" class="btn btn-primary"
          onClick={() => setException({loading: false,error: false, updatedData: ""})}>Ok</button>
        </div>
      );

    
    useEffect(() => {
        productService.getProduct(productId)
            .then((data) => setProductData(data))
            .catch((error) => setException({...exception,error: error.msg}))

        adminService.getCategories()
            .then((data) => setCategories(data.categories))
            .catch((error) => setException({...exception, error: error.msg}))
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()
        setException({error: "", loading: true, updatedData: ""})
        productService.updateProduct({productId: productData._id, updatedProductData: productData})
            .then((data) => {
                setProductData(data)
                setException({...exception, loading: false, updatedData: data})
            })
            .catch((error) => {
                setException({loading: false, error: error.msg, updatedData: ""})
            })
    }

  return (
    <div>
    <div className=' m-5 p-6'>
        { successMessage() }
        <div className=''>
            <div className=''><h1>Update Product</h1></div>
        <form onSubmit={handleSubmit}>
        <div class="form-group">
            <input type="file" multiple="multiple"
                    onChange={(e) => setProductData({...productData, photos: e.target.files[0] })} 
                    class="form-control-file" id="Image" />
        </div>
            <div className="form-group mt-3 overflow-hidden">
                <input type="text" value={productData.name}
                        onChange={(e) => setProductData({...productData, name: e.target.value })}
                     className="form-control" id="Name" aria-describedby="emailHelp" placeholder={productData.name} />
                {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
            </div>
            <div className="form-group mt-3">
                {/* <label for="exampleInputPassword1">Password</label> */}
                {/* <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Description" /> */}
                <textarea className="form-control" 
                            value={productData.description}
                            onChange={(e) => setProductData({...productData, description: e.target.value })}
                            id="Description" rows="3" placeholder={productData.description}></textarea>
            </div>
            <div className="form-group mt-3">
                {/* <label for="exampleInputPassword1">Password</label> */}
                <input type="Number" value={productData.price}
                        onChange={(e) => setProductData({...productData, price: e.target.value })}
                        className="form-control" id="Price" placeholder={productData.price} />
            </div>
            <div className="form-group mt-3">
                {/* <label for="exampleInputPassword1">Password</label> */}
                <select className="form-control" 
                        value={productData.categoryId}
                        onChange={(e) => setProductData({...productData, categoryId: e.target.value})}
                        id="CategorySlector" placeholder={productData.categoryId}>
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
                <input type="number" value={productData.stock}
                        onChange={(e) => setProductData({...productData, stock: e.target.value})} 
                        className="form-control" id="Quantity" placeholder={productData.stock} />
            </div>
            <div className=''>
                <button type="submit" className="btn btn-primary mt-3">Submit</button>
                <Link className="btn btn-primary mt-3 ml-3" onClick={() => navigate("/admin-dashboard")}>Admin Home</Link>
            </div>
        </form>
        </div> 
    </div>
    </div>
  )
}

export default UpdateProduct