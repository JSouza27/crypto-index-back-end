const User = (sequelize, DataTypes) => {
  const user = sequelize.define('Users', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  });

  return user;
};

module.exports = User;
