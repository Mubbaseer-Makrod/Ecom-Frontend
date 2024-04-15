import axios from "axios"
import conf from "../conf/conf"

class ProductService {

    constructor() {
        this.backendUrl = conf.backendUrl
    }

    async createProduct({image, name, description, price, categoryId, stock, photos}) {
        const product = await axios.post(`${this.backendUrl}/product/create`, 
                        {image, name, description, price, categoryId, stock, photos},
                        {
                            withCredentials: true,
                            headers: {
                                "Content-Type": "multipart/form-data",
                            }
                        })
                        .then(response => response.data)
                        .then(product => product.data)
                        .catch(err => {throw err})
        return product
    }

    async getProducts() {
        const products = await axios.get(`${this.backendUrl}/product/list/products`, 
                        {},
                        {
                            withCredentials: true
                        })
                        .then(response => response.data)
                        .then(product => product.data)
                        .catch(err => {throw err})
        return products
    }

    async getProduct(productId) {
        const product = await axios.get(`${this.backendUrl}/product/${productId}`, 
                        {},
                        {
                            withCredentials: true
                        })
                        .then(response => response.data)
                        .then(product => product.data)
                        .catch(err => {throw err})
        return product
    }

    async updateProduct({productId, updatedProductData}) {
        const product = await axios.put(`${this.backendUrl}/product/${productId}`, 
                        updatedProductData,
                        {
                            withCredentials: true
                        })
                        .then(response => response.data)
                        .then(product => product.data)
                        .catch(err => {throw err})
        return product
    }

    async deleteProduct(productId) {
        await axios.delete(`${this.backendUrl}/product/${productId}`, 
                        {
                            withCredentials: true
                        })
                        .then(() => {return true})
                        .catch(err => { return false})
    }


}

const productService = new ProductService

export default productService