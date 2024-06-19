// routes/PlanMaster.js
import { Router } from 'express';
import { addData, getData, getById, editdata, deleteData, statuschange } from '../controllers/planmaster.js';
const router = Router();

router.post('/v1', addData);
router.get('/v1', getData);
router.get('/v1/:id', getById);
router.put('/v1/:id', editdata);
router.delete('/v1/:id', deleteData);
// router.post('/statuschange',statuschange);

export default router;
