const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/api/app');
const HttpStatus = require('../src/utils/httpStatus');
const { readingFile } = require('../src/utils/currenciesAux');
const sinon = require('sinon');
const fs = require('fs').promises;

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /api/crypto/btc', () => {
  describe('Deve buscar as cotações', () => {
    let response;

    before(async () => {
      const authRequest = await chai.request(server)
        .post('/api/login')
        .send({
          "email": "email@mail.com",
          "password": "135982"
        });

      const token = authRequest.body.token;

      response = await chai.request(server)
        .get('/api/crypto/btc')
        .set('authorization', token);
    });

    it('retorna código de status 200', () => {
      expect(response).to.have.status(HttpStatus.ok);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('o objeto de resposta possui as propriedades "USD", "BRL", "EUR" e "CAD"', () => {
      expect(response.body.bpi).to.have.property('USD');
      expect(response.body.bpi).to.have.property('BRL');
      expect(response.body.bpi).to.have.property('EUR');
      expect(response.body.bpi).to.have.property('CAD');
      expect(response.body.bpi).to.have.property('BTC');
    });

    it('as propriedades "BRL", "EUR" e "CAD" devem ter a chave rate do tipo string', () => {
      expect(response.body.bpi.BRL.rate).to.be.a('string');
      expect(response.body.bpi.EUR.rate).to.be.a('string');
      expect(response.body.bpi.CAD.rate).to.be.a('string');
    });

    it('as propriedades "BRL", "EUR" e "CAD" devem ter a chave rate_float do tipo float', () => {
      expect(response.body.bpi.BRL['rate_float']).to.be.a('number');
      expect(response.body.bpi.EUR['rate_float']).to.be.a('number');
      expect(response.body.bpi.CAD['rate_float']).to.be.a('number');
    });
  });
});

describe('POST /api/crypto/btc', () => {
  const FILE_CONTENT = {
    BRL: 6,
  };

  describe('Deve ser possível atualizar o valor da cotação da moeda no arquivo "currencies.json"', () =>{
    let response;

    before(async() => {

      const authRequest = await chai.request(server)
        .post('/api/login')
        .send({
          "email": "email@mail.com",
          "password": "135982"
        });

      const token = authRequest.body.token;

      response = await chai.request(server)
        .post('/api/crypto/btc')
        .set('authorization', token)
        .send({
          "currency": "BRL",
          "value": 6
        });
    });

    it('retorna código de status 200', () => {
      expect(response).to.have.status(HttpStatus.ok);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('o objeto de resposta possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" tem o valor "Valor alterado com sucesso!"', () => {
      expect(response.body.message).to.be.equals('Valor alterado com sucesso!');
    });

    it('o arquivo "currencies.json" deve ter sido atualizado',async () => {
      const currencies = await readingFile();

      expect(currencies.BRL).to.equal('6.00');
    });
  });

  describe('Quando é passado o "currency" inválido', () => {
    let response;

    before(async () => {
      const authRequest = await chai.request(server)
        .post('/api/login')
        .send({
          "email": "email@mail.com",
          "password": "135982"
        });

      const token = authRequest.body.token;

      response = await chai.request(server)
        .post('/api/crypto/btc')
        .set('authorization', token)
        .send({
          "currency": "JPY",
          "value": 10
        });
    });

    it('retorna código de status 400', () => {
      expect(response).to.have.status(HttpStatus.badRequest);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('o objeto de resposta possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" tem o valor "Moeda inválida"', () => {
      expect(response.body.message).to.be.equals('Moeda inválida');
    });
  });

  describe('Quando é passado o "value" inválido', () => {
    let response;

    before(async () => {
      const authRequest = await chai.request(server)
        .post('/api/login')
        .send({
          "email": "email@mail.com",
          "password": "135982"
        });

      const token = authRequest.body.token;

      response = await chai.request(server)
        .post('/api/crypto/btc')
        .set('authorization', token)
        .send({
          "currency": "CAD",
          "value": 0
        });
    });

    it('retorna código de status 400', () => {
      expect(response).to.have.status(HttpStatus.badRequest);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('o objeto de resposta possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" tem o valor "Valor inválido"', () => {
      expect(response.body.message).to.be.equals('Valor inválido');
    });
  });

  describe('Quando é feita a requisição sem token', () => {
    let response;

    before(async () => {
      response = await chai.request(server)
        .post('/api/crypto/btc')
        .set('authorization', '')
        .send({
          "currency": "CAD",
          "value": 40
        });
    });

    it('retorna código de status 401', () => {
      expect(response).to.have.status(HttpStatus.unauthorized);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('o objeto de resposta possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" tem o valor "Token inválido"', () => {
      expect(response.body.message).to.be.equals('Token inválido');
    });
  });
});

describe('GET /currencies', () => {
  describe('Deve ser possível retornar a cotação das moedas salvas', async() => {
    let response;
    const currencies = await readingFile();

    before(async() => {

      const authRequest = await chai.request(server)
        .post('/api/login')
        .send({
          "email": "email@mail.com",
          "password": "135982"
        });

      const token = authRequest.body.token;

      response = await chai.request(server)
        .get('/api/currencies')
        .set('authorization', token);
    });

    it('retorna código de status 200', () => {
      expect(response).to.have.status(HttpStatus.ok);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('o objeto deve conter as cotações das moedas', () => {
      expect(response.body).to.equal(currencies);
    });
  });

  describe('Retorna status 500 caso exista algum erro', async() => {
    let response;

    before(async() => {

      const authRequest = await chai.request(server)
        .post('/api/login')
        .send({
          "email": "email@mail.com",
          "password": "135982"
        });

      const token = authRequest.body.token;

      response = await chai.request(server)
        .get('/api/currencies')
        .set('authorization', token);
    });
  });
});

describe('GET /rote-inexistente', () => {
  describe('Quando feita uma requisição para uma rota que não existe', () => {
    let response;

    before(async () => {
      const authRequest = await chai.request(server)
        .post('/api/login')
        .send({
          "email": "email@mail.com",
          "password": "135982"
        });

      const token = authRequest.body.token;

      response = await chai.request(server)
        .get('/rote-inexistente')
        .set('authorization', token);
    });

    it('retorna código de status 404', () => {
      expect(response).to.have.status(HttpStatus.notFound);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('o objeto de resposta possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" tem o valor "Endpoint não encontrado"', () => {
      expect(response.body.message).to.be.equals('Endpoint não encontrado');
    });
  });
});
