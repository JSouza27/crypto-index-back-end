const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} = require('sequelize-test-helpers')

const UserModel = require('../../../src/models/user');

describe('testa o User model', () => {
  const User = UserModel(sequelize, dataTypes);
  const user = new User();

  describe('tem o nome "User"', () => {
    checkModelName(User)('User');
  });

  describe('possuí as propriedades "name", "email" e "password"', () => {
    const properties = ['name', 'email', 'password'];

    properties.forEach(checkPropertyExists(user));
  });
});
