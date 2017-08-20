module.exports = (sequelize, DataTypes)=> {
    var Post = sequelize.define("Post", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [2]
        }
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            len:[4]
        }
      }
    });
    return Post;
  };