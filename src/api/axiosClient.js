import axios from 'axios';
import queryString from 'query-string';
// Set up default config for http requests here
const baseUrl = "http://localhost:8080/api";
// const baseUrl = "http://192.168.0.104:8080/api";
const axiosClient = axios.create({
    baseURL: baseUrl,
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params),
});
axiosClient.interceptors.request.use(async (config) => {
    // Handle token here ...
    return config;
})
axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        console.log(response);
        return response.data;
    }
    return response;
}, (error) => {
    // Handle errors
    throw error;
});
export default axiosClient;