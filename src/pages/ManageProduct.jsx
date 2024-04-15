import productService from '@/backend/product'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function ManageProduct() {
    const [productData, setProductData] = useState("")
    const [reload, setReload] = useState(false)

    const [exeptioins, setExceptions] = useState({
        error: "",
        loading: false
    })

    useEffect(() => {
        setExceptions({...exeptioins, loading: true})
        productService.getProducts()
            .then((data) => {
                console.log(data)
                setProductData(data.products)
                setExceptions({...exeptioins, loading: false})
            })
            .catch((error) => {
                setExceptions({error: error.msg, loading: false})
            })
    }, [reload])

    const handleDelete = (productId) => {
        productService.deleteProduct(productId)
            .then(() => { 
                console.log("Deleted Success")
                setReload(true)
            })
            .catch((error) => setExceptions({...exeptioins, error: error.msg}))
    }
    
    const handleUpdate = (productId) => {
        console.log("Delete Handle")
    }
    return (
    <div className='mt-4'>
        <table class="table">
        <thead>
            <tr>
            <th scope="col">Name</th>
            <th scope="col">Update</th>
            <th scope="col">Delete</th>
            </tr>
        </thead>
        <tbody>
            {
                productData && (
                    productData.map((product) => (
                        <tr key={product._id}>
                            <td >{product.name}</td>
                            <td>
                                <Link
                                    className="btn btn-success"
                                    to={`/admin/product/update/${product._id}`}
                                >
                                    <span className="">Update</span>
                                </Link>
                            </td>
                            <td onClick={() => handleDelete(product._id)}>
                                <div
                                    className="btn btn-danger"
                                >
                                    <span className="">Delete</span>
                                </div>
                            </td>
                        </tr>
                    ))
                )
            }
        </tbody>
        </table>
    </div>
  )
}

export default ManageProduct