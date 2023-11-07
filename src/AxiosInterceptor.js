import axios from "axios";
import {logout} from "./helpers/helper.js";
import {Notify} from "notiflix";

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    if (localStorage.token != undefined) {
        config.headers.Authorization = `Bearer ${localStorage.token}`;
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response.status == 401) {
        logout()
    } else if (error.response.status == 500) {
        Notify.failure('Internal Server Error. Please try again later.')
    }

    return Promise.reject(error);
});
