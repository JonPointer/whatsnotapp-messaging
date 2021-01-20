module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: DataTypes.STRING,
    });

    User.associate = (models) => {
        User.hasMany(models.Message, {
            onDelete: 'cascade',
        });
    };

    return User;
};

