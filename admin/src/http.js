import axios from 'axios'
import Vue from 'vue'
import router from './router'


const http = axios.create({
    baseURL: "http://localhost:3000/admin/api"
})


// Add a request interceptor
http.interceptors.request.use(function (config) {
    // Do something before request is sent // add a sapce after Bearer
    if(localStorage.token){
        config.headers.Authorization = 'Bearer ' + localStorage.token
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

//http response interceptor
http.interceptors.response.use( res => {
    return res
}, err => {
    if(err.response.data.message){
        Vue.prototype.$message({
            type: 'error',
            message: err.response.data.message
        })     
       
        // equal to back-end's error code
        //if error redirect back to login
        if(err.response.data.statusCode === 401){
            router.push('/login')
        }
    }

    return Promise.reject(err)
})

export default http