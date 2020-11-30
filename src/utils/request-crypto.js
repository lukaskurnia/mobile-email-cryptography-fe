import axios from "axios";

// create an axios instance
const serviceCrypto = axios.create({
  baseURL: "http://localhost:5001", // url = base url + request url
  timeout: 15 * 1000 // request timeout
});

serviceCrypto.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.log("error");
    console.log({...error}); // for debug
    return Promise.reject(error);
  }
);

export default serviceCrypto;
