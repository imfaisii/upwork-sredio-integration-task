import useOctoKit from '../composables/useOctoKit.js';
import GitHubIntegration from "../models/githubintegration.model.js";
import GithubRepositories from "../models/githubRepositories.model.js";

export default function () {
    const headers = {
        'X-GitHub-Api-Version': '2022-11-28'
    }

    const index = async () => {
        try {
            return await GithubRepositories.find({});
        } catch (e) { throw e }
    }

    const update = async (_id, data) => {
        try {
            return await GithubRepositories.findOneAndUpdate(
                { _id },
                { $set: data },
                { new: true }
            );
        } catch (e) { throw e }
    }

    const destroy = async (_id = null) => {
        try {
            if (!_id) return await GithubRepositories.deleteMany({});

            return await GithubRepositories.deleteOne({ _id })
        } catch (e) { throw e }
    }

    const store = async (repository) => {
        try {
            const { githubId } = await GitHubIntegration.findOne({});

            const {
                id: repositoryId,
                name: displayName,
                name: slug,
                owner: { id: organizationId, login: organizationName, html_url: organizationHtmlUrl },
                html_url: htmlUrl
            } = repository;

            const existingRecord = await GithubRepositories.findOne({ githubId, repositoryId });

            return await GithubRepositories.findOneAndUpdate(
                { githubId, repositoryId },
                {
                    slug,
                    displayName,
                    organization: { id: organizationId, name: organizationName, htmlUrl: organizationHtmlUrl },
                    included: existingRecord ? existingRecord.included : true,
                    htmlUrl
                },
                { new: true, upsert: true }
            );
        } catch (e) { throw e }
    }

    const fetchRepositoryStats = async (repository) => {
        try {
            const [commits, pulls, issues] = await Promise.all([
                fetchRepositoryCommits(repository),
                fetchRepositoryPulls(repository),
                fetchRepositoryIssues(repository),
            ]);

            const userActivity = {};

            const processActivity = (user, userId, type) => {
                if (!user) return;
                if (!userActivity[user]) {
                    userActivity[user] = { commits: 0, pulls: 0, issues: 0, id: userId };
                }
                userActivity[user][type] += 1;
            };

            commits.data.forEach(commit => {
                const user = commit.author?.login;
                const userId = commit.author?.id;
                processActivity(user, userId, 'commits');
            });

            pulls.data.forEach(pull => {
                const user = pull.user?.login;
                const userId = pull.user?.id;
                processActivity(user, userId, 'pulls');
            });

            issues.data.forEach(issue => {
                const user = issue.user?.login;
                const userId = issue.user?.id;
                if (!issue.pull_request) {
                    processActivity(user, userId, 'issues');
                }
            });

            return Object.entries(userActivity).map(([user, activity]) => ({
                user,
                repository,
                id: activity.id,
                totalCommits: activity.commits,
                totalPRs: activity.pulls,
                totalIssues: activity.issues,
            }));
        } catch (e) {
            throw e;
        }
    }

    const fetchRepositoryCommits = async (repository) => {
        try {
            const octokit = await useOctoKit();

            return await octokit.request(`GET /repos/${repository}/commits?state=all`, { headers })
        } catch (e) {
            throw e;
        }
    }

    const fetchRepositoryIssues = async (repository) => {
        try {
            const octokit = await useOctoKit();

            return await octokit.request(`GET /repos/${repository}/issues?state=all`, { headers })
        } catch (e) {
            throw e;
        }
    }

    const fetchRepositoryPulls = async (repository) => {
        try {
            const octokit = await useOctoKit();

            return await octokit.request(`GET /repos/${repository}/pulls?state=all`, { headers })
        } catch (e) {
            throw e;
        }
    }

    const fetchAndStoreAuthenticatedUserRepos = async () => {
        try {
            const { data: organizations } = await fetchOrganizations();

            let allRepositories = [];

            for (const organisation of organizations) {
                const { data: repositories } = await fetchOrganizationRepos(organisation.login)
                allRepositories.push(...repositories)
            }

            for (const repository of allRepositories) {
                await store(repository)
            }
        } catch (e) { throw e }
    }

    const fetchOrganizations = async () => {
        try {
            const octokit = await useOctoKit();

            return await octokit.request('GET /user/orgs', { headers })
        } catch (e) { throw e }
    }

    const fetchOrganizationRepos = async (org) => {
        try {
            const octokit = await useOctoKit();

            return await octokit.request(`GET /orgs/${org}/repos`, {
                org: 'ORG', headers
            })
        } catch (e) { throw e }
    }

    return {
        fetchAndStoreAuthenticatedUserRepos,
        fetchOrganizations,
        fetchOrganizationRepos,
        fetchRepositoryPulls,
        fetchRepositoryIssues,
        fetchRepositoryCommits,
        fetchRepositoryStats,

        index,
        store,
        update,
        destroy,
    }
}