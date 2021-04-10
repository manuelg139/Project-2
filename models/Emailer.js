const { Model, DataTypes, EmptyResultError } = require('sequelize');
const sequelize = require('../config/connection');

class Emailer extends Model{}

Emailer.init(
   {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email_content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      users_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      projects_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: create,
        references: {
          model: 'projects',
          key: 'id',
        },
      },
   },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'emailer',
  }
);
module.exports = Emailer;