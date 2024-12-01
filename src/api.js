import axios from "axios";

const api = axios.create({
   
    baseURL: "/proxy-java-api"
});

export default api;
