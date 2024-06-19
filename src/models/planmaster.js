import { Model, } from "sequelize";
import { status } from '../utils/dbutils.js';

export default (sequelize, DataTypes) => {
    class Planmaster extends Model {
        static associate(models) {
            Planmaster.belongsTo(models.User, { as: 'createBy', foreignKey: { name: 'createdBy' } });
            Planmaster.belongsTo(models.User, { as: 'updateBy', foreignKey: { name: 'updatedBy' } });
        }
    }
    Planmaster.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            planmastername: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            planMasterDescription: {
                type: DataTypes.STRING,
                allowNull: true,
            },
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
            modelName: 'planmasters',
            paranoid: true,
        }
    );
    return Planmaster;
}