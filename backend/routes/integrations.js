import express from 'express';

import { RESPONSE } from '../constants/global.js';
import GitHubIntegration from '../models/githubintegration.model.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const records = await GitHubIntegration.find({});
        res.json({ status: RESPONSE.SUCCESS, data: records });
    } catch (error) {
        res.status(500).json({ status: RESPONSE.ERROR, message: error?.message ?? 'Error retrieving records', error });
    }
});

router.delete('/', async (req, res) => {
    try {
        await GitHubIntegration.deleteMany({});

        res.status(200).json({ status: RESPONSE.SUCCESS })
    } catch (error) {
        res.status(500).json({ status: RESPONSE.ERROR, message: 'Error deleting records', error });
    }
});

export default router;