import axios from "axios";

const fetchTypes = () =>
  axios.request({url: "http://localhost:4000/types", method: "GET"})

const heroesAPI = { fetchTypes };

export default heroesAPI;
