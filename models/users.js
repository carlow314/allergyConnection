module.exports = function (sequelize, dataTypes) {
    var user = sequelize.define('user', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        Firstname: {
            type: dataTypes.STRING,
            notEmpty: true
        },
        Lastname: {
            type: dataTypes.STRING,
            notEmpty: true
        },
        email: {
            type: dataTypes.STRING,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: dataTypes.STRING,
            allowNull: false
        }
    });

    return user;

}