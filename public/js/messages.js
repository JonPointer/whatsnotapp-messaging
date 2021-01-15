module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define("Message", {
    username: DataTypes.STRING,
    message: DataTypes.STRING
  });
  return Message;
};
