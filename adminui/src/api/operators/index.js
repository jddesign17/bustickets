import axios from "axios";
import { useEffect, useState } from "react";

export const createOperator = async (formdata) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/operator/create",
      formdata
    );
    console.log(response.data);
  } catch (error) {
    console.error("Error creating operator:", error);
  }
};

export const useGetOperators = () => {
  const [operators, setOperators] = useState([]);

  useEffect(() => {
    fetchOperators();
  }, [operators]);

  const fetchOperators = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/operator/data"
      );
      setOperators(response.data);
    } catch (error) {
      console.error("Error fetching operators:", error);
    }
  };

  return operators;
};

export const DeleteOperator = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/operator/delete/${id}`
    );
    console.log(response.data);
  } catch (error) {
    console.error("Error deleting operator:", error);
  }
};


export const updateOperator = async (formdata, id) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/api/operator/update/${id}`,
      formdata
    );
    console.log(response.data);
  } catch (error) {
    console.error("Error updating operator:", error);
  }
};