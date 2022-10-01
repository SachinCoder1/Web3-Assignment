import React, { useContext, useState, useEffect } from "react";
import ConnectWallet from "../components/wallet/ConnectWallet";
import { MainContext } from "../context/MainContext";
import { Button, Input, Typography } from "@material-tailwind/react";
import { AiOutlineArrowRight } from "react-icons/ai";
import MainLayout from "../components/layouts/MainLayout";

export default function Wallet() {
  const { currentAccountAddress, addAddress, getAddresses, removeAddress } =
    useContext(MainContext);
  const [addressInput, setAddressInput] = useState("");
  const [isAdded, setIsAdded] = useState(2);

  useEffect(() => {
    getAddresses();
  }, [isAdded]);

  return (
    <MainLayout>
      <div className="flex flex-col justify-center items-center gap-10">
        {/* Connect Wallet Button with logic */}
        <ConnectWallet />

        {/* To Add the another address */}
        {currentAccountAddress.length > 2 ? (
          <>
            <div className="space-y-10">
              <Input
                name="address"
                value={addressInput}
                onChange={(e) => {
                  setAddressInput(e.target.value);
                }}
                label="Address e.g.0x00..."
              />
              <Button
                onClick={() => {
                  addAddress(addressInput);
                  setAddressInput("");
                  setIsAdded(isAdded + 1);
                }}
                className="flex items-center justify-center text-base gap-x-2 bg-primary"
                fullWidth
                disabled={!addressInput.length}
              >
                Add Address
                <AiOutlineArrowRight className="text-2xl" />
              </Button>
            </div>

            {/* All Address Lists */}
            <div className="flex flex-col justify-center gap-y-6">
              {getAddresses() &&
                getAddresses().length > 0 &&
                getAddresses().map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-x-2 gap-y-4 text-xl"
                  >
                    {item}
                    <Button
                      onClick={() => {
                        removeAddress(index);
                        setIsAdded(isAdded - 1);
                      }}
                      className="bg-red-500"
                      size="sm"
                    >
                      Remove Address
                    </Button>
                  </div>
                ))}
            </div>
          </>
        ) : (
          "Connect Wallet to add,remove accounts"
        )}
      </div>
    </MainLayout>
  );
}
