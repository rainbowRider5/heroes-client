import axios from "axios";

const fetchHeroes = (first, skip) =>
  axios.request({
    url: "/heroes",
    method: "GET",
    params: { first, skip },
  });

const addHero = (hero) =>
  axios.request({
    url: "/heroes",
    method: "POST",
    data: { ...hero },
  });

const removeHero = (id) =>
  axios.request({
    url: `/heroes/${id}`,
    method: "DELETE",
  });

const heroesAPI = { fetchHeroes, addHero, removeHero };

export default heroesAPI;
