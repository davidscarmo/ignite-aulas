import axios from "axios";

export const api = axios.create({
  // could hide https://localhost:3000, api request base url and application base url are the same
  baseURL: "http://localhost:3000/api",
});
