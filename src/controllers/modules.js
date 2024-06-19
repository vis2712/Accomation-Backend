import { Sequelize } from 'sequelize';
import { db } from '../models/index.js';

export const addData = async (req, res, next) => {
    try {
        const { name, description, operation, defaultRight, icon, path, menuName, createdBy, parentModuleId } = req.body;

        const moduleCheck = await db.Module.findOne({ where: { name } });
        if (moduleCheck) {
            return res.status(401).json({
                status: 401,
                message: "Module name already exists!"
            });
        }

        await db.Module.create({ name, description, operation, defaultRight, icon, path, menuName, createdBy, parentModuleId });

        return res.status(200).json({
            status: 200,
            message: "Module added successfully"
        });
    } catch (error) {
        next(error);
    }
};

export const getdata = async (req, res, next) => {
    try {
        const { page, limit, search, showOnlyParent } = req.query;

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

        if (showOnlyParent) condition.parentModuleId = { [db.Sequelize.Op.ne]: null }

        const allModule = await db.Module.findAndCountAll({ where: condition, ...paginationQuery, include: { model: db.Module, as: 'parentModule', attributes: ['name'] } });
        return res.status(200).json({
            status: 200,
            data: allModule.rows,
            count: allModule.count
        });
    } catch (error) {
        next(error);
    }
};

export const getById = async (req, res, next) => {
    try {

        const { id } = req.params;

        const moduleData = await db.Module.findOne({
            where: { id },
        });

        if (!moduleData) {
            return res.status(404).json({
                status: 404,
                message: "Module not found"
            });
        }

        return res.status(200).json({
            status: 200,
            data: moduleData
        });
    } catch (error) {
        next(error);
    }
};

export const editdata = async (req, res, next) => {
    try {
        // const { id } = req.params;
        const { name, description, operation, defaultRight, icon, path, menuName, parentModuleId, updatedBy } = req.body;

        if (req.params.id == +parentModuleId) return res.status(200).json({ status: 401, message: "Module Name & Parent Module cannot be same!" });

        const moduleCheck = await db.Module.findOne({
            where: {
                name,
                id: { [db.Sequelize.Op.ne]: req.params.id },
            },
        });

        if (moduleCheck) {
            return res.status(200).json({
                status: 401,
                message: "Module name already exists!"
            });
        }

        const ModuleRecord = await db.Module.findByPk(req.params.id);

        if (!ModuleRecord) {
            return res.status(404).json({
                status: 404,
                message: "Module not found"
            });
        }

        ModuleRecord.name = name;
        ModuleRecord.description = description;
        ModuleRecord.operation = operation;
        ModuleRecord.defaultRight = defaultRight;
        ModuleRecord.icon = icon;
        ModuleRecord.path = path;
        ModuleRecord.menuName = menuName;
        ModuleRecord.parentModuleId = parentModuleId;
        ModuleRecord.updatedBy = updatedBy;

        await ModuleRecord.save();

        return res.status(200).json({
            status: 200,
            message: "Module updated successfully",
        });
    } catch (error) {
        next(error);
    }
};


export const deleteData = async (req, res, next) => {
    try {
        const { id } = req.params;

        const moduleRecord = await db.Module.findByPk(id);

        if (!moduleRecord) {
            return res.status(404).json({
                status: 404,
                message: "Module not found"
            });
        }

        await moduleRecord.destroy();

        return res.status(200).json({
            status: 200,
            message: "Module deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};