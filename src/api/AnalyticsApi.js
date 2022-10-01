import axios from "axios";

export const fetchTimestamp = async (contractAddress) => {
  const URL = `https://ethereum.rest.mnemonichq.com/pricing/v1beta1/prices/by_contract/${contractAddress}?duration=DURATION_1_DAY&groupByPeriod=GROUP_BY_PERIOD_1_HOUR`;
  try {
    const { data } = await axios.get(URL, {
      headers: {
        "x-api-key": process.env.REACT_APP_MNEMONIC_API_KEY,
      },
    });
    return data;
  } catch (error) {
    console.log("error in fetchNFts", error);
  }
};
