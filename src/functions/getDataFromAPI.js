const axios = require("axios");

// axios.defaults.baseURL = "http://localhost:4000/api/covid/peru";
axios.defaults.baseURL = "https://acecom-danger.herokuapp.com";

const getCurrentDate = async () => {
  try {
    const {
      data: {
        message: { currentDate },
      },
    } = await axios.get("/currentDate");
    return currentDate;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getDataFromAPI = async () => {
  try {
    const currentDate = await getCurrentDate();
    const { data } = await axios.post("/dataPerDay", {
      args: {
        date: currentDate,
      },
    });
    return data.message.departmentsData.departments;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default getDataFromAPI;
