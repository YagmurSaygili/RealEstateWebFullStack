module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    // Users.associate = (models) => {
    //     Users.hasMany(models.Properties, {
    //     onDelete: "cascade",
    //   });
    // };
  

    // I should also look here, onda da oldu
    return Users;
  };
  