import axios from "axios"
import conf from "../conf/conf"

class ProductService {

    constructor() {
        this.backendUrl = conf.backendUrl
    }

    async createProduct({name, description, price, category, stock, photo}) {
        const product = await axios.post(`${this.backendUrl}/product/create`, 
                        {name, description, price, category, stock, photo},
                        {
                            withCredentials: true
                        })
                        .then(response => response.data)
                        .then(product => product.data)
                        .catch(err => {throw err})
        return product
    }

    async getProducts() {
        const products = await axios.get(`${this.backendUrl}/product/products`, 
                        {},
                        {
                            withCredentials: true
                        })
                        .then(response => response.data)
                        .then(product => product.data)
                        .catch(err => {throw err})
        return products
    }

    async getProduct() {
        const product = await axios.get(`${this.backendUrl}/product/product/:productId`, 
                        {},
                        {
                            withCredentials: true
                        })
                        .then(response => response.data)
                        .then(product => product.data)
                        .catch(err => {throw err})
        return product
    }


}

const productService = new ProductService

export default productService