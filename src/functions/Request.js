import axios from "axios";

axios.defaults.baseURL = "https://acecom-danger.herokuapp.com";

const Get = async (route) => {
  try {
    const { data } = await axios.get(route);
    return data;
  } catch (error) {
    return error;
  }
};

const Post = async (route, json = {}) => {
  try {
    const { data } = await axios.post(route, json);
    return data;
  } catch (error) {
    return error;
  }
};

export { Get, Post };
