const chai = require('chai');
const chaiHttp = require('chai-http');
const HttpStatus = require('../../src/utils/httpStatus');
const server = require('../../src/api/app');

chai.use(chaiHttp);

const { expect } = chai;
const status = new HttpStatus();

describe('GET /api/', () => {
  describe('Verifica se a "URL" base é "[porta]/api"', () => {
    let response = {};

    before(async () => {
      response = await chai.request(server)
        .get('/api');
    });

    it('Retorna status 200', () => {
      expect(response).to.have.status(status.Ok);
    });

    it('Retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('O objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('A propriedade "message" possui o texto "Bem vindo a Crypto Index API!"', () => {
      expect(response.body.message)
          .to.be.equal('Bem vindo a Crypto Index API!');
    });
  });
});

describe('POST /api/login', () => {
  describe('Testa login com email inválido', () => {
    let response = {};

    before(async () => {
      response = await chai.request(server)
        .post('/api/login')
        .send({
          email: 'mail.com',
          password: '135982'
        });
    });

    it('Verifica se é possivel logar com email é inválido', () => {
      expect(response).to.have.status(status.BadRequest);
      expect(response.body).to.have.property('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message)
        .to.be.equal('Campos inválidos');
    });
  });

  describe('Testa login com a senha inválida', () => {
    let response = {};

    before(async () => {
      response = await chai.request(server)
        .post('/api/login')
        .send({
          email: 'email@mail.com',
          password: '123'
        });
    });

    it('Verifica se é possivel logar com a senha é inválida', () => {
      expect(response).to.have.status(status.BadRequest);
      expect(response.body).to.have.property('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message)
        .to.be.equal('Campos inválidos');
    });
  });

  describe('Testa se é possivel fazer o login com sucesso ', () => {
    let response = {};

    it('Verifica login válido', () => {
      expect(response).to.have.status(status.Ok);
      expect(response.body).to.have.property('object');
      expect(response.body).to.have.property('token');
      expect(response.body.token).to.length(16);
    });
  });
});

describe('GET /api/cryto/btc', () => {
  describe('retornar a cotação de câmbio', () => {
    let response = {};

    /*
      Deve retornar um objeto
      O objeto deve conter as propriedades "BR", "EUR" e "CAD"
    */
  });
});

describe('', () => {});

describe('', () => {});

describe('', () => {});

describe('', () => {});

describe('', () => {});

describe('', () => {});
