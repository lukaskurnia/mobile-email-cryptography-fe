import axios from "axios";

//192.168.0.5:5000
// create an axios instance
const service = axios.create({
  baseURL: "http://localhost:5000", // url = base url + request url
  timeout: 15 * 1000 // request timeout
});

service.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.log("error");
    console.log({...error}); // for debug
    return Promise.reject(error);
  }
);

export default service;
