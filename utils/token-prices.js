const axios = require("axios");
const api = require("../api");

const getSolPrice = async () => {
  try {
    const response = await axios.get(`${api.price}?ids=SOL`);
    const price = response?.data?.data?.SOL?.price;
    return price;
  } catch (error) {
    console.log("getSolPrice", error);
    return 0;
  }
};

const getMarinadeStakeingPrice = async () => {
  try {
    const res = await axios.get(api.staking);
    const validatorInfoArray = res?.data?.planned;
    return validatorInfoArray;
  } catch (error) {
    console.log("getMarinadeStakeingPrice", error);
    return 0;
  }
};

module.exports = { getSolPrice, getMarinadeStakeingPrice };
