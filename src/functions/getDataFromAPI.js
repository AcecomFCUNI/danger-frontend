const axios = require("axios");

// axios.defaults.baseURL = "http://localhost:4000/api/covid/peru";
axios.defaults.baseURL = "https://acecom-danger.herokuapp.com/api/covid/peru";

const getCurrentDate = async () => {
  try {
    const {
      data: {
        message: { currentDate },
      },
    } = await axios.get("/currentDate");
    return currentDate;
  } catch (error) {
    throw new Error("An error occurred requesting current date");
  }
};

const getDataFromAPI = async () => {
  try {
    const currentDate = await getCurrentDate();
    const { data } = await axios.get(`/${currentDate}`);
    return data.message.departments[0].departments;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default getDataFromAPI;
