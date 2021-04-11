import axios from "axios";

const fetchHeroes = () =>
  axios.request({ url: "http://localhost:4000/heroes", method: "GET" });

const addHero = (hero) =>
  axios.request({ url: "http://localhost:4000/heroes", method: "POST", data: {...hero} });

const removeHero = (id) =>
  axios.request({ url: `http://localhost:4000/heroes/${id}`, method: "DELETE" });


const heroesAPI = { fetchHeroes, addHero, removeHero };

export default heroesAPI;
