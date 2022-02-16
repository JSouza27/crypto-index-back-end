const fs = require('fs').promises;
// const currencies = require('./currencies.json');

const currenciesJson = 'currencies.json';

const readingFile = async () => {
  const talkerFile = await fs.readFile(currenciesJson, 'utf-8');
  const convertToJson = JSON.parse(talkerFile);

  return convertToJson;
};

const overwriting = (oldFile, newContent) => {
  const writeFile = fs.writeFile(oldFile, newContent);

  return writeFile;
};

const calculator = async (currency, rateFloat) => {
  const currencies = await readingFile();
  const result = currencies[currency] * rateFloat;

  return result;
};

const update = async (obj) => {
  const { currency, value } = obj;
  const currencies = await readingFile();

  currencies[currency] = value;
  
  const jsonString = JSON.stringify(currencies);

  overwriting(currenciesJson, jsonString);
};

const currenciesKeys = async () => {
  const currencies = await readingFile();

  return Object.keys(currencies);
};

module.exports = { calculator, update, readingFile, currenciesKeys };
