import axios from "axios";
export const createBuses = async (fromData) => {
  console.log(fromData);
  try {
    const response = await axios.post(
      "http://localhost:3000/api/buses/create",
      fromData,
      {
        headers:{
          "Content-Type": "multipart/form-data"
        }
      }
    );

    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const getBuses = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/buses/data");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
