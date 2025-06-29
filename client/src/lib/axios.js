import axios from "axios";

export const AxiosInstance = axios.create({
    baseURL:'https://auth-system-server-uhow.onrender.com/api',
    withCredentials:true
});
