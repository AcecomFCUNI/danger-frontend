const axios = require("axios");

// axios.defaults.baseURL = "http://localhost:4000/api/covid/peru";
axios.defaults.baseURL = "https://acecom-danger.herokuapp.com/api/covid/peru";


let date = new Date();
let year = String(date.getFullYear());
let month = String(date.getMonth() + 1).padStart(2, "0");
let lastDay = String(date.getDate()).padStart(2, "0");
let lastDate = `${year}-${month}-${lastDay}`;

export default async function getDataFromAPI() {
  try {
    const { data } = await axios.get(`/${lastDate}`);
    return data.message.departments[0].departments;
  } catch (error) {
    throw new Error(error.message);
  }
}
