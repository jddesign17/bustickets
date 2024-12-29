import axios from "axios";

export const createSchedule = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/schedule/create",
      data
    );
  } catch (error) {
    console.log(error);
  }
};


export const getSchedule = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/schedule/data");
    return response.data
  } catch (error) {
    console.log(error);
  }
};

export const updateSchedule = async (data) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/api/schedule/update`,
      data
    );
    return response.data
  } catch (error) {
    console.log(error);
  }
};