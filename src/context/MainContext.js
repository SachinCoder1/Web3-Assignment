import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { urls } from "../constants";

export const MainContext = createContext("");

export const MainProvider = ({ children }) => {
  let navigate = useNavigate();
  const [currentAccountAddress, setCurrentAccountAddress] = useState("");

  const addAddress = address => {
    if (localStorage.getItem("addresses")) {
      const allAddresses = JSON.parse(localStorage.getItem("addresses"));
      if (!allAddresses[currentAccountAddress]) {
        allAddresses[currentAccountAddress] = [];
      } else {
        allAddresses[currentAccountAddress].push(address);
      }
      localStorage.setItem("addresses", JSON.stringify(allAddresses));
    } else {
      const addresses = {};
      addresses[currentAccountAddress] = [];
      addresses[currentAccountAddress].push(address)
      localStorage.setItem("addresses", JSON.stringify(addresses));
    }
  };

  const getAddresses = () => {
    if (!currentAccountAddress || currentAccountAddress.length < 2 || !localStorage.getItem("addresses")) return;

    const addresses = JSON.parse(localStorage.getItem("addresses"));
    return addresses[currentAccountAddress];
  };

  const removeAddress = index => {
     if(!currentAccountAddress) return;
     const allAddresses = JSON.parse(localStorage.getItem('addresses'));  
     allAddresses[currentAccountAddress].splice(index, 1)
     localStorage.setItem("addresses", JSON.stringify(allAddresses));
     
  }

  useEffect(() => {
    if (!currentAccountAddress) {
      navigate(urls.wallet);
    }
  }, []);

  return (
    <MainContext.Provider
      value={{
        currentAccountAddress,
        setCurrentAccountAddress,
        addAddress,
        getAddresses,
        removeAddress,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
