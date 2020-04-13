const axios = require("axios");

// axios.defaults.baseURL = "http://localhost:4000/api/covid/peru";
// axios.defaults.baseURL =
//   "https://acecom-danger.herokuapp.com/api/covid/peru/totalData";

const getTotalDataOf = async (nameTotalData) => {
  try {
    const { data } = await axios.get(
      `/totalData/${nameTotalData.toLowerCase()}`
    );
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default getTotalDataOf;
