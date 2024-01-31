module.exports = (sequelize, DataTypes) => {
  const Properties = sequelize.define("Properties", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    propertyText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Properties.associate = (models) => {
    Properties.hasMany(models.Comments, {
      onDelete: "cascade",
    });
  };

  return Properties;
};
