import axios from "axios"
import conf from "../conf/conf.js"

class AuthService {
    constructor () {
        this.backendUrl= conf.backendUrl,
        this.token = null,
        this.currentUser = null
    }

    async createAccount ({email, password, name, lastname}) {
        try {
            const userAccount = await axios.post(`${this.backendUrl}/auth/signUp`, {email, password, name, lastname},{
                                    withCredentials: true
                                })
                                .then(response => response.data)
                                .then(user => user.data)
    
            if(!userAccount) {
                return userAccount
            } 
            
            this.currentUser = userAccount

            const token =  await this.login({email, password})
            return token 
        } catch (error) {
            throw error
        }
    }

    async login ({email="", password=""}) {
        try {
            const user = await axios.post(`${this.backendUrl}/auth/loginUser`, {email, password}, {
                withCredentials: true
            })
                    .then(response => response.data)
                    .then(user => user.data)

            this.currentUser = user
            console.log("getCurrentUser :", await this.getCurrentUser())
            console.log("Current user is :", this.currentUser)
            return this.currentUser
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser (userId) {
        try {
            // Fetching Current User from access Token
            const userFromAccessToken = await axios.get(`${this.backendUrl}/user`, {
                withCredentials: true
            })
            .then((response) => response.data)
            .then((userData) => userData.data)

            return userFromAccessToken

        } catch (error) {
            try {
                // Fetching Current User from Refresh Token
                const userFromRefreshToken = await axios.post(`${this.backendUrl}/user/refresh-token`, 
                {}, 
                {
                    withCredentials: true
                })
                .then((response) => response.data)
                .then((userData) => userData.data)
    
                return userFromRefreshToken
    
            } catch (error) {
                throw error
            }
        }
    }

    async getCurrentUserWithRefreshToken (userId) {
        try {
            const user = await axios.post(`${this.backendUrl}/user/refresh-token`, {}, {
                withCredentials: true
            })
            .then((response) => response.data)
            .then((userData) => userData.data)

            return user

        } catch (error) {
            throw error
        }
    }

    async logout() {
        try {
            const response = await axios.post(`${this.backendUrl}/auth/logoutUser`, {}, {
                withCredentials: true
            })
            return response
        } catch (error) {
            throw error
        }
    }

}

const authService = new AuthService

export default authService