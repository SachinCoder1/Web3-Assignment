import React, { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import { AiOutlinePlus } from "react-icons/ai";
import { Button } from "@material-tailwind/react";
import { networks } from "../../configs/walletConfigs";
import { MainContext } from "../../context/MainContext";

export default function ConnectWallet() {
  const { currentAccountAddress, setCurrentAccountAddress, getAddresses } =
    useContext(MainContext);

  useEffect(() => {
    if (window) {
      if (window.ethereum) {
        window.ethereum.on("accountsChanged", (accounts) => {
          if (accounts.length > 0) {
            setCurrentAccountAddress(accounts[0]);
            connectWallet();
          } else {
            setCurrentAccountAddress("");
            localStorage.removeItem("injected");
            console.log("Disconnected");
          }
        });
      }
    }

    if (localStorage.getItem("injected")) {
      connectWallet();
    }
  }, []);

  const connectWallet = async () => {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      if (provider.network !== "matic") {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              ...networks["polygon"],
            },
          ],
        });
      }
      const account = provider.getSigner();
      const Address = await account.getAddress();
      setCurrentAccountAddress(Address);
      localStorage.setItem("injected", "web3");
    } catch (error) {
      console.log("Error while connected wallet ", error);
    }
  };

  return (
    <div>
      {currentAccountAddress.length > 2 ? (
        <div className="bg-slate-200 py-2.5 rounded-2xl pl-4 cursor-pointer">
          <span className="text-black">
            {currentAccountAddress.slice(0, 6)}...
            {currentAccountAddress.slice(currentAccountAddress.length - 4)}
          </span>
        </div>
      ) : (
        <Button
          className="flex items-center justify-center gap-x-2 bg-primary"
          onClick={connectWallet}
        >
          <AiOutlinePlus className="text-xl text-white" />
          Connect Wallet
        </Button>
      )}
    </div>
  );
}
