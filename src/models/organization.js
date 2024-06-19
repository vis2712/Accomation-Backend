import { Model } from 'sequelize';
import { status } from '../utils/dbutils.js';


export default (sequelize, DataTypes) => {
  class Organization extends Model {
    static associate(models) {
      Organization.hasMany(models.User);
      Organization.belongsTo(models.User, { as: 'createBy', foreignKey: { name: 'createdBy' } });
      Organization.belongsTo(models.User, { as: 'updateBy', foreignKey: { name: 'updatedBy' } });
    }
  }
  Organization.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      // status: {
      //   allowNull: false,
      //   type: DataTypes.STRING,
      //   defaultValue: 'active'
      // },
      status: {
        allowNull: false,
        type: DataTypes.ENUM(Object.values(status)),
        defaultValue: status.ACTIVE,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      deletedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'organizations',
      paranoid: true,
    }
  );
  return Organization;
};
