module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
      // Giving the Users model a name of type STRING
      userName: DataTypes.STRING,
    });
    User.associate = (models) => {
      // Associating Users with Posts
      // When an Users is deleted, also delete any associated Posts
      User.hasMany(models.Message, {
        onDelete: "cascade",
      });
    };
    return User;
  };
  