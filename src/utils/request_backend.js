import axios from "axios";

// create an axios instance
const service_backend = axios.create({
  baseURL: "http://localhost:5001", // url = base url + request url
  timeout: 15 * 1000// request timeout
});

service_backend.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.log("error");
    console.log({...error}); // for debug
    return Promise.reject(error);
  }
);

export default service_backend;
