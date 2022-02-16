const axios = require('axios');

const execute = async () => {
  const url = 'https://api.coindesk.com/v1/bpi/currentprice/BTC.json';
  const quotation = await axios.get(url);

  return quotation.data;
};

module.exports = { execute };
