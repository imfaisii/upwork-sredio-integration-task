import express from 'express';
import { getRepositories, updateRespository } from '../controllers/githubIntegration.controller.js';

const router = express.Router();

router.get('/repositories', getRepositories);

router.post('/github/repositories/:id/update', updateRespository);

export default router;