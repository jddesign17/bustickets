import axios from "axios";

export const createSchedule = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/schedule/create",
      data
    );
    return response.data
  } catch (error) {
    console.log(error);
  }
};
