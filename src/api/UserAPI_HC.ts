import axios from "axios";

const REQRES_URI = "https://reqres.in/api";

const apiInstance = () => {
  const getInstance = axios.create({
    baseURL: REQRES_URI,
    headers: { "content-type": "json-type" },
    // timeout: 10000,
  });
  return getInstance;
};
const api = apiInstance();
export { api };
