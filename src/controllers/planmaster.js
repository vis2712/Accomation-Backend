import { db } from '../models/index.js';

// Add Data to Planmaster
export const addData = async (req, res, next) => {
    try {
        const { planmastername, planMasterDescription, createdBy } = req.body;

        const planMasterCheck = await db.Planmaster.findOne({
            where: {
                planmastername,
                status: ['active', 'deactive'],
            },
        });
        if (planMasterCheck) {
            return res.status(401).json({
                status: 401,
                message: "PlanMaster name already exists!"
            });
        }

        await db.Planmaster.create({ planmastername, planMasterDescription, createdBy });

        return res.status(200).json({
            status: 200,
            message: "PlanMaster added successfully"
        });
    } catch (error) {
        next(error);
    }
};

export const getData = async (req, res) => {

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

    const allPlan = await db.Planmaster.findAndCountAll({ where: condition, ...paginationQuery });
    return res.status(200).json({
        status: 200,
        data: allPlan.rows,
        count: allPlan.count
    });
};

export const getById = async (req, res, next) => {
    try {

        const { id } = req.params;

        const planmasterData = await db.Planmaster.findOne({
            where: { id },
        });

        if (!planmasterData) {
            return res.status(404).json({
                status: 404,
                message: "PlanMaster data not found"
            });
        }

        // Respond with the retrieved data
        return res.status(200).json({
            status: 200,
            data: planmasterData
        });
    } catch (error) {
        // Handle any errors and pass them to the error handling middleware
        next(error);
    }
};

export const editdata = async (req, res, next) => {
    try {
        // const { id } = req.params;
        const { planmastername, planMasterDescription, updatedBy } = req.body;

        const planMastercheck = await db.Planmaster.findOne({
            where: {
                planmastername,
                id: { [db.Sequelize.Op.ne]: req.params.id },
            },
        });

        if (planMastercheck) {
            return res.status(401).json({
                status: 401,
                message: "PlanMaster name already exists!"
            });
        }

        const planMasterRecord = await db.Planmaster.findByPk(req.params.id);

        if (!planMasterRecord) {
            return res.status(404).json({
                status: 404,
                message: "PlanMaster not found"
            });
        }

        planMasterRecord.planmastername = planmastername;
        planMasterRecord.planMasterDescription = planMasterDescription;
        planMasterRecord.updatedBy = updatedBy;

        await planMasterRecord.save();

        return res.status(200).json({
            status: 200,
            message: "PlanMaster updated successfully",
        });
    } catch (error) {
        next(error);
    }
};


export const deleteData = async (req, res, next) => {
    try {
        const { id } = req.params;

        const planMasterRecord = await db.Planmaster.findByPk(id);

        if (!planMasterRecord) {
            return res.status(404).json({
                status: 404,
                message: "PlanMaster not found"
            });
        }

        await planMasterRecord.destroy();

        return res.status(200).json({
            status: 200,
            message: "PlanMaster deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};

// Active/Deactivate user
export const statuschange = async (req, res, next) => {
    try {
        const { id, status } = req.body;

        await db.Planmaster.update(
            { status },
            { where: { id } }
        );

        return res.status(200).json({
            status: 200,
            message: status === '1'
                ? "Planmaster activated"
                : "Planmaster deactivated",
        });
    } catch (err) {
        next(err);
    }
};