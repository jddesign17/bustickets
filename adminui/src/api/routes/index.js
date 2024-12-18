import axios from "axios";

export const createRoutes = async (data) => {
  try {
    console.log("data", data);
    const response = await axios.post(
      "http://localhost:3000/api/routes/create",
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addStops = async (data, itemid) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/api/routes/stop/${itemid}`,
      data
    );
    console.log(response.data);
  } catch (err) {
    console.log(err);
  }
};

export const getdata = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/routes/data/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const routedata = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/routes/data");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
