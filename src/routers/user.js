// routes/user.js

import { Router } from 'express';
import { addUser, getUser, loginUser } from '../controllers/user.js';

const router = Router();

router.get('/v1', getUser);
router.post('/v1', addUser);
router.post('/v1/login', loginUser);


export default router;
