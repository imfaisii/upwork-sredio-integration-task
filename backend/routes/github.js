import express from 'express';
import { getRepositories } from '../controllers/githubIntegration.controller.js';

const router = express.Router();

router.get('/repositories', getRepositories);

export default router;