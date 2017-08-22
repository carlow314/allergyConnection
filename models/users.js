module.exports = function(sequelize, dataTypes) {
  
     var user = sequelize.define('user', {
  
         id: {
             autoIncrement: true,
             primaryKey: true,
             type: dataTypes.INTEGER
         },
  
         firstname: {
             type:dataTypes.STRING,
             notEmpty: true
         },
  
         lastname: {
             type: dataTypes.STRING,
             notEmpty: true
         },
  
         username: {
             type: dataTypes.TEXT
         },
  
         about: {
             type: dataTypes.TEXT
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
         },
  
         last_login: {
             type: dataTypes.DATE
         }
     });
  
     return user;
  
 }