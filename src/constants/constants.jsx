import Cookies from "js-cookie" 

export const BACKEND_SERVER = 'http://localhost:80/photography_api'
export const JWT_TOKEN = Cookies.get("authJWTToken")