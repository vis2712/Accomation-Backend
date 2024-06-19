module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('modules', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            description: {
                type: Sequelize.STRING,
            },
            status: {
                allowNull: false,
                type: Sequelize.STRING,
                defaultValue: 'active'
            },
            operation: {
                type: Sequelize.JSON,
                allowNull: true,
            },
            defaultRight: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            icon: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            path: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            menuName: {
                allowNull: false,
                type: Sequelize.STRING,
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
            parentModuleId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'modules',
                    key: 'id',
                },
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
        await queryInterface.dropTable('modules');
    },
};
