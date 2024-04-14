import conf from "../conf/conf"
import axios from "axios"


class AdminService {

    constructor () {
        this.backendUrl= conf.backendUrl
    }

    async createCategory({name}) {
        try {
            const category = await axios.post(`${this.backendUrl}/category/create`, {name: name}, {
                                withCredentials: true
                            })
                            .then((response) => response.data)
                            .then((categoryData) => categoryData.data)
            console.log("Category in admin service :", category )
            return category 
        } catch (error) {
            console.log("error is :", error)
            throw error
        }
    }

    async getCategories() {
        try {
            const category = await axios.get(`${this.backendUrl}/category/categories`, {}, {
                                withCredentials: true
                            })
                            .then((response) => response.data)
                            .then((categoryData) => categoryData.data)
            console.log("Categories in admin service :", category )
            return category 
        } catch (error) {
            console.log("error is :", error)
            throw error
        }
    }
}

const adminService = new AdminService()

export default adminService