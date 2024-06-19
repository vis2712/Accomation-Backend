// routes/RoleMaster.js
import { Router } from 'express';
import { addRoleData, getRoleById, getRoleData, editRoleData, deleteRoleData, poststatuschange } from '../controllers/roleMaster.js';
const router = Router();

router.post('/v1', addRoleData);
router.get('/v1', getRoleData);
router.get('/v1/:id', getRoleById);
router.put('/v1/:id', editRoleData);
router.delete('/v1/:id', deleteRoleData);
// router.post('/poststatuschange',poststatuschange);
export default router;
