import { DataTypes, Sequelize } from 'sequelize';
import config from '../config/config.js';
import Module from './modules.js';
import Organization from './organization.js';
import User from './user.js';
import Planmaster from './planmaster.js';
import Rolemaster from './rolemaster.js';


const sequelize = new Sequelize({
  host: config.database.host,
  database: config.database.database,
  username: config.database.username,
  password: config.database.password,
  dialect: config.database.dialect,
  logging: config.env === 'development' ? true : false,
});

const db = {
  User: User(sequelize, DataTypes),
  Organization: Organization(sequelize, DataTypes),
  Module: Module(sequelize, DataTypes),
  Planmaster: Planmaster(sequelize, DataTypes),
  Rolemaster: Rolemaster(sequelize, DataTypes),
  sequelize,
  Sequelize,
};

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export { db };
