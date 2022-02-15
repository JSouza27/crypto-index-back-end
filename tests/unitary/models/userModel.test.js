const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} = require('sequelize-test-helpers')
const { expect } = require('chai');

const UserModel = require('../../../src/models/user');

describe('Testa o User model', () => {
  const User = UserModel(sequelize, dataTypes);
  const user = new User();

  describe('Tem o nome "User"', () => {
    checkModelName(User)('User');
  });

  describe('Possuí as propriedades "name", "email" e "password"', () => {
    const properties = ['name', 'email', 'password'];

    properties.forEach(checkPropertyExists(user));
  });
});
