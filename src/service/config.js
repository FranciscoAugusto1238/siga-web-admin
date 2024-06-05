import axios from "axios";

export const http = axios.create({
  //Local
  baseURL: "http://localhost:8081/",
});
