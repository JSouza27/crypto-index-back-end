const chai = require('chai');
const chaiHttp = require('chai-http');
const HttpStatus = require('../src/utils/httpStatus');
const server = require('../src/api/app');

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

    it('Retorna o status 400', () => {
      expect(response).to.have.status(status.BadRequest);
    });

    it('Retorna um objeto', () => {
      expect(response.body).to.have.property('object');
    });

    it('O objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('Verifica se é possivel logar com email é inválido', () => {
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

    it('Retorna o status 400', () => {
      expect(response).to.have.status(status.BadRequest);
    });

    it('Retorna um objeto', () => {
      expect(response.body).to.have.property('object');
    });

    it('O objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('Verifica se é possivel logar com email é inválido', () => {
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

    before(async () => {
      response = await chai.request(server)
        .get('/api/cryto/btc');
    });

    it('Retorna o status 200', () => {
      expect(response).to.have.status(status.Ok);
    });

    it('Retorna um objeto', () => {
      expect(response.body).to.have.property('object');
    });

    it('O objeto deve conter as propriedades "BR", "EUR" e "CAD"', () => {
      expect(response.body).to.have.property('BR');
      expect(response.body).to.have.property('EUR');
      expect(response.body).to.have.property('CAD');
    });
  });
});

describe('POST /api/crypto/btc', () => {
  describe('Deve atualizar o valor da cotação', () => {
    let response = {};

    before(async () => {
      response = await chai.request(server)
        .post('/api/crypto/btc')
        .send({
          currency: 'BRL',
          value: 10000.0
        });
    });

    it('Retorna o status 200', () => {
      expect(response).to.have.status(status.Ok);
    });
    
    it('Retorna um objeto', () => {
      expect(response.body).to.have.property('object');
    });
    
    it('O objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });
    
    it('Verifica se o valor foi atualizado com sucesso', () => {
      expect(response.body.message)
        .to.be.equal('Valor alterado com sucesso!');
    });
  });

  describe('Caso o valor do currency passado para atualização seja inválido', () => {
    let response = {};

    before(async () => {
      response = await chai.request(server)
        .post('/api/crypto/btc')
        .send({
          currency: 'JPY',
          value: 1000.0
        });
    });

    it('Retorna o status 400', () => {
      expect(response).to.have.status(status.BadRequest);
    });
    
    it('Retorna um objeto', () => {
      expect(response.body).to.have.property('object');
    });
    
    it('O objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });
    
    it('Verifica se retorna a menssagem "Moeda inválida" quando passado o currency incorreto', () => {
      expect(response.body.message)
        .to.be.equal('Moeda inválida');
    });
  });

  describe('Caso o value passado para atualização seja inválido', () => {
    let response = {};

    before(async () => {
      response = await chai.request(server)
        .post('/api/crypto/btc')
        .send({
          currency: 'BRL',
          value: 0
        });
    });

    it('Retorna o status 400', () => {
      expect(response).to.have.status(status.BadRequest);
    });
    
    it('Retorna um objeto', () => {
      expect(response.body).to.have.property('object');
    });
    
    it('O objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });
    
    it('Verifica se retorna a menssagem "Valor inválido" quando passado o currency incorreto', () => {
      expect(response.body.message)
        .to.be.equal('Valor inválido');
    });
  });

  describe('Deve conter um token para no cabeçalho para acessar a rota', () => {
    let response = {};

    before(async () => {
      response = await chai.request(server)
        .post('/api/crypto/btc')
        .send({
          currency: 'BRL',
          value: 1000.0
        });
    });

    it('Retorna o status 401', () => {
      expect(response).to.have.status(status.Unauthorized);
    });
    
    it('Retorna um objeto', () => {
      expect(response.body).to.have.property('object');
    });
    
    it('O objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });
    
    it('Verifica se retorna a menssagem "Token inválido"', () => {
      expect(response.body.message)
        .to.be.equal('Token inválido');
    });
  });
  
});

describe('Requisição para um endpoint que não exista', () => {
  describe('Deve retornar código 404', () => {
    let response = {};

    it('Retorna o status 404', () => {
      expect(response).to.have.status(status.NotFound);
    });
    
    it('Retorna um objeto', () => {
      expect(response.body).to.have.property('object');
    });
    
    it('O objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });
    
    it('Verifica se retorna a menssagem "Endpoint não encontrado"', () => {
      expect(response.body.message)
        .to.be.equal('Endpoint não encontrado');
    });
  });
});
