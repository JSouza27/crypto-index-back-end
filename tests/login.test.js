const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/api/app');
const HttpStatus = require('../src/utils/httpStatus');

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /api/login', () => {
  describe('Quando não é passado o email e senha', () => {
    let response;

    before(async () => {
      response = await chai.request(server)
        .post('/api/login')
        .send({})
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

    it('a propriedade "message" tem o valor "Campos inválidos"', () => {
      expect(response.body.message).to.be.equals('Campos inválidos');
    });
  });

  describe('Quando email ou senha inválida', () => {});

  describe('Quando o login é feito com sucesso', () => {});
});
