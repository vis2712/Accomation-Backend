// routes/user.js

import { Router } from 'express';
import { addData, deleteData, editdata, getById, getdata } from '../controllers/modules.js';

const router = Router();

router.post('/v1', addData);
router.get('/v1', getdata);
router.get('/v1/:id', getById);
router.put('/v1/:id', editdata);
router.delete('/v1/:id', deleteData);


export default router;
