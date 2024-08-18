import { RESPONSE } from "../constants/global.js";
import GithubRepositoriesService from "../services/githubRepositories.service.js";

export const getRepositories = async (req, res) => {
    try {
        const { fetchAndStoreAuthenticatedUserRepos, getRepositories } = GithubRepositoriesService();

        await fetchAndStoreAuthenticatedUserRepos();

        const repositories = await getRepositories();

        res.status(200).json({ status: RESPONSE.SUCCESS, data: repositories });
    } catch (error) {
        res.status(500).json({ status: RESPONSE.ERROR, message: 'Error getting github repositories', errorMessage: error?.message ?? 'No message' });
    }
}