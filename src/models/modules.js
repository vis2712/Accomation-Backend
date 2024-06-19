import { Model } from 'sequelize';
import { operation, status } from '../utils/dbutils.js';

export default (sequelize, DataTypes) => {
    class Module extends Model {
        static associate(models) {
            Module.belongsTo(models.User, { as: 'createBy', foreignKey: { name: 'createdBy' } });
            Module.belongsTo(models.User, { as: 'updateBy', foreignKey: { name: 'updatedBy' } });
            Module.belongsTo(models.Module, { as: 'parentModule', foreignKey: { name: 'parentModuleId' } });
        }
    }
    Module.init(
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
            //     allowNull: false,
            //     type: DataTypes.STRING,
            //     defaultValue: 'active'
            // },
            status: {
                allowNull: false,
                type: DataTypes.ENUM(Object.values(status)),
                defaultValue: status.ACTIVE,
            },
            operation: {
                type: DataTypes.JSON,
                allowNull: false,
                validate: {
                    isArrayOfEnums(value) {
                        if (!Array.isArray(value)) {
                            throw new Error('Operation must be an array');
                        }
                        for (const item of value) {
                            if (!Object.values(operation).includes(item)) {
                                throw new Error(`Invalid operation type: ${item}`);
                            }
                        }
                    }
                }
            },
            defaultRight: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            icon: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            path: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            menuName: {
                allowNull: false,
                type: DataTypes.STRING,
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
            modelName: 'module',
            paranoid: true,
        }
    );
    return Module;
};
