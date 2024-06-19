import { Model, } from "sequelize";
import { status } from '../utils/dbutils.js';

export default (sequelize, DataTypes) => {
    class Rolemaster extends Model {
        static associate(models) {
            Rolemaster.belongsTo(models.User, { as: 'createBy', foreignKey: { name: 'createdBy' } });
            Rolemaster.belongsTo(models.User, { as: 'updateBy', foreignKey: { name: 'updatedBy' } });
        }
    }
    Rolemaster.init(
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
            modelName: 'rolemasters',
            paranoid: true,
        }
    );
    return Rolemaster;
}
