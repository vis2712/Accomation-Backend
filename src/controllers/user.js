// controllers/user.js
import { db } from '../models/index.js';

export const getUser = async (req, res) => {

    const alluser = await db.User.findAll({});
    res.send(alluser);
};

export const addUser = async (req, res, next) => {
    const salt = await bcrypt.genSalt(10);

    const { firstName, middleName, lastName, email, number, password, organizationId } = req.body;
    try {
        const createdUser = await db.User.create({
            firstName,
            middleName,
            lastName,
            email,
            number,
            password,
            organizationId
        });

        res.status(201).json(createdUser);
    } catch (error) {
        next(error);
    }
};

export const loginUser = async (req, res, next) => {

    try {

        const { number, password } = req.body;

        if (!number || !password) return res.json({ status: 501, message: "Please pass valid params!" });

        const findUser = await db.User.findOne({
            where: { number: number }
        });

        if (!findUser) return res.json({ status: 501, message: "User not found!" });

        if (findUser.password != password) return res.json({ status: 501, message: "Invalid password!" });

        return res.json({ status: 200, message: "Login successfully!", data: findUser });
    } catch (err) {
        next(err);
    }

};
