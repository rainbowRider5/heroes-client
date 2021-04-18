import axios from "axios";

const fetchTypes = () => axios.request({ url: "/types", method: "GET" });

const typesAPI = { fetchTypes };

export default typesAPI;
