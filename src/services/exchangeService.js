const httpStatus = require('../utils/httpStatus');
const cointDeskService = require('./coinDeskService');
const { calculator, update, readingFile } = require('../utils/currenciesAux');

const addCurrency = (code, rate, description, reateFloat) => {
  const newCurrency = {
    code,
    rate: rate.toLocaleString('en'),
    description,
  };

  newCurrency['rate_float'] = reateFloat;

  return newCurrency;
};

const getExchangeRate = async () => {
  const getQuote = await cointDeskService.execute();

  const rateUSD = getQuote.bpi.USD.rate_float;
  const rateBrl = await calculator('BRL', rateUSD);
  const rateEUR = await calculator('EUR', rateUSD);
  const rateCAD = await calculator('CAD', rateUSD);

  getQuote.bpi.BRL = addCurrency('BRL', rateBrl, 'Brazilian Real', rateBrl);
  getQuote.bpi.EUR = addCurrency('EUR', rateEUR, 'Euro', rateEUR);
  getQuote.bpi.CAD = addCurrency('CAD', rateCAD, 'Canadian Dollar', rateCAD);

  return {
    code: httpStatus.ok,
    notification: getQuote,
  };
};

const updateCurrency = async (obj) => {
  await update(obj);

  return {
    code: httpStatus.ok,
    notification: { message: 'Valor alterado com sucesso!' },
  };
};

const getCurrencies = async () => {
  const currencies = await readingFile();

  return {
    code: httpStatus.ok,
    notification: currencies,
  };
};

module.exports = { getExchangeRate, updateCurrency, getCurrencies };
