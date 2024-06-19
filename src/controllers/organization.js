import { Sequelize } from 'sequelize';
import { db } from '../models/index.js';

export const addData = async (req, res, next) => {
    try {
        const { name, description, createdBy } = req.body;

        const organizationCheck = await db.Organization.findOne({ where: { name } });
        if (organizationCheck) {
            return res.status(401).json({
                status: 401,
                message: "Organization name already exists!"
            });
        }

        await db.Organization.create({ name, description, createdBy });

        return res.status(200).json({
            status: 200,
            message: "Organization added successfully"
        });
    } catch (error) {
        console.error(error, '----');
        next(error);
    }
};

export const getdata = async (req, res, next) => {
    try {
        const { page, limit, search } = req.query;

        const paginationQuery = {};
        if (page && limit) {
            paginationQuery.offset = (page - 1) * limit;
            paginationQuery.limit = +limit;
        }

        const condition = {};
        if (search)
            condition[Sequelize.Op.or] = [
                { name: { [Sequelize.Op.like]: `%${search}%` } },
            ];

        console.log(condition, search, req.body);
        const allOrg = await db.Organization.findAndCountAll({ where: condition, ...paginationQuery });
        return res.status(200).json({
            status: 200,
            data: allOrg.rows,
            count: allOrg.count
        });
    } catch (error) {
        console.error(error, '----');
        next(error);
    }
};

export const getById = async (req, res, next) => {
    try {

        const { id } = req.params;

        const organizationData = await db.Organization.findOne({
            where: { id },
        });

        if (!organizationData) {
            return res.status(404).json({
                status: 404,
                message: "organization not found"
            });
        }

        return res.status(200).json({
            status: 200,
            data: organizationData
        });
    } catch (error) {
        next(error);
    }
};

export const editdata = async (req, res, next) => {
    try {
        // const { id } = req.params;
        const { name, description, updatedBy } = req.body;

        const orgcheck = await db.Organization.findOne({
            where: {
                name,
                id: { [db.Sequelize.Op.ne]: req.params.id },
            },
        });

        if (orgcheck) {
            return res.status(401).json({
                status: 401,
                message: "Organization name already exists!"
            });
        }

        const OrganizationRecord = await db.Organization.findByPk(req.params.id);

        if (!OrganizationRecord) {
            return res.status(404).json({
                status: 404,
                message: "Organization not found"
            });
        }

        OrganizationRecord.name = name;
        OrganizationRecord.description = description;
        OrganizationRecord.updatedBy = updatedBy;

        await OrganizationRecord.save();

        return res.status(200).json({
            status: 200,
            message: "Organization updated successfully",
        });
    } catch (error) {
        next(error);
    }
};


export const deleteData = async (req, res, next) => {
    try {
        const { id } = req.params;

        const organizationRecord = await db.Organization.findByPk(id);

        if (!organizationRecord) {
            return res.status(404).json({
                status: 404,
                message: "Organization not found"
            });
        }

        await organizationRecord.destroy();

        return res.status(200).json({
            status: 200,
            message: "Organization deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};