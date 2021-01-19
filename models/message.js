module.exports = function (sequelize, DataTypes) {
  const Message = sequelize.define("Message", {
    body: DataTypes.STRING,
  });

  Message.associate = (models) => {
    Message.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Message;
};
