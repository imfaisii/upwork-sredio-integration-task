import useOctoKit from '../composables/useOctoKit.js';
import GitHubIntegration from "../models/githubintegration.model.js";
import GithubRepositories from "../models/githubRepositories.model.js";

export default function () {
    const headers = {
        'X-GitHub-Api-Version': '2022-11-28'
    }

    const getRepositories = async () => {
        try {
            return await GithubRepositories.find({});
        } catch (e) { throw e }
    }

    const deleteAllRepostories = async () => {
        try {
            return await GithubRepositories.deleteMany({});
        } catch (e) { throw e }
    }

    const storeRepository = async (repository) => {
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

    const fetchAndStoreAuthenticatedUserRepos = async () => {
        try {
            const { data: organizations } = await fetchOrganizations();

            let allRepositories = [];

            for (const organisation of organizations) {
                const { data: repositories } = await fetchOrganizationRepos(organisation.login)
                allRepositories.push(...repositories)
            }

            for (const repository of allRepositories) {
                await storeRepository(repository)
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

        storeRepository,
        getRepositories,
        deleteAllRepostories
    }
}