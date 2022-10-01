import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAddress,
  loginUser,
  addToAddress,
  removeFromAddress,
} from "../api/addressApi";
import { urls } from "../constants";

export const MainContext = createContext("");

export const MainProvider = ({ children }) => {
  let navigate = useNavigate();
  const [currentAccountAddress, setCurrentAccountAddress] = useState("");

  const addAddress = async () => {
    if (!currentAccountAddress) return;
    const data = await loginUser(currentAccountAddress);
    if (data.token.length > 10) {
      localStorage.setItem("accessToken", data.token);
    }

    return true;
  };
  const addToAddresses = async (otherAddress) => {
    if (!currentAccountAddress) return;
    const data = await addToAddress(currentAccountAddress, otherAddress);
    if (data.address === otherAddress) {
      return true;
    }
    return false;
  };

  const getAddresses = async () => {
    if (!currentAccountAddress) return;

    const data = await getAddress(currentAccountAddress);
    return data?.otherAddresses;
  };

  const removeAddress = async (addressToRemove) => {
    if (!currentAccountAddress) return;
    const data = await removeFromAddress(
      currentAccountAddress,
      addressToRemove
    );
    console.log("remove data", data);
    if (data.address === addressToRemove) {
      return true;
    }

    return false;
  };

  useEffect(() => {
    if (!currentAccountAddress) {
      navigate(urls.wallet);
    }
  }, []);

  useEffect(() => {
    addAddress();
    // addToAddresses("0282083938938383")
    // getAddresses()
    // removeAddress("0282083938938384")
  }, [currentAccountAddress]);

  return (
    <MainContext.Provider
      value={{
        currentAccountAddress,
        setCurrentAccountAddress,
        addAddress,
        addToAddresses,
        getAddresses,
        removeAddress,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
