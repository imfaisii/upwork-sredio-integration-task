import express from 'express';
import GithubRepositories from '../services/githubRepositories.js';
import { RESPONSE } from '../constants/global.js';

const router = express.Router();

router.get('/repositories', async (req, res) => {
    try {
        const { fetchAndStoreAuthenticatedUserRepos, getRepositories } = GithubRepositories();

        await fetchAndStoreAuthenticatedUserRepos();

        const repositories = await getRepositories();

        res.status(200).json({ status: RESPONSE.SUCCESS, data: repositories });
    } catch (error) {
        res.status(500).json({ status: RESPONSE.ERROR, message: 'Error getting github repositories', errorMessage: error?.message ?? 'No message' });
    }
});

export default router;