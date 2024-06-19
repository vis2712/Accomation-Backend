// routes/index.js

import express from 'express';
import moduleRoutes from './modules.js';
import organizationRoutes from './organization.js';
import planMasterRoutes from './planmaster.js';
import roleRoutes from './rolemaster.js';
import userRoutes from './user.js';

const router = express.Router();

router.use('/user', userRoutes);
router.use('/organization', organizationRoutes);
router.use('/module', moduleRoutes);
router.use('/plan', planMasterRoutes);
router.use('/role', roleRoutes);

export default router;
