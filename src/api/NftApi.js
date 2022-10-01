import axios from "axios";

export const fetchNfts = async (address, chain = "polygon", pageSize = 10) => {
  const URL = `https://api.nftport.xyz/v0/accounts/${address}?chain=${chain}&page_size=${pageSize}`;
  try {
    const { data } = await axios.get(URL, {
      headers: {
        Authorization: process.env.REACT_APP_NFTPORT_API_KEY,
      },
    });
    return data;
  } catch (error) {
    console.log("error in fetchNFts", error);
  }
};
