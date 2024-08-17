import express from 'express';
import { index, destroy } from '../controllers/integrations.controller.js';

const router = express.Router();

router.get('/', index);

router.delete('/', destroy);

export default router;
