import express from 'express';
import { getRepositories, updateRespository, getRepositoriesStatistics } from '../controllers/githubIntegration.controller.js';

const router = express.Router();

router.get('/repositories', getRepositories);

router.get('/repositories/statistics', getRepositoriesStatistics);

router.put('/repositories/:id/update', updateRespository);

export default router;