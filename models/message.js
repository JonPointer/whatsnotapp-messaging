module.exports = function (sequelize, DataTypes) {
  const Message = sequelize.define("Message", {
    username: DataTypes.STRING,
    body: DataTypes.STRING,
  });
  return Message;
};
