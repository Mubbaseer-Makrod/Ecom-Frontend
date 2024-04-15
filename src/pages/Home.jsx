import productService from '@/backend/product'
import Card from '@/components/Card'
import React, { useEffect, useState } from 'react'

function Home() {
    const [products, setProducts] = useState([])

    const [exceptions, setExceptions] = useState({
        error: "",
        loading: false,
    })

    useEffect(() => {
        productService.getProducts()
            .then((data) => {
                console.log(data)
                setProducts(data.products)
                setExceptions({...exceptions, loading: false})
            })
            .catch((error) => {
                setExceptions({error: error.msg, loading: false})
            })
    },[])
  return (
    <div className='grid grid-cols-3 m-3 max-h-[33%]'>
        { products.length >= 0 && (
            products.map((product) => (
                <Card image={product.photos[0]} description={product.description} price={product.price}/>
            ))
        )}
    </div>
  )
}

export default Home