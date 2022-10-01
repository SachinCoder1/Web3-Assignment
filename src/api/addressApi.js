import axios from "axios";
const BASE_URL = "http://localhost:8000/api/v1/";

export const loginUser = async (address) => {
  try {
    const { data } = await axios.post(`${BASE_URL}wallet/addAddress`, {
      address,
    });

    return data;
  } catch (error) {
    console.log("error while login", error);
  }
};

export const getAddress = async (address) => {
  try {
    const { data } = await axios.get(
      `http://localhost:8000/api/v1/wallet/getAddress?address=${address}`
    );
    return data;
  } catch (error) {
    console.log("error while getting address", error);
  }
};

export const addToAddress = async (address, addressToAdd) => {
  try {
    const { data } = await axios.put(
      `${BASE_URL}wallet/addToAddress`,
      {
        address,
        addressToAdd,
      },
    );

    return data;
  } catch (error) {
    console.log("error while adding to address", error);
  }
};

export const removeFromAddress = async (address, addressToRemove) => {
  try {
    const { data } = await axios.delete(
      `${BASE_URL}wallet/removeAddress/?address=${address}&addressToRemove=${addressToRemove}`,
      {
        address,
        addressToRemove: addressToRemove,
      },
    );

    return data;
  } catch (error) {
    console.log("error while removing", error);
  }
};
