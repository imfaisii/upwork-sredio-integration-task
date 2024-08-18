import { RESPONSE } from "../constants/global.js";
import GithubRepositoriesService from "../services/githubRepositories.service.js";

export const getRepositories = async (req, res) => {
    try {
        const { fetchAndStoreAuthenticatedUserRepos, index } = GithubRepositoriesService();

        await fetchAndStoreAuthenticatedUserRepos();

        const repositories = await index();

        res.status(200).json({ status: RESPONSE.SUCCESS, data: repositories });
    } catch (error) {
        res.status(500).json({ status: RESPONSE.ERROR, message: 'Error getting github repositories', errorMessage: error?.message ?? 'No message' });
    }
}

export const updateRespository = async (req, res) => {
    try {
        const { update } = GithubRepositoriesService();

        const { id } = req.params;
        const data = req.body;

        if (!id) {
            return res.status(400).json({ status: 'error', message: 'Repository ID is required' });
        }

        const updatedRepository = await update(id, data)

        if (!updatedRepository) {
            return res.status(404).json({ status: 'error', message: 'Repository not found' });
        }

        res.status(200).json({ status: 'success', data: updatedRepository });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error updating repository', errorMessage: error?.message ?? 'No message' });
    }
}