
import { RESPONSE } from '../constants/global.js';
import GithubIntegrationService from '../services/githubIntegration.service.js';

export const index = async (req, res) => {
    try {
        const { index: getAllIntegrations } = GithubIntegrationService();

        const records = await getAllIntegrations();

        res.json({ status: RESPONSE.SUCCESS, data: records });
    } catch (error) {
        res.status(500).json({ status: RESPONSE.ERROR, message: error?.message ?? 'Error retrieving records', error });
    }
};

export const destroy = async (req, res) => {
    try {
        const { destroy } = GithubIntegrationService();

        await destroy();

        res.status(200).json({ status: RESPONSE.SUCCESS });
    } catch (error) {
        res.status(500).json({ status: RESPONSE.ERROR, message: 'Error deleting records', error });
    }
};