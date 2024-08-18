import { RESPONSE } from "../constants/global.js";
import GithubRepositories from "../models/githubRepositories.model.js";
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

        const updatedRepository = await update(id, data);

        if (!updatedRepository) {
            return res.status(404).json({ status: 'error', message: 'Repository not found' });
        }

        res.status(200).json({ status: 'success', data: updatedRepository });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error updating repository', errorMessage: error?.message ?? 'No message' });
    }
}

export const getRepositoriesStatistics = async (req, res) => {
    try {
        const repositories = await GithubRepositories.find({ included: true }).exec();
        const { fetchRepositoryStats } = GithubRepositoriesService();

        const repositoryStats = [];

        for (const repository of repositories) {
            const repoStats = await fetchRepositoryStats(`${repository.organization.name}/${repository.slug}`);
            repositoryStats.push(...repoStats);
        }

        const aggregatedStats = repositoryStats.reduce((acc, stat) => {
            const { user, id, totalCommits, totalPRs, totalIssues } = stat;

            if (!acc[user]) {
                acc[user] = { id, totalCommits: 0, totalPRs: 0, totalIssues: 0 };
            }

            acc[user].totalCommits += totalCommits;
            acc[user].totalPRs += totalPRs;
            acc[user].totalIssues += totalIssues;

            return acc;
        }, {});

        const statisticsByUser = Object.entries(aggregatedStats).map(([user, stats]) => ({
            user,
            id: stats.id,
            totalCommits: stats.totalCommits,
            totalPRs: stats.totalPRs,
            totalIssues: stats.totalIssues,
        }));

        const groupedByRepository = repositoryStats.reduce((acc, item) => {
            if (!acc[item.repository]) {
                acc[item.repository] = [];
            }

            acc[item.repository].push(item);
            return acc;
        }, {});

        res.status(200).json({ status: RESPONSE.SUCCESS, data: { repository_stats: groupedByRepository, total: statisticsByUser } });
    } catch (error) {
        res.status(500).json({ status: RESPONSE.ERROR, message: 'Error getting GitHub repositories', errorMessage: error?.message ?? 'No message' });
    }
}