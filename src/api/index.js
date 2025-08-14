import axios from "axios";
import { METHODS } from "../utils/methods";

const api = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    console.log("config", config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log("response", response);
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const setHeaders = (key = "", value) => {
  api.defaults.headers[key] = value;
};

const client = ({
  method = METHODS.GET,
  url = "",
  withCredentials = false,
  auth,
  data,
  ...otherParams
}) => {
  return api({
    method,
    url,
    withCredentials,
    auth,
    data,
    ...otherParams,
  });
};

export default client;
