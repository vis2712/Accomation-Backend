module.exports = {
    async up(queryInterface, Sequelize) {
        const status = {
            ACTIVE: 'active',
            DEACTIVE: 'deactive'
        };
        await queryInterface.createTable('planmasters', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            planmastername: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            planMasterDescription: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            status: {
                allowNull: false,
                type: Sequelize.ENUM(Object.values(status)),
                defaultValue: status.ACTIVE,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            deletedAt: {
                type: Sequelize.DATE,
            },
            createdBy: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
            },
            updatedBy: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('planmasters');
    },
};
