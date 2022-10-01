import React, { useContext, useState, useEffect } from "react";
import { MainContext } from "../context/MainContext";
import MainLayout from "../components/layouts/MainLayout";
import { Select, Option } from "@material-tailwind/react";
import { fetchNfts } from "../api/NftApi";

import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { urls } from "../constants";

export default function Nfts() {
  const navigate = useNavigate();
  const { currentAccountAddress, getAddresses } = useContext(MainContext);
  const [selectedAddress, setSelectedAddress] = useState(currentAccountAddress);
  const [nftData, setNftData] = useState([]);
  useEffect(() => {
    if (!currentAccountAddress) {
      navigate(urls.wallet);
    }
    const fetchNft = async () => {
      const data = await fetchNfts(selectedAddress);
      if (data) {
        setNftData(data.nfts);
      } else {
        setNftData([]);
      }
    };
    fetchNft();
  }, [selectedAddress]);

  return (
    <MainLayout>
      <Select
        variant="outlined"
        onChange={(e) => setSelectedAddress(e)}
        label="Choose Address"
      >
        {getAddresses() && getAddresses().length > 0 ? (
          getAddresses()?.map((item, index) => (
            <Option key={index} value={item}>
              {item}
            </Option>
          ))
        ) : (
          <Option key={1} value={currentAccountAddress}>
            {currentAccountAddress}
          </Option>
        )}
      </Select>
      <div className="grid grid-cols-3 gap-y-10 mt-14">
        {nftData.length
          ? nftData.map((item, index) => (
              <Card key={index} className="w-96">
                <CardHeader floated={false} color="blue" className="relative h-56">
                  <img
                    src={item?.file_url}
                    alt="img"
                    className="h-full w-full"
                  />
                </CardHeader>
                <CardBody className="text-center">
                  <Typography variant="h5" className="mb-2">
                    {item.name ? item.name : "N/A"}
                  </Typography>
                  <Typography variant="p" className="mb-2">
                    {item.description
                      ? item.description.slice(0, 80) + "..."
                      : "N/A"}
                  </Typography>
                </CardBody>
              </Card>
            ))
          : "No Nfts Found"}
      </div>
    </MainLayout>
  );
}
