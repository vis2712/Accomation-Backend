import { db } from '../models/index.js';

// Add Data to Rolemaster
export const addRoleData = async (req, res, next) => {
    try {
        const { name, createdBy } = req.body;

        const RoleMasterCheck = await db.Rolemaster.findOne({
            where: {
                name,
                status: ['active', 'deactive'],
            },
        });
        if (RoleMasterCheck) {
            return res.status(401).json({
                status: 401,
                message: "Rolemaster name already exists!"
            });
        }

        await db.Rolemaster.create({ name, createdBy });

        return res.status(200).json({
            status: 200,
            message: "Rolemaster added successfully"
        });
    } catch (error) {
        next(error);
    }
};

export const getRoleData = async (req, res) => {
    const { page, limit, search } = req.query;

    const paginationQuery = {};
    if (page && limit) {
        paginationQuery.offset = (page - 1) * limit;
        paginationQuery.limit = +limit;
    }

    const condition = {};
    if (search)
        condition[Sequelize.Op.or] = [
            { planmastername: { [Sequelize.Op.like]: `%${search}%` } },
        ];

    const allRole = await db.Planmaster.findAndCountAll({ where: condition, ...paginationQuery });
    return res.status(200).json({
        status: 200,
        data: allRole.rows,
        count: allRole.count
    });
};

export const getRoleById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const RolemasterData = await db.Rolemaster.findOne({
            where: { id },
            status: ['active', 'deactive'],
        });

        if (!RolemasterData) {
            return res.status(404).json({
                status: 404,
                message: "Rolemaster data not found"
            });
        }

        return res.status(200).json({
            status: 200,
            data: RolemasterData
        });
    } catch (error) {
        next(error);
    }
};

export const editRoleData = async (req, res, next) => {
    try {
        const { name, updatedBy } = req.body;

        const RoleMastercheck = await db.Rolemaster.findOne({
            where: {
                name,
                id: { [db.Sequelize.Op.ne]: req.params.id },
            },
        });

        if (RoleMastercheck) {
            return res.status(401).json({
                status: 401,
                message: "RoleMaster name already exists!"
            });
        }

        const RoleMasterRecord = await db.Rolemaster.findByPk(req.params.id);

        if (!RoleMasterRecord) {
            return res.status(404).json({
                status: 404,
                message: "Rolemaster not found"
            });
        }

        RoleMasterRecord.name = name;
        RoleMasterRecord.updatedBy = updatedBy;

        await RoleMasterRecord.save();

        return res.status(200).json({
            status: 200,
            message: "Rolemaster updated successfully",
        });
    } catch (error) {
        next(error);
    }
};

export const deleteRoleData = async (req, res, next) => {
    try {
        const { id } = req.params;

        const RoleMasterRecord = await db.Rolemaster.findByPk(id);

        if (!RoleMasterRecord) {
            return res.status(404).json({
                status: 404,
                message: "Rolemaster not found"
            });
        }

        await RoleMasterRecord.destroy();

        return res.status(200).json({
            status: 200,
            message: "Rolemaster deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};

// Active/Deactivate user
export const poststatuschange = async (req, res, next) => {
    try {
        const { id, status } = req.body;

        await db.Rolemaster.update(
            { status },
            { where: { id } }
        );

        return res.status(200).json({
            status: 200,
            message: status === '1'
                ? "RoleMaster activated"
                : "RoleMaster deactivated",
        });
    } catch (err) {
        next(err);
    }
};
